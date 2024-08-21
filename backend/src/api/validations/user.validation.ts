export { };
import * as Joi from 'joi';
import { User } from '../../api/models';

const requireEmail = () => Joi.string().email().required();

const postPutBody = () => {
  return {
    email: requireEmail(),
    password: Joi.string().min(6).max(128).required(),
    name: Joi.string().max(128),
    // role: Joi.string().valid(User.roles)
  };
};

module.exports = {
  // GET /v1/users
  listUsers: {
    query: {
      limit: Joi.number().min(1).max(9999),
      offset: Joi.number().min(0),
      page: Joi.number().min(0),
      perPage: Joi.number().min(1),
      sort: Joi.string(),
      name: Joi.string(),
      email: Joi.string(),
      role: Joi.string().valid(User.roles)
    }
  },

  // POST /v1/users
  createUser: {
    body: postPutBody()
  },

  // PUT /v1/users/:userId
  replaceUser: {
    body: postPutBody(),
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
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

  // PATCH /v1/users/:userId
  updateUserv1: {
    body: {
      email: Joi.string().email(),
      firstName: Joi.string().max(128),
      lastName: Joi.string().max(128),
      tel: Joi.string().max(128),
      pays: Joi.string().max(128),
      niveau: Joi.string().max(128),
    },
  },
  updatePassword: {
    body: {
      old_password: Joi.string().min(6).max(128).required(),
      new_password: Joi.string().min(6).max(128).required(),
    },
  },
  updateUserv2: {
    body: {
      email: Joi.string().email(),
      firstName: Joi.string().max(128),
      lastName: Joi.string().max(128),
      tel: Joi.string().max(128),
      pays: Joi.string().max(128),
    },
  },

  BlockUser: {
    body: {
      suspended: Joi.boolean().required(),
    },
  },


  // PATCH /v1/users/:userId
  updateUser: {
    body: {
      email: Joi.string().email(),
      password: Joi.string().min(6).max(128),
      name: Joi.string().max(128),
      role: Joi.string().valid(User.roles)
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
