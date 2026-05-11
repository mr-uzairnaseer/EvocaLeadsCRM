const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Won'], 
    default: 'New' 
  },
  value: { type: Number, default: 0 },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: [{ 
    text: String, 
    date: { type: Date, default: Date.now } 
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
