import { string } from "joi";

export { };

const mongoose = require('mongoose');

let status_list = [
    "complete",
    "not_complete",
    "fail",
];
const TransactionSchema = new mongoose.Schema({
    demande: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'demande',

    },
    montant: { type: String },
    devise: {
        type: String,
    }
    , clictopayid: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: status_list
    },
    error: {
        type: String,
        default: null,
    },
    type: {
        type: String,   //"rib" or "online"
        default: null,
    },
    recu: {
        type: String,   //hedha l url taa l recu
        default: null,
    },

},
    {
        timestamps: true
    });

module.exports = mongoose.model('Transaction', TransactionSchema);