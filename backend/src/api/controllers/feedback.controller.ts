import { NextFunction, Request, Response } from 'express';
// const ObjectId = mongoose.Types.ObjectId;
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const APIError = require('../../api/utils/APIError');
const FeedBack = require('../models/feedBack.model');

import { apiJson } from '../../api/utils/Utils';



const createFeedBack = (req: any, res: any, next: any) => {
    const { comment, starsNumber } = req.body;
    if (!starsNumber || !comment) {
        throw new APIError({
            message: 'all fields are required',
            status: 302
        });
    }

    const feedBack = new FeedBack({
        ...req.body, User: req.route.meta.user._id
    });


    feedBack.save((err: any) => {
        if (err) return next(err);
        res.json(feedBack);
    });
};

const getOneFeedBack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const feedBack = (await FeedBack.get(id));
        if (feedBack.seen == false) {

            feedBack.seen = true;
        }
        const data = (await feedBack.save()).transform(req)
        apiJson({ req, res, data: data, model: FeedBack });
    } catch (e) {
        next(e);
    }
}
const deleteFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const feedBack = (await FeedBack.get(id));
        await FeedBack.findByIdAndRemove(id)
        const data = { status: 'OK' };
        apiJson({ req, res, data: data });
    } catch (e) {
        next(e);
    }
}

const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.query = { ...req.query };
        // const data = (await FeedBack.list(req)).transform(req);
        const data = (await FeedBack.find().populate("User"));
        apiJson({ req, res, data, model: FeedBack });
    } catch (e) {
        next(e);
    }
};


module.exports = {
    createFeedBack,
    getOneFeedBack,
    deleteFeedback,
    list
};