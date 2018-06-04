import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let donationsSchema = new Schema({
  name: String,
  token: String,
  amount: Number
});

module.exports = mongoose.model('Donation', donationsSchema);
