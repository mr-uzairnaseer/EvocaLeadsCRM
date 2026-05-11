const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const Lead = require('./models/Lead');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Auth Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Auto-Seed Logic
const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@leadscrm.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const admin = new User({
        name: 'System Admin',
        email: adminEmail,
        password: 'admin_password_123',
        role: 'Admin'
      });
      await admin.save();
      console.log('✅ Auto-Seed: Admin user created.');
    }
  } catch (e) {
    console.error('Seed error:', e);
  }
};

// Routes
app.get('/api/health', async (req, res) => {
  await connectDB();
  await seedAdmin();
  res.send({ status: 'API is healthy', message: 'Admin account checked/created' });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get Leads
app.get('/api/leads', auth, async (req, res) => {
  try {
    await connectDB();
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.send(leads);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Create Lead
app.post('/api/leads', auth, async (req, res) => {
  try {
    await connectDB();
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).send(lead);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Update Lead Status
app.patch('/api/leads/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(lead);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Stats for Dashboard
app.get('/api/stats', auth, async (req, res) => {
  try {
    await connectDB();
    const totalLeads = await Lead.countDocuments();
    const wonLeads = await Lead.countDocuments({ status: 'Won' });
    const totalValue = await Lead.aggregate([
      { $group: { _id: null, total: { $sum: "$value" } } }
    ]);
    
    res.send({
      totalLeads,
      wonLeads,
      conversionRate: totalLeads ? (wonLeads / totalLeads * 100).toFixed(1) : 0,
      totalValue: totalValue[0]?.total || 0
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Export for Vercel
module.exports = app;
