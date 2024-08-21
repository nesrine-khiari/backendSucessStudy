export { };
import { NextFunction, Request, Response, Router } from 'express';
const httpStatus = require('http-status');
import { User } from '../../api/models';
const moment = require('moment-timezone');
import { apiJson, randomString } from '../../api/utils/Utils';
import { sendEmail, verifyYourAccount, forgotPasswordEmail, slackWebhook, DemandeEmail } from '../../api/utils/MsgUtils';
const { JWT_EXPIRATION_MINUTES } = require('../../config/vars');
import * as crypto from 'crypto';
const University = require('../../api/models/university');

/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(user: any, accessToken: string) {
  const tokenType = 'Bearer';
  const refreshToken = '';
  const expiresIn = moment().add(JWT_EXPIRATION_MINUTES, 'minutes');
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn
  };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await new User(req.body).save();
    const userTransformed = user.transform();
    const tokenObject = generateTokenResponse(user, user.token());
    res.status(httpStatus.CREATED);
    const data = { tokenObject, user: userTransformed };

    // for testing: it can only email to "authorized recipients" in Mailgun Account Settings

    // user found => generate temp password, then email it to user:
    const { firstName, email } = user;
    const userId = user._id;

    const tempPass = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    user.verifyToken = tempPass;
    await user.save();
    sendEmail(verifyYourAccount({ firstName, email, tempPass }));
    return apiJson({ req, res, data });
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    const { email } = user;
    const token = generateTokenResponse(user, accessToken);

    if (user.role === "responsable") {
      const related_univ = await University.get(user.Universite);
      if (!related_univ.approved) {
        return next({ message: 'Wait until validation of university' });
      }
    }

    const userTransformed = user.transform();
    const data = { token, user: userTransformed };
    return apiJson({ req, res, data });
  } catch (error) {
    return next(error);
  }
};

/**
 * Logout function: delete token from DB.
 * @public
 */
exports.logout = async (req: Request, res: Response, next: NextFunction) => {
  console.log('- logout');
  try {
    const { userId } = req.body;
    const data = { status: 'OK' };
    return apiJson({ req, res, data });
  } catch (error) {
    return next(error);
  }
};

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const accessToken = user.token();
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * Send email to a registered user's email with a one-time temporary password
 * @public
 */
exports.forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email: reqEmail } = req.body;
    const user = await User.findOne({ email: reqEmail });
    if (!user) {
      // RETURN A GENERIC ERROR - DON'T EXPOSE the real reason (user not found) for security.
      return next({ message: 'Invalid request' });
    }
    // user found => generate temp password, then email it to user:
    const { name, email } = user;
    const tempPass = randomString(10, 'abcdefghijklmnopqrstuvwxyz0123456789');
    user.password = tempPass;
    await user.save();
    await sendEmail(forgotPasswordEmail({ name, email, tempPass }))?.then((val) => console.log("Mrigla SMTP", val)).catch((err) => console.error("SMTP ERROR", err));

    return apiJson({ req, res, data: { status: 'OK' } });
  } catch (error) {
    return next(error);
  }
};

/**
 * Send email to a registered user's email with a one-time temporary password
 * @public
 */
exports.verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    console.log('req.params', req.params);
    const user = await User.findOne({ verifyToken: token });
    console.log(user);

    if (!user) {
      // RETURN A GENERIC ERROR - DON'T EXPOSE the real reason (user not found) for security.
      return next({ message: 'Invalid request' });
    }
    // user found => generate temp password, then email it to user:
    user.verified = true;
    // if(user.role=="responsable"){
    //   const saveUniversity = await University.findOneAndUpdate({_id:user.Universite},{$set:{approved:true}},{new:true});
    // }
    await user.save();

    return apiJson({ req, res, data: { status: 'OK' } });
  } catch (error) {
    return next(error);
  }
};


/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.registerUniv = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);

    const newuniversity = await new University({
      ...req.body.university,
      approved: false,
    });
    const user = await new User({ ...req.body.user, role: 'responsable', Universite: newuniversity._id })
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());

    res.status(httpStatus.CREATED);
    const data = { token, user: userTransformed };

    // for testing: it can only email to "authorized recipients" in Mailgun Account Settings

    // user found => generate temp password, then email it to user:
    const userId = user._id;
    const tempPass = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    user.password = tempPass;

    await user.save();
    await newuniversity.save();
    sendEmail(DemandeEmail({ UniName: newuniversity.nom }));
    return apiJson({ req, res, data });
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};