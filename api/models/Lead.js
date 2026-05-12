const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  business: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  postcode: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Booked', 'Approved', 'Delivered', 'Transacting', 'Non-Trans'],
    default: 'New' 
  },
  value: { type: Number, default: 0 },
  provider: { type: String },
  bda: { type: String },
  bdm: { type: String },
  callback: { type: String }, // Can be ISO date string or formatted string
  volume: { type: String },
  mid: { type: String },
  notes: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lead', leadSchema);

