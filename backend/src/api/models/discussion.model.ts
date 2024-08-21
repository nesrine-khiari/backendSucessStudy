export { };

const mongoose = require('mongoose');


const DiscussionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 
  },
  superadmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   
  },
  sousadmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 
  },
  seen: { type: Boolean, default: false },
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Discussion', DiscussionSchema);