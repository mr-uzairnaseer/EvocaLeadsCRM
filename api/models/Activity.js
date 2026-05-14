const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: 'action' },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true }
});

module.exports = mongoose.model('Activity', activitySchema);
