export { };
const mongoose = require('mongoose');
const APIError = require('../../api/utils/APIError');
const httpStatus = require('http-status');

import { transformData, listData } from '../../api/utils/ModelUtils';

const FeedBackSchema = new mongoose.Schema(
    {


        starsNumber: { type: Number, default: 0 },
        comment: { type: String, default: '' },
        seen: { type: Boolean, default: false },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }


    },
    { timestamps: true }
);
const ALLOWED_FIELDS = ['id', 'starsNumber', 'comment', 'seen', 'User', 'createdAt'];

FeedBackSchema.method({
    // query is optional, e.g. to transform data for response but only include certain "fields"
    transform({ query = {} }: { query?: any } = {}) {
        // transform every record (only respond allowed fields and "&fields=" in query)
        return transformData(this, query, ALLOWED_FIELDS);
    }
});

FeedBackSchema.statics = {
    async get(id: any) {
        try {
            let feedBack;

            if (mongoose.Types.ObjectId.isValid(id)) {
                feedBack = await this.findById(id).populate("User").exec(); //
            }
            if (feedBack) {
                return feedBack;
            }

            throw new APIError({
                message: 'feedBack does not exist',
                status: httpStatus.NOT_FOUND
            });
        } catch (error) {
            throw error;
        }
    },
    list({ query }: { query: any }) {
        return listData(this, query, ALLOWED_FIELDS);
    }
};

const FeedBack = mongoose.model('feedback', FeedBackSchema);
FeedBack.ALLOWED_FIELDS = ALLOWED_FIELDS;

module.exports = FeedBack;
