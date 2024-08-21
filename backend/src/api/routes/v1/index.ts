export { };
const express = require('express')
import { apiJson } from '../../../api/utils/Utils';

const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const uploadRoutes = require('./upload.route');
const universityRoutes = require("./university.route")
const messageRoutes = require("./message.route")
const demandeRoutes = require("./demande.route")
const feedBackRoutes = require("./feedBack.route")
const notificationRoutes = require("./notification.route")
const transactionRoutes = require("./transaction.route")



const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req: any, res: any, next: any) => {
  apiJson({ req, res, data: { status: 'OK' } });
  return next();
});

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/university', universityRoutes);
router.use('/message', messageRoutes);
router.use('/demande', demandeRoutes);
router.use('/feedBack', feedBackRoutes);
router.use('/notification', notificationRoutes);
router.use('/transaction', transactionRoutes)




module.exports = router;
