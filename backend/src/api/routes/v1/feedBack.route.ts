export { };

const express = require('express');
const {
    createFeedBack,
    getOneFeedBack,
    deleteFeedback,
    list } = require('../../controllers/feedback.controller')
const { authorize, RESPONSABLE, LOGGED_USER, SOUS_ADMIN, SUPER_ADMIN } = require('../../middlewares/auth');


const router = express.Router();

router.post('/createFeedBack', authorize(), createFeedBack);
router.route('/list').get(authorize(SOUS_ADMIN), list);
router.get('/getOneFeedBack/:id', authorize(SOUS_ADMIN), getOneFeedBack);
router.delete('/deleteFeedBack/:id', authorize(SOUS_ADMIN), deleteFeedback);


module.exports = router;
