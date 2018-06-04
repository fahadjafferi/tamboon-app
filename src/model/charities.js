import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let charitiesSchema = new Schema({
  name: String,
  logo_url: String
});

module.exports = mongoose.model('Charity', charitiesSchema);
