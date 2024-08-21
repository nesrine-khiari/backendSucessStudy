import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import * as Joi from 'joi';

// exports.createUniversity = (req: Request) => [
//     body("nom", "nom is required").not().isEmpty(),
//   body("description", "description is required").not().isEmpty(),
// //   body("avatar", "avatar is required").isObject(),
//   (req:Request,res:Response,next:NextFunction)=>{
//     validations(req,res,next)
//   }

// ];
module.exports = {
  createUniversity2: {
    body: {
      nom: Joi.string().required(),
      description: Joi.string().required(),
      address: Joi.string().required(),
      pays: Joi.string().required(),



    }
  },

  updateUniversity: {
    body: {
      nom: Joi.string(),
      fullname: Joi.string(),
      long_desc: Joi.string(),
      tel: Joi.string(),
      OrganMere: Joi.string(),
      description: Joi.string(),
      address: Joi.string(),
      pays: Joi.string(),
    }
  },



  updateUniversityByAdmin: {
    body: {
      nom: Joi.string().required(),
      fullname: Joi.string().required(),
      OrganMere: Joi.string().required(),
      tel: Joi.string().required(),
      description: Joi.string().required(),
      long_desc: Joi.string().required(),
      address: Joi.string().required(),
      pays: Joi.string().required(),
      approved: Joi.boolean().required(),
    }
  },

  approveUniversity: {
    body: {
      approved: Joi.boolean().required(),
    }
  },



  createFormation: {
    body: {
      nom: Joi.string().required(),
      description: Joi.string().required(),
      avecBac: Joi.boolean().required(),
      price: Joi.number().required(),
      duree :Joi.number().required(),
      devise: Joi.string().required(),
    }

  },

  createAdmin: {
    body: {
      nom: Joi.string(),
      email: Joi.string()
        .email()
        .required(),

      tel: Joi.string().max(10)
    },
  },

  createqr: {
    body: {
      text: Joi.string().required(),

    },
  }


}
