export { };
const httpStatus = require('http-status');
const passport = require('passport');
import { User } from '../../api/models';
const APIError = require('../utils/APIError');

const RESPONSABLE = 'responsable';
const SUPER_ADMIN = 'superadmin'
const SOUS_ADMIN = 'sousadmin'
const LOGGED_USER = '_loggedUser';

import * as Bluebird from 'bluebird';
// declare global {
//   export interface Promise<T> extends Bluebird<T> {}
// }

const handleJWT = (req: any, res: any, next: any, roles: any) => async (err: any, user: any, info: any) => {
  const error = err || info;
  const logIn: any = Bluebird.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined
  });

  try {
    if (error || !user) {
      throw error;
    }
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  console.log(roles)
  if (roles === SOUS_ADMIN) {
    // validate if the "Logged User Id" is the same with "params.userId" (resource Id)
    // only the same logged in user can access the resource Id. (unless it has admin role)


    if (user.role != 'superadmin' && user.role != 'sousadmin') {
      console.log('d5al f tab3a   ', user.role)
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = 'Forbidden';
      return next(apiError);
    }
  }
  if (roles === RESPONSABLE) {
    // validate if the "Logged User Id" is the same with "params.userId" (resource Id)
    // only the same logged in user can access the resource Id. (unless it has admin role)
    if (user.role !== 'superadmin' && user.role !== 'responsable') {
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = 'Forbidden';
      return next(apiError);
    }
  }
  if (roles === LOGGED_USER) {
    // validate if the "Logged User Id" is the same with "params.userId" (resource Id)
    // only the same logged in user can access the resource Id. (unless it has admin role)
    if (user.role !== 'superadmin' && req.params.userId !== user._id.toString()) {
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = 'Forbidden';
      return next(apiError);
    }
  }
  // else if (!roles.includes(user.role)) {
  //   console.log('d5al f tab3a   ', user.role)
  //   apiError.status = httpStatus.FORBIDDEN;
  //   apiError.message = 'Forbidden';
  //   return next(apiError);
  // } 
  else if (err || !user) {
    return next(apiError);
  }

  req.route.meta = req.route.meta || {};
  req.route.meta.user = user;
  req.route.meta.connectedUser = user;

  return next();
};

exports.RESPONSABLE = RESPONSABLE;
exports.LOGGED_USER = LOGGED_USER;
exports.SUPER_ADMIN = SUPER_ADMIN;
exports.SOUS_ADMIN = SOUS_ADMIN;



exports.authorize = (roles = User.role) => (req: any, res: any, next: any) =>
passport.authenticate('jwt', { session: false }, handleJWT(req, res, next, roles))(req, res, next);


exports.oAuth = (service: any) => passport.authenticate(service, { session: false });
