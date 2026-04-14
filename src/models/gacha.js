const mongoose = require('mongoose');

const gachaSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  prizeName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gacha', gachaSchema);
