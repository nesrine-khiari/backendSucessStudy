export { };
const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authorize, SUPER_ADMIN, LOGGED_USER, SOUS_ADMIN, RESPONSABLE } = require('../../middlewares/auth');
const { listUsers, createUser, replaceUser, updateUser, updateUserv1, updateUserv2, BlockUser, updatePassword } = require('../../validations/user.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
  .route('/')
  .get(authorize(SUPER_ADMIN), validate(listUsers), controller.list)
router
  .route('/addSousAdmin').post(authorize(SUPER_ADMIN), validate(createUser), controller.createSousAdmin);

router
  .route('/getStudents')
  .get(authorize([RESPONSABLE, SOUS_ADMIN, SUPER_ADMIN]), validate(listUsers), controller.getStudents)

router
  .route('/sendDeleteRequest/:userId')
  .get(authorize(SOUS_ADMIN), controller.sendDeleteRequest)
router
  .route('/getPaysStatistics')
  .get(authorize(SOUS_ADMIN), controller.getPaysStatistics)
router
  .route('/getUsersStatistics')
  .get(authorize(SOUS_ADMIN), controller.getUsersStatistics)

router
  .route('/sendEmail')
  .post(authorize(SOUS_ADMIN), controller.sendEmail)
//#######################################################################################################
//  to sednd many emails this is exemple of the body object
// {
//     "content":"haw ye5dem el send many emails to users",
//     "object":"test send many",
//     "usersId":["643249af2fa85926e4d543f9","63e421f0b2496830544c481b"]
// }

router
  .route('/sendManyEmail')
  .post(authorize(SOUS_ADMIN), controller.sendEmailToManyUsers)



router
  .route('/sendCertif/:email/:object/:demand_id')
  .post(authorize(RESPONSABLE), controller.SendCertif)


//#####################################################################################""  
router.route('/profile').get(authorize(), controller.loggedIn);

router
  .route('/profile-update-v1/:userId').patch(authorize(LOGGED_USER), validate(updateUserv1), controller.updatev1)
  .put(authorize(LOGGED_USER), validate(updatePassword), controller.updatePassword)

router
  .route('/profile-by-admin/:userId').patch(authorize(SUPER_ADMIN), validate(updateUserv2), controller.updatev1)



router
  .route('/:userId')

  .get(authorize(LOGGED_USER), controller.get)

  .put(authorize(LOGGED_USER), validate(replaceUser), controller.replace)

  .patch(authorize(LOGGED_USER), validate(updateUser), controller.update)

router
  .route('/block-user/:userId').put(authorize(SUPER_ADMIN), validate(BlockUser), controller.BlockUserController)

router
  .route('/delete/:userId').delete(authorize(SUPER_ADMIN), controller.DeleteUser)



// .delete(authorize(LOGGED_USER), controller.remove);

// router.route('/:userId/notes').get(authorize(LOGGED_USER), controller.listUserNotes);
// router.route('/:userId/notes').post(authorize(LOGGED_USER), controller.createNote);
// router.route('/:userId/notes/:noteId').get(authorize(LOGGED_USER), controller.readUserNote);
// router.route('/:userId/notes/:noteId').post(authorize(LOGGED_USER), controller.updateUserNote);
// router.route('/:userId/notes/:noteId/like').post(authorize(LOGGED_USER), controller.likeUserNote);
// router.route('/:userId/notes/:noteId').delete(authorize(LOGGED_USER), controller.deleteUserNote);

module.exports = router;
