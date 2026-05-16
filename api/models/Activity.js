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

// ─── Indexes ────────────────────────────────────────────────────────────
activitySchema.index({ workspace: 1, createdAt: -1 });
activitySchema.index({ workspace: 1, lead: 1, createdAt: -1 });

module.exports = mongoose.model('Activity', activitySchema);

