const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['BDA', 'BDM', 'Admin'], default: 'BDA' },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  isOwner: { type: Boolean, default: false },
  handle: { type: String }, // e.g. @name
  phone: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    console.log('Password not modified, skipping hash');
    return next();
  }
  console.log('Hashing password for:', this.email);
  this.password = await bcrypt.hash(this.password, 10);
  console.log('Password hashed successfully');
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  console.log('Comparing passwords for:', this.email);
  const match = await bcrypt.compare(candidatePassword, this.password);
  console.log('Result:', match);
  return match;
};

module.exports = mongoose.model('User', userSchema);

