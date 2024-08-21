export { };
const mongoose = require('mongoose');
const MessageModel = require('../models/message.model');
import { NextFunction, Request, Response, Router } from 'express';
const Discussion = require('../models/discussion.model');
const ObjectId = mongoose.Types.ObjectId;
import { apiJson, randomString } from '../../api/utils/Utils';

const getMessages = (req: any, res: any, next: any) => {
  MessageModel.find({ discussion: req.params.DiscussionId })
    .populate('user')
    .sort({ date: 'asc' })
    .exec((err: any, messages: any) => {
      if (err) return next(err);
      res.json(messages);
    });
};

const getAllDiscussion = async (req: Request, res: Response, next: any) => {
  Discussion.find({ ...req.query })
    .populate('user superadmin sousadmin')
    .sort({ updatedAt: -1 })
    .exec((err: any, messages: any) => {
      if (err) return next(err);
      res.json(messages);
    });
};

const updateConv = async (req: Request, res: Response, next: any) => {
  try {
  

  const { DiscussionId } = req.params;

  const query = { _id: new ObjectId(DiscussionId) };

  const updateConversation = await Discussion.findOneAndUpdate(query,{ $set: { seen: true } },{ new: true ,timestamps: false });

  apiJson({ req, res, data: { updateConversation } });
} catch (e) {
  next(e);
}
   
};


const sendMessage = async (req: any, res: any, next: any) => {
  const { text,user } = req.body;
  if (!text ) {
    return res.send({ error: 'missing params in request' });
  }
 
  const message = new MessageModel({
    text,
  });

  message.user = req.route.meta.user._id;
  message.discussion = req.params.DiscussionId
  if( user) await Discussion.findByIdAndUpdate(req.params.DiscussionId,{ updatedAt: new Date(), seen: false },{ new: true });
  else await Discussion.findByIdAndUpdate(req.params.DiscussionId,{ updatedAt: new Date(), seen: true },{ new: true });
  
  message.save((err: any) => {
    if (err) return next(err);
   
    res.json(message);
  });

};
const createDiscussion = (req: any, res: any, next: any) => {
  const { userId } = req.body;
  console.log(userId);

  if (!userId && (!req.body.sousadminId && !req.body.superadminId)) {
    return res.send({ error: 'missing params in request' });
  }

  const discussion = new Discussion({
  });
discussion.seen=false;
  discussion.user = userId;
  if (req.body.superadminId)
    discussion.superadmin = req.body.superadminId;
  if (req.body.sousadminId)
    discussion.sousadmin = req.body.sousadminId;
  discussion.save((err: any) => {
    if (err) return next(err);
    res.json(discussion);
  });
};

module.exports = {
  getMessages,
  sendMessage,
  createDiscussion,
  getAllDiscussion,
  updateConv
};