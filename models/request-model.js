const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const requestSchema = new Schema({
  requestDesc: String,
  accommodation:[ {
    type: Schema.Types.ObjectId,
    ref: 'Accom'
  }]
});
 
const Requests = mongoose.model('Requests', requestSchema);
 
module.exports = Requests;