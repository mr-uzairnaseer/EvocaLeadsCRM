const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  value: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Booked', 'Approved', 'Delivered', 'Transacting', 'Non-Trans'],
    default: 'New' 
  },
  notes: { type: String },
  assignedTo: { type: String, default: 'Unassigned' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lead', leadSchema);
