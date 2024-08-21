import { NextFunction, Request, Response } from 'express';
import * as crypto from 'crypto';
// const ObjectId = mongoose.Types.ObjectId;
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const APIError = require('../../api/utils/APIError');
const bcrypt = require('bcryptjs');
const { env } = require('../../config/vars');
const University = require('../../api/models/university');
const Formation = require('../../api/models/Formation');

const { handler: errorHandler } = require('../middlewares/error');
import { apiJson, randomString } from '../../api/utils/Utils';
import { User } from '../models';
import { forgotPasswordEmail, sendEmail, GetPassAndVerAcc } from '../utils/MsgUtils';
import { number } from 'joi';
const qrcode = require("qrcode");


// const { apiJson } =require ('../../api/utils/Utils');
interface MulterRequest extends Request {
  file: any;
  files: any
}
exports.create = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    if (!(req.files.cover && req.files.logo)) {

      // return new Error("all fields are requires") 
      // return next({ message: 'all fields are requires' });
      throw new APIError({
        message: 'all fields are requires',
        status: 400
      });
      // return next(new Error("all fields are requires"))
    }
    console.log("el files", req.files)
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT;
    const data = JSON.parse(req.body.data);
    const newuniversity = new University({
      ...data,
      logo: `${protocol}://${host}:${port}/uploads/${req.files.logo[0].filename}`,
      cover: `${protocol}://${host}:${port}/uploads/${req.files.cover[0].filename}`,
      approved: true,
    });
    const saveUniversity = await newuniversity.save();
    res.status(httpStatus.CREATED);
    res.json(saveUniversity.transform());

  } catch (error) {
    return next(error);
  }
};

exports.getAllUniversitys = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    let query = {};
  
    const pays = req.query.pays ? req.query.pays.toString() : ""; // Extract 'pays' parameter
    const nom = req.query.nom ? req.query.nom.toString() : ""; // Extract 'nom' parameter
    const approved = (req.query.approved == "true" || req.query.approved == "false" )  ? JSON.parse(req.query.approved) : ""; // Extract 'approved' parameter
  
    // Check combination of parameters
    if (pays !== "" && nom !== "" && approved !== "") {
      // If all parameters are provided
      query = { nom: { $regex: new RegExp(nom, 'i') }, pays:pays , approved: approved };
    } else if (pays !== "" && nom !== "") {
      // If 'pays' and 'nom' are provided
      query = { nom: { $regex: new RegExp(nom, 'i') },pays:pays  };
    } else if (pays !== "" && approved !== "") {
      // If 'pays' and 'approved' are provided
      query = {pays:pays , approved: approved };
    } else if (nom !== "" && approved !== "") {
      // If 'nom' and 'approved' are provided
      query = { nom: { $regex: new RegExp(nom, 'i') }, approved: approved };
    } else if (pays !== "") {
      // If only 'pays' is provided
      query = { pays:pays  };
    } else if (nom !== "") {
      // If only 'nom' is provided
      query = { nom: { $regex: new RegExp(nom, 'i') } };
    } else if (approved !== "") {
      // If only 'approved' is provided
      query = { approved: approved };
    }
  
  
    const data = await University.aggregate([
      { $match: query },
      {
        $lookup: {
          from: 'users', // Name of the Manager collection
          localField: '_id',
          foreignField: 'Universite',
          as: 'users'
        }
      },
      {
        $group: {
          _id: '$_id',
          nom: { $first: '$nom' },
          fullname: { $first: '$fullname' },
          logo: { $first: '$logo' },
          cover: { $first: '$cover' },
          description: { $first: '$description' },
          long_desc: { $first: '$long_desc' },
          qrCode: { $first: '$qrCode' },
          tel: { $first: '$tel' },
          pays: { $first: '$pays' },
          OrganMere: { $first: '$OrganMere' },
          address: { $first: '$address' },
          createdAt: { $first: '$createdAt' },
          approved: { $first: '$approved' },
          numOfManagers: { $sum: { $size: '$users' } }
        }
      },
      {
        $sort: {
          createdAt: -1 // Sort by createdAt in descending order
        }
      },
      {
        $project: {
          _id: 1, nom: 1, fullname: 1, logo: 1,
          address: 1, createdAt: 1, approved: 1,
          description: 1, long_desc: 1, qrCode: 1,
          tel: 1, pays: 1, OrganMere: 1, cover: 1,
          numOfManagers: 1
        }
      }
    ]);
  
    apiJson({ req, res, data, model: University });
  } catch (e) {
    next(e);
  }
  
  
}

exports.getAllUniversitysFront = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    const data = (await University.list(req)).transform(req);
    apiJson({ req, res, data, model: University });
  } catch (e) {
    next(e);
  }
}

