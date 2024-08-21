export { };
import { NextFunction, Request, Response, Router } from 'express';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const httpStatus = require('http-status');
const { omit } = require('lodash');
const bcrypt = require('bcryptjs');
import { User } from '../../api/models';
import { apiJson } from '../../api/utils/Utils';
import { customEmail, sendEmail, multipleMails, CertifEmail } from '../utils/MsgUtils';
const { handler: errorHandler } = require('../middlewares/error');
const { UPLOAD_LIMIT } = require('../../config/vars');
const DemandModule = require("../models/Demande.model")


const likesMap: any = {}; // key (userId__noteId) : 1

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const user = await User.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.user = user;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get logged in user info
 * @public
 */
const loggedIn = (req: Request, res: Response) => res.json(req.route.meta.user.transform());
exports.loggedIn = loggedIn;

/**
 * Get user
 * @public
 */
exports.get = loggedIn;

/**
 * Create new user
 * @public
 */
exports.createSousAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User({ ...req.body, role: 'sousadmin', verified: true });
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.route.meta;
    const newUser = new User(req.body);
    const ommitRole = user.role !== 'admin' ? 'role' : '';
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

    await user.update(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);

    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, `uploads/`);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
}).fields([
  {
    name: 'diplome',
    maxCount: 1
  },
  {
    name: 'releveDeNote',
    maxCount: 1
  },
  {
    name: 'CV',
    maxCount: 1
  },
  { name: 'picture', maxCount: 1 },
  { name: 'passeport', maxCount: 1 },
  { name: 'certif', maxCount: 1 },
  { name: "motivation", maxCount: 1 }
]);

/**
 * Update existing user
 * @public
 */
exports.update = (req: any, res: Response, next: NextFunction) => {
  const ommitRole = req.route.meta.user.role !== 'admin' ? 'role' : '';

  const updatedUser = omit(req.body, ommitRole);
  let user = Object.assign(req.route.meta.user, updatedUser);

  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT;
  const path = `${protocol}://${host}:${port}/`

  upload(req, res, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      if (req.file == 'undefined') {
        console.log('No image selected!');
      } else {
        if (req.files) {
          req.files.picture ? user.picture = path + req.files.picture[0].path : null;
          req.files.CV ? user.CV = path + req.files.CV[0].path : null;
          req.files.passeport ? user.passeport = path + req.files.passeport[0].path : null;
          req.files.diplome ? user.diplome = path + req.files.diplome[0].path : null;
          req.files.releveDeNote ? user.releveDeNote = path + req.files.releveDeNote[0].path : null;
          req.files.motivation ? user.motivation = path + req.files.motivation[0].path : null;
        }
        console.log('userUpdated', user);
        user
          .save()
          .then((savedUser: any) => res.json(savedUser.transform()))
          .catch((e: any) => next(User.checkDuplicateEmail(e)));
      }
    }
  });
};

/**
 * Get user list
 * @public
 * @example GET /v1/users?role=admin&limit=5&offset=0&sort=email:desc,createdAt
 */
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.query = { ...req.query, role: 'user', verified: "true", suspended: "false" };
    const data = (await User.list(req)).transform(req);
    apiJson({ req, res, data, model: User });
  } catch (e) {
    next(e);
  }
};

exports.getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const data = (await User.list(req)).transform(req);
    apiJson({ req, res, data, model: User });
  } catch (e) {
    next(e);
  }
};

/**
 * sendDeleteRequest
 * @public
 */
exports.sendDeleteRequest = (req: any, res: Response, next: NextFunction) => {
  const ommitRole = req.route.meta.user.role !== 'admin' ? 'role' : '';
  const updatedUser = omit(req.body, ommitRole);
  let user = Object.assign(req.route.meta.user, updatedUser);
  user.requestDelete = true;
  user.requestDeleteBy = req.route.meta.connectedUser.id
  console.log('userUpdated', user);
  user
    .save()
    .then((savedUser: any) => res.json(savedUser.transform()))
    .catch((e: any) => next(User.checkDuplicateEmail(e)));


};


/**
 * Send email to a user
 * @public
 */
exports.sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email: reqEmail, content, object } = req.body;
    const user = await User.findOne({ email: reqEmail });
    if (!user) {
      // RETURN A GENERIC ERROR - DON'T EXPOSE the real reason (user not found) for security.
      return next({ message: 'Invalid request' });
    }
    // user found => generate temp password, then email it to user:
    const { name, email } = user;
    sendEmail(customEmail({ name, email, content, object }));

    return apiJson({ req, res, data: { status: 'OK' } });
  } catch (error) {
    return next(error);
  }
};

