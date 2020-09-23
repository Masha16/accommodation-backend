const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String, 
  accommodation:[ {
    type: Schema.Types.ObjectId,
    ref: 'Accom'
  }] 
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;