exports.getOneUniversity = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    const { universityId } = req.params;
    const university = (await University.get(universityId)).transform(req);
    apiJson({ req, res, data: university, model: University });
  } catch (e) {
    next(e);
  }
}

exports.ApproveUniversity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { universityId } = req.params;

    const query = { _id: new ObjectId(universityId) };

    const approuvedUniv = await University.findOneAndUpdate(query, { approved: true }, { new: true });

    if (approuvedUniv) {
      console.log(approuvedUniv)
      // here let's send an email to the user to mention that he can validate his email
      const moderator = await User.findOne({ Universite: new ObjectId(approuvedUniv._id) })
      const { _id: userId, firstName, email } = moderator._id;

      const tempPass = randomString(10, 'abcdefghijklmnopqrstuvwxyz0123456789');
      const rounds = env === 'test' ? 1 : 10;
      const hash = await bcrypt.hash(tempPass, rounds);

      const verifyToken = `${userId}.${crypto.randomBytes(40).toString('hex')}`;

      const Updatedmoderator = await User.findOneAndUpdate(
        { _id: userId },
        { password: hash, verifyToken },
        { new: true }
      );
      sendEmail(GetPassAndVerAcc({ firstName: moderator.name, email: moderator.email, tempPass: tempPass, token: verifyToken }));
    }
    apiJson({ req, res, data: { approuvedUniv } });
  } catch (e) {
    next(e);
  }
};

exports.updateUniversityByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { universityId } = req.params;
  const { nom, description, address, pays, fullname, OrganMere, tel, long_desc, approved } = req.body;

  try {
    const query = { _id: new ObjectId(universityId) };
    const updatedUniv = await University.findOneAndUpdate(query, { nom, description, address, pays, fullname, OrganMere, tel, long_desc }, { new: true });
    apiJson({ req, res, data: {} });
  } catch (e) {
    next(e);
  }
};

exports.UpdateImages = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    const {universityId} = req.params;
    if (!(req.files.cover && req.files.logo)) {

      // return new Error("all fields are requires") 
      // return next({ message: 'all fields are requires' });
      throw new APIError({
        message: 'all fields are requires',
        status: 400
      });
      // return next(new Error("all fields are requires"))
    }
    console.log("el files", req.files)
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT;

  


    const newuniversity = await University.findOneAndUpdate({ _id: new ObjectId(universityId) }, {
      logo: `${protocol}://${host}:${port}/uploads/${req.files.logo[0].filename}`,
      cover: `${protocol}://${host}:${port}/uploads/${req.files.cover[0].filename}`
    }, { new: true });
    apiJson({ req, res, data: newuniversity });

  } catch (error) {
    return next(error);
  }
};

exports.updateUniversity = async (req: Request, res: Response, next: NextFunction) => {
  const { universityId } = req.params;
  const { _id } = req.route.meta.user;
  const { nom, description, address, pays, fullname, OrganMere, tel, long_desc } = req.body;
  const currentUserId = _id.toString();

  try {
    const getUser = (await User.get(currentUserId)).transform(req);

    if (!(getUser.Universite == universityId)) {
      console.log('user', getUser.Universite)
      console.log('universityId', universityId)

      return next()
    }
    const query = { _id: new ObjectId(universityId) };
    await University.findOneAndUpdate(query, { nom, description, address, pays, fullname, OrganMere, tel, long_desc }, {});
    apiJson({ req, res, data: {} });
  } catch (e) {
    next(e);
  }
};

exports.getFormationOfUniversity = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    const { universityId } = req.params;
    req.query = { ...req.query, Universite: new ObjectId(universityId) }; // append to query (by userId) to final query

    const formationss = (await Formation.list(req)).transform(req);
    apiJson({ req, res, data: formationss, model: Formation });
  } catch (e) {
    next(e);
  }
}






exports.getAllFormations = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
   
    const pays = req.query.pays ? req.query.pays.toString() : ""; // Extract 'pays' parameter
    const nom = req.query.nom ? req.query.nom.toString() : ""; // Extract 'nom' parameter

    let query = {};

    // If both 'pays' and 'nom' are provided, filter based on both
    if (pays !== "" && nom !== "") {
      query = { nom: { $regex: new RegExp(nom, 'i') }, Universite: { $in: await University.find({ pays }) } };
    }
    // If only 'pays' is provided, filter based on 'pays'
    else if (pays !== "") {
      query = { Universite: { $in: await University.find({ pays },{_id:1}) } };
    }
    // If only 'nom' is provided, filter based on 'nom'
    else if (nom !== "") {
      query = { nom: { $regex: new RegExp(nom, 'i') } };
    }

    const formations = await Formation.find(query).populate('Universite').skip(Number(req.query.p) * Number(req.query.l)).limit(Number(req.query.l));
    apiJson({ req, res, data: formations, model: Formation });

  } catch (e) {
    next(e);
  }
}
exports.getFormationByCountry = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    const country = req.params.city;
    console.log(country)
    const formations = await Formation.aggregate([{
      $lookup: {
        from: "universities",
        localField: "Universite",
        foreignField: "_id",
        as: "uni"
      }
    }, {
      $match: { 'uni.pays': country }
    }])
    apiJson({ req, res, data: formations, model: Formation });
  } catch (e) {
    next(e);
  }
}
exports.getFormationByid = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    const { city, formation } = req.params;
    const formations = await Formation.findById(formation)
    apiJson({ req, res, data: formations, model: Formation });
  } catch (e) {
    next(e);
  }

}


