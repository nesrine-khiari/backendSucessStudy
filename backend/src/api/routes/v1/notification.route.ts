export { }

const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/notif.controller');
const { authorize, RESPONSABLE, LOGGED_USER, SOUS_ADMIN, SUPER_ADMIN } = require('../../middlewares/auth');

// Get all notifications
router.route('/get-own-id').get(authorize(), notificationController.getAllNotifications);

// Get a specific notification by ID
router.route('/:id').get(authorize(), notificationController.getNotificationById);

// Create a new notification
router.route('/').post(authorize(), notificationController.createNotification);

// Update an existing notification by ID
router.route('/:id').patch(authorize(), notificationController.updateNotificationById);

// Delete a notification by ID
router.route('/:id').delete(authorize(), notificationController.deleteNotificationById);

module.exports = router;

