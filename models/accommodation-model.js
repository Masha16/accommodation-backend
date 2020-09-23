const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const accomSchema = new Schema({
  postname: String,
  city: String,
  size: String,
  description: String,
  price: String,
  requests: [{ type: Schema.Types.ObjectId, ref: 'Requests' }],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}, 
  imageUrl: { type: String, required: true },
});
 
const Accom = mongoose.model('Accom', accomSchema);
 
module.exports = Accom;