const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: 'action' },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
