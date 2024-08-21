const express = require('express');
const { getMessages, sendMessage, getAllDiscussion, createDiscussion, updateConv } = require('../../controllers/message.controller');
const { authorize, SUPER_ADMIN, LOGGED_USER, SOUS_ADMIN, RESPONSABLE } = require('../../middlewares/auth');

const router = express.Router();

router.route('/getAllDiscussion').get(authorize(), getAllDiscussion);
router.get('/messages/:DiscussionId', authorize(), getMessages);
router.post('/send/:DiscussionId', authorize(), sendMessage);
router.post('/createDiscussion', createDiscussion);
router.route('/updateConv/:DiscussionId').patch(authorize(), updateConv);

module.exports = router;
