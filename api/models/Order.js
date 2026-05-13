const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  products: [{
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitType: { type: String, enum: ['Pieces', 'Cases', 'Cartons', 'Pallets'], required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 }
  }],
  totalOrderValue: { type: Number, required: true },
  deliveryDate: { type: Date, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Bank Transfer', 'Credit', 'Other'], required: true },
  invoiceStatus: { type: String, enum: ['Not Created', 'Created', 'Sent', 'Paid'], default: 'Not Created' },
  salesPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialInstructions: { type: String },
  orderStatus: { type: String, default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
