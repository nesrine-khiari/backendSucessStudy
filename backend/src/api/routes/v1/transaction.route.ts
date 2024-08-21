export { };
const express = require('express');
const controller = require('../../controllers/transaction.controller');
const router = express.Router();
router.route('/').get(controller.list).post(controller.create);
router.route('/rib').get(controller.listRib);
router.route('/rib/:idtransaction').put(controller.UpdateStatus);
module.exports = router;