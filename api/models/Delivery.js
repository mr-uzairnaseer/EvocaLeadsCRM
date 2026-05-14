const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  deliveryId: { type: String, unique: true, required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Optional for samples
  deliveryType: { 
    type: String, 
    enum: ['Sales Sample', 'Customer Order', 'Promotions / Reviews', 'Replacement', 'Other'],
    required: true 
  },
  productsSent: [{
    productName: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  trackingId: { type: String },
  deliveryAddress: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  deliveryStatus: { 
    type: String, 
    enum: ['Pending', 'Dispatched', 'Delivered', 'Failed'], 
    default: 'Pending' 
  },
  purpose: { type: String, enum: ['Sales Sample', 'Promotions / Reviews', 'Customer Order', 'Other'] },
  deliveryPerson: { type: String },
  proofOfDelivery: { type: String }, // URL or File path
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true }
});

deliverySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Delivery', deliverySchema);
