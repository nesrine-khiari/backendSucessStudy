export { };

const mongoose = require('mongoose');
const {Schema} = mongoose;

const notificationSchema = new Schema({
	idOwnerUniv: {
		type: mongoose.Schema.Types.ObjectId,ref:'university'
	},
    idOwnerUser: {
		type: mongoose.Schema.Types.ObjectId,ref:'User'
	},
	receiversUser: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
	receiversUniv: {type: mongoose.Schema.Types.ObjectId,ref:'university'},
		
	
	content: {
		type: String
	},
    link:{type: String},
    type:{type: String},
	send_date: {
		type: Date
	},
})

module.exports = mongoose.model('notifications', notificationSchema)
