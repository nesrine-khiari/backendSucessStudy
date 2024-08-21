import path = require("path");

export { };
const express = require('express');
const validate = require('express-validation');
const { UPLOAD_LIMIT } = require('../../../config/vars');
const { authorize, RESPONSABLE, LOGGED_USER, SOUS_ADMIN, SUPER_ADMIN } = require('../../middlewares/auth');

const controller = require('../../controllers/university.controller');
const { updateUniversityByAdmin, updateUniversity, approveUniversity, createFormation, createAdmin, createqr } = require("../../validations/university.validation")
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, `uploads/`);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fieldSize: `${UPLOAD_LIMIT}MB` } });


router.route('/add').post(authorize(SUPER_ADMIN), upload.fields([{ name: "logo", maxCount: 1 }, { name: "cover", maxCount: 1 }]), controller.create)
router.route('/addqrCode/:universityId').post(authorize(RESPONSABLE), validate(createqr), controller.generateQRCode)


router.route('/update_by_admin/:universityId').put(authorize(SUPER_ADMIN), validate(updateUniversityByAdmin), controller.updateUniversityByAdmin)
router.route('/approve/:universityId').put(authorize(SUPER_ADMIN), controller.ApproveUniversity)
router.route('/update_images/:universityId').put(authorize(RESPONSABLE), upload.fields([{ name: "logo", maxCount: 1 }, { name: "cover", maxCount: 1 }]), controller.UpdateImages)
router.route('/update/:universityId').put(authorize(RESPONSABLE), controller.updateUniversity)
router.route('/delete/:universityId').delete(authorize(SUPER_ADMIN), controller.DeleteUniversity)
router.route('/deleteFormation/:formationId').delete(authorize(RESPONSABLE), controller.DeleteFormation)
router.route('/addFormation/:universityId').post(authorize(RESPONSABLE), validate(createFormation), controller.addFormation)
router.route('/updateFormation/:formationId').patch(authorize(RESPONSABLE), validate(createFormation), controller.updateFormation)
//
router.route('/getAll').get(authorize(), controller.getAllUniversitys)
router.route('/getAllFront').get(authorize(), controller.getAllUniversitysFront)
router.route('/getFormation/:universityId/:formation').get(authorize(), controller.getFormationByid)
router.route("/getFormation/:city").get(authorize(), controller.getFormationByCountry)


router.route('/getOne/:universityId').get(authorize(), controller.getOneUniversity)
router.route('/getFormations/:universityId').get(authorize(), controller.getFormationOfUniversity)
router.route('/getFormations').get(controller.getAllFormations)
router.route('/addAdmin/:universityId').post(authorize(SUPER_ADMIN), validate(createAdmin), controller.createAdmin)
router.route('/getAdmin/:universityId').get(authorize([SUPER_ADMIN, LOGGED_USER]), controller.getAdmin)
router.route('/delAdmin/:userId').delete(authorize(SUPER_ADMIN), controller.DeleteAdmin)





module.exports = router;