/**
 * Send email to a user
 * @public
 */
exports.sendEmailToManyUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //usersId arry of string of ids
    const { usersId, content, object } = req.body;
    console.log(usersId)

    const users = await User.find({ _id: { $in: usersId } });
    if (!users) {
      // RETURN A GENERIC ERROR - DON'T EXPOSE the real reason (user not found) for security.
      return next({ message: 'Invalid request' });
    }
    // user found => generate temp password, then email it to user:

    sendEmail(multipleMails({ users, content, object }));

    return apiJson({ req, res, data: { status: 'OK' } });
  } catch (error) {
    return next(error);
  }
};

/**
 * Send email to a user
 * @public
 */
exports.SendCertif = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email: reqEmail, object, demand_id } = req.params;
    console.log({ reqEmail, object })
    const user = await User.findOne({ email: reqEmail });
    if (!user) {
      // RETURN A GENERIC ERROR - DON'T EXPOSE the real reason (user not found) for security.
      return next({ message: 'Invalid request' });
    }
    // user found => generate temp password, then email it to user:
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT;
    const path = `${protocol}://${host}:${port}/`

    upload(req, res, async (err: any) => {
      if (err) {
       
        console.log(err);
      } else {
        if (req.file == 'undefined') {
          console.log('No image selected!');
          return next({ message: 'No image selected!' });
        } else {
          if (req.files && req.files.certif) {
            console.log(req.files.certif[0]);
            let image = path + req.files.certif[0].filename;
            const { name, email } = user;
            await DemandModule.findOneAndUpdate({ _id: demand_id }, { final_certif: image }, { new: true })
            sendEmail(CertifEmail({ name, email, image, object }));

          }
        }
      }
    });



    return apiJson({ req, res, data: { status: 'OK' } });
  } catch (error) {
    return next(error);
  }
};

exports.getUsersStatistics = async (req: Request, res: Response) => {
  try {
    const suspendedUsers = await User.aggregate([
      {
        $match: { suspended: { $eq: true } }
      },
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);
    const activeUsers = await User.aggregate([
      {
        $match: { suspended: { $eq: false } }
      },
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).send({ suspendedUsers, activeUsers });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

exports.getPaysStatistics = async (req: Request, res: Response) => {
  try {
    const pays = await User.aggregate([
      {
        $match: { suspended: { $eq: false } }
      },
      {
        $group: {
          _id: '$pays',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).send({ pays });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};


/**
 * Update existing user
 * @public
 */
exports.updatev1 = async (req: any, res: Response, next: NextFunction) => {
  const { email, firstName, lastName, tel, pays } = req.body;
  try {
    const query = { _id: new ObjectId(req.params.userId) };
    const updated_user = await User.findOneAndUpdate(query, { email, firstName, lastName, tel, pays }, { new: true });
    if (!updated_user) {
      console.log('error in updating user')
      return next()
    }
    res.status(200).send({ message: "updated_successfully" });
  } catch (e) {
    next(e);
  }
};
exports.updatePassword = async (req: any, res: Response, next: NextFunction) => {
  const { old_password, new_password } = req.body;
  try {
    const query = { _id: new ObjectId(req.params.userId) };
    const updated_user = await User.findOne(query);

    const passwordMatch = await bcrypt.compare(old_password, updated_user.password);
    if (passwordMatch) {
      const hash = await bcrypt.hash(new_password, 10);
      await updated_user.update({ password: hash });
      res.status(200).send({ message: "updated_successfully" });
    } else {
      res.status(401).send({ error: "Old password is incorrect" });
    }
  } catch (e) {
    next(e);
  }
}
/**
 * Update existing user
 * @public
 */
exports.BlockUserController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const query = { _id: new ObjectId(userId) };
    const { suspended } = req.body;
    const updated_user = await User.findOneAndUpdate(query, { suspended }, { new: true });
    if (!updated_user) {
      console.log('error in updating user')
      return next()
    }
    res.status(200).send({ message: "updated_successfully" });
  } catch (e) {
    next(e);
  }
};


exports.DeleteUser = async (req: any, res: Response, next: NextFunction) => {
  // const { userId, noteId } = req.params;
  const { userId } = req.params;
  const struserId = userId.toString();
  try {
    const deletedUser = await User.findByIdAndRemove(struserId);
    apiJson({ req, res, data: deletedUser });
  } catch (e) {
    next(e);
  }
}

