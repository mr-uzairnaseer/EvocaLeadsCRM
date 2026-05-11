const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config({ path: '../.env' });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    const existingAdmin = await User.findOne({ email: 'admin@leadscrm.com' });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      process.exit();
    }

    const admin = new User({
      name: 'System Admin',
      email: 'admin@leadscrm.com',
      password: 'admin_password_123', // You should change this after login!
      role: 'Admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@leadscrm.com');
    console.log('Password: admin_password_123');
    process.exit();
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