exports.updateFormation = async (req: MulterRequest, res: Response, next: NextFunction) => {
  // const { userId, noteId } = req.params;
  const { formationId } = req.params;
  const formation = formationId.toString();
  const { nom, description, price , duree , avecBac ,devise} = req.body;
  
    try {
      const query = { _id: new ObjectId(formation) };
      const updateForm = await Formation.findOneAndUpdate(query, { nom, description, price , duree ,devise, avecBac }, { new: true });
      apiJson({ req, res, data: updateForm });
    } catch (e) {
      next(e);
    }
  };
  
exports.addFormation = async (req: MulterRequest, res: Response, next: NextFunction) => {
  const { universityId } = req.params;
  const { _id } = req.route.meta.user;
  const currentUserId = _id.toString();

  try {
    const user = (await User.get(currentUserId)).transform(req)
    if (!(user.Universite == universityId)) {
      console.log('user', user.Universite)
      console.log('universityId', universityId)

      return next()
    }
    const newFormation = new Formation({ ...req.body, Universite: new ObjectId(user.Universite) });
    const data = await newFormation.save();
    apiJson({ req, res, data, model: Formation });
  } catch (e) {
    next(e);
  }
}


exports.generateQRCode = async (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;
  const { universityId } = req.params;
  const { _id } = req.route.meta.user;
  const currentUserId = _id.toString();
  try {
    const user = (await User.get(currentUserId)).transform(req)
    if (!(user.Universite == universityId)) {
      console.log('user', user.Universite)
      console.log('universityId', universityId)

      return next()
    }
    qrcode.toFile(`${process.cwd()}/uploads/${universityId}.png`, text, {
      type: "png",
      errorCorrectionLevel: "H",
      scale: 10,
    }, (err: Error) => {
      if (err) throw err;
      console.log("done");
    });
    const university = await University.get(universityId)
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT;
    university.qrCode = `${protocol}://${host}:${port}/uploads/${universityId}.png`

    const data = await university.save()
    apiJson({ req, res, data, model: University });

  } catch (error) {
    next(error);
  }
};


exports.createAdmin = async (req: MulterRequest, res: Response, next: NextFunction) => {
  // const { userId, noteId } = req.params;
  const { universityId } = req.params;
  const university = universityId.toString();


  try {
    const tempPass = randomString(10, 'abcdefghijklmnopqrstuvwxyz0123456789');
    const newAdmin = new User({ ...req.body, Universite: new ObjectId(university), role: 'responsable' });
    newAdmin.password = tempPass;
    await newAdmin.save();
    console.log("pass", tempPass)
    await sendEmail(forgotPasswordEmail({ name: newAdmin.name, email: newAdmin.email, tempPass }))
    const data = await newAdmin.save();
    apiJson({ req, res, data, model: Formation });
  } catch (e) {
    next(e);
  }
}

exports.getAdmin = async (req: MulterRequest, res: Response, next: NextFunction) => {
  const { universityId } = req.params;
  try {
    const moderator = await User.find({ Universite: new ObjectId(universityId) });
    apiJson({ req, res, data: moderator, model: User });
  } catch (e) {
    next(e);
  }
}

exports.DeleteUniversity = async (req: MulterRequest, res: Response, next: NextFunction) => {
  // const { userId, noteId } = req.params;
  const { universityId } = req.params;
  console.log(universityId)
  const university = universityId.toString();


  try {
    const deletedUniv = await University.findByIdAndRemove(university);

    await Formation.deleteMany({ Universite: new ObjectId(university) });


    apiJson({ req, res, data: deletedUniv });
  } catch (e) {
    next(e);
  }
}




exports.DeleteFormation = async (req: MulterRequest, res: Response, next: NextFunction) => {
  // const { userId, noteId } = req.params;
  const { formationId } = req.params;
  console.log(formationId)
  const formation = formationId.toString();


  try {
    const deletedForm = await Formation.findByIdAndRemove(formation);
    apiJson({ req, res, data: deletedForm });
  } catch (e) {
    next(e);
  }
}




exports.DeleteAdmin = async (req: MulterRequest, res: Response, next: NextFunction) => {
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

