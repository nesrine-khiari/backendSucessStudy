import path = require("path");

export { };
const express = require('express');
const validate = require('express-validation');
const { authorize, RESPONSABLE, LOGGED_USER, } = require('../../middlewares/auth');

const controller = require('../../controllers/demande.controller');
const router = express.Router();
const multer = require('multer');
const { UPLOAD_LIMIT } = require('../../../config/vars');







const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, `uploads/`);
      },
    filename: (req: Request, file: any, cb: any) => {
        // fieldname, originalname, mimetype
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf") {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }

    }
});
const upload = multer({ storage, limits: { fieldSize: `${UPLOAD_LIMIT}MB` } });


router.route('/add/:formationId/:universiteId')
    .post(authorize(),
        upload.fields([
            { name: "CV", maxCount: 1 },
            { name: "passeport", maxCount: 1 },
            { name: "releveDeNote", maxCount: 1 },
            { name: "diplome", maxCount: 1 },
            { name: "motivation", maxCount: 1 }]),
        controller.create)

router.route('/getAll/:universityId').get(authorize([RESPONSABLE, LOGGED_USER]), controller.getAllDemande)
router.route('/getAll').get(controller.getAll)
router.route('/getOne/:demandeId').get(authorize(LOGGED_USER), controller.getOneDemande)

router.route('/update_demande').patch(authorize(RESPONSABLE), controller.changeStatus)



module.exports = router;
