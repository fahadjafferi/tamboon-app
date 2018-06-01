import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let charitiesSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Charity', charitiesSchema);
