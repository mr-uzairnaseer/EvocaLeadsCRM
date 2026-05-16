const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./utils/db');
const Lead = require('./models/Lead');
const User = require('./models/User');
const Activity = require('./models/Activity');
const Order = require('./models/Order');
const Delivery = require('./models/Delivery');
const Workspace = require('./models/Workspace');
const jwt = require('jsonwebtoken');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
const app = express();

app.use(cors());
app.use(express.json());

// Critical Var Check
app.get('/api/debug', (req, res) => {
  res.send({
    hasMongoUri: !!process.env.MONGODB_URI,
    hasJwtSecret: !!process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV,
    msg: "If hasMongoUri is false, you forgot to add it to Vercel Settings!"
  });
});

app.get('/api/test-db', async (req, res) => {
  try {
    await connectDB();
    res.send({ status: 'Connected to MongoDB successfully!' });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// Auth Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ error: 'Authentication required.' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findOne({ _id: decoded.id, workspace: decoded.workspaceId });
    
    if (!user) throw new Error();
    
    req.user = user;
    req.workspaceId = decoded.workspaceId;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Auto-Seed Logic
const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@leadscrm.com';
    let admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      admin = new User({
        name: 'System Admin',
        email: adminEmail,
        password: 'admin_password_123',
        role: 'Admin',
        isOwner: true
      });
      await admin.save();
      console.log('✅ Auto-Seed: Admin user created.');
    }

    if (!admin.workspace) {
      const workspace = new Workspace({
        name: 'Admin Workspace',
        owner: admin._id
      });
      await workspace.save();
      admin.workspace = workspace._id;
      await admin.save();
      console.log('✅ Auto-Seed: Admin workspace created and linked.');
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

// Signup (Create Workspace + Owner)
app.post('/api/auth/signup', async (req, res) => {
  try {
    await connectDB();
    const { name, email, password, workspaceName } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send({ error: 'Email already registered.' });

    // 1. Create User Instance
    const user = new User({
      name,
      email,
      password,
      role: 'BDM',
      isOwner: true
    });
    
    // 2. Create Workspace Instance
    const workspace = new Workspace({ 
      name: workspaceName,
      owner: user._id
    });
    
    // 3. Link User to Workspace
    user.workspace = workspace._id;
    
    await workspace.save();
    await user.save();
    
    const token = jwt.sign({ id: user._id, workspaceId: workspace._id, role: user.role }, process.env.JWT_SECRET);
    res.status(201).send({ user, workspace, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('workspace');
    
    if (!user) return res.status(400).send({ error: 'Invalid email or password' });
    
    console.log('Login attempt for:', email);
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) return res.status(400).send({ error: 'Invalid email or password' });
    
    if (!user.workspace) return res.status(400).send({ error: 'User has no associated workspace.' });
    
    const token = jwt.sign({ id: user._id, workspaceId: user.workspace._id, role: user.role }, process.env.JWT_SECRET);
    res.send({ user, workspace: user.workspace, token });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// Get Leads
app.get('/api/leads', auth, async (req, res) => {
  try {
    await connectDB();
    const leads = await Lead.find({ workspace: req.workspaceId }).populate('leadOwner', 'name role').sort({ createdAt: -1 });
    res.send(leads);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// Create Lead
app.post('/api/leads', auth, async (req, res) => {
  try {
    await connectDB();
    const { companyName, phoneWhatsApp } = req.body;
    
    const existingLead = await Lead.findOne({
      workspace: req.workspaceId,
      $or: [{ companyName }, { phoneWhatsApp }]
    });
    
    // Allow duplicate names if phone numbers are completely different? For CRM usually both matching is bad, but finding either is too aggressive for big CRM. We will assume the CRM meant to block exact duplicates. In the current logic, finding either blocks it. Let's fix that block message to be accurate!
    
    if (existingLead) return res.status(400).send({ error: 'Lead with this Company Name or Phone Number already exists in your workspace.' });

    const leadOwner = req.body.leadOwner || req.user.id;
    const lead = new Lead({ ...req.body, leadOwner, workspace: req.workspaceId });
    await lead.save();
    
    const activity = new Activity({
      user: req.user ? req.user.name : 'System',
      text: `Lead created: ${lead.companyName}`,
      lead: lead._id,
      workspace: req.workspaceId
    });
    await activity.save();
    
    res.status(201).send(lead);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Update Lead
app.patch('/api/leads/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const originalLead = await Lead.findOne({ _id: req.params.id, workspace: req.workspaceId });
    if (!originalLead) return res.status(404).send({ error: 'Lead not found' });

    const lead = await Lead.findOneAndUpdate({ _id: req.params.id, workspace: req.workspaceId }, req.body, { new: true });
    
    // Log activity if status changed
    if (req.body.status && req.body.status !== originalLead.status) {
      const activity = new Activity({
        user: req.user ? req.user.name : 'System',
        text: `Status updated to ${req.body.status}`,
        lead: lead._id,
        workspace: req.workspaceId
      });
      await activity.save();
    }

    // Log activity if lead owner changed
    if (req.body.leadOwner && String(req.body.leadOwner) !== String(originalLead.leadOwner)) {
      const newOwner = await User.findById(req.body.leadOwner);
      const activity = new Activity({
        user: req.user ? req.user.name : 'System',
        text: `Assigned to ${newOwner ? newOwner.name : 'new owner'}`,
        lead: lead._id,
        workspace: req.workspaceId
      });
      await activity.save();
    }

    res.send(lead);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Delete Lead
app.delete('/api/leads/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const lead = await Lead.findOneAndDelete({ _id: req.params.id, workspace: req.workspaceId });
    if (!lead) return res.status(404).send({ error: 'Lead not found' });
    
    // Delete associated activities
    await Activity.deleteMany({ lead: lead._id, workspace: req.workspaceId });

    res.send(lead);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// --- USER ROUTES ---
app.get('/api/users', auth, async (req, res) => {
  try {
    await connectDB();
    const users = await User.find({ workspace: req.workspaceId }).select('-password');
    res.send(users);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.post('/api/users', auth, async (req, res) => {
  try {
    await connectDB();
    // Permission check: only Owner or BDM can add users
    if (req.user.role !== 'BDM' && !req.user.isOwner) {
      return res.status(403).send({ error: 'Permission denied.' });
    }
    
    // Permission check: only Owner can create BDMs
    if (req.body.role === 'BDM' && !req.user.isOwner) {
      return res.status(403).send({ error: 'Only workspace owners can create Manager accounts.' });
    }

    const user = new User({ ...req.body, workspace: req.workspaceId });
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.patch('/api/users/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const targetUser = await User.findOne({ _id: req.params.id, workspace: req.workspaceId });
    if (!targetUser) return res.status(404).send({ error: 'User not found' });

    // 1. Permission Check
    if (!req.user.isOwner) {
      // Must be BDM to edit anyone
      if (req.user.role !== 'BDM') return res.status(403).send({ error: 'Permission denied.' });
      
      // BDMs cannot edit other BDMs or Owner
      const isEditingSelf = targetUser._id.toString() === req.user._id.toString();
      if (!isEditingSelf && (targetUser.isOwner || targetUser.role === 'BDM')) {
        return res.status(403).send({ error: 'Managers cannot modify other administrators or the owner.' });
      }
    }

    // 2. Promotion Check
    if (req.body.role === 'BDM' && !req.user.isOwner) {
      return res.status(403).send({ error: 'Only workspace owners can promote users to Manager.' });
    }

    const { password, ...updates } = req.body;
    if (password) {
      console.log('Updating password for user:', targetUser.email);
      targetUser.password = password;
    }
    
    Object.assign(targetUser, updates);
    console.log('Modified paths:', targetUser.modifiedPaths());
    await targetUser.save();
    console.log('User saved successfully');
    
    const response = targetUser.toObject();
    delete response.password;
    res.send(response);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.delete('/api/users/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const userToDelete = await User.findOne({ _id: req.params.id, workspace: req.workspaceId });
    if (!userToDelete) return res.status(404).send({ error: 'User not found' });
    
    // 1. Cannot delete owner
    if (userToDelete.isOwner) return res.status(403).send({ error: 'Cannot delete workspace owner.' });

    // 2. Permission check
    // If requester is not owner...
    if (!req.user.isOwner) {
      // Must be BDM to delete anyone
      if (req.user.role !== 'BDM') return res.status(403).send({ error: 'Permission denied. Only BDM or Owner can delete.' });
      
      // BDMs cannot delete other BDMs
      if (userToDelete.role === 'BDM') return res.status(403).send({ error: 'Managers cannot delete other administrators.' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// --- ACTIVITY ROUTES ---
app.get('/api/activity', auth, async (req, res) => {
  try {
    await connectDB();
    const activity = await Activity.find({ workspace: req.workspaceId }).sort({ createdAt: -1 }).limit(500);
    res.send(activity);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/api/activity', auth, async (req, res) => {
  try {
    await connectDB();
    const activity = new Activity({ 
      ...req.body, 
      user: req.user ? req.user.name : req.body.user,
      workspace: req.workspaceId 
    });
    await activity.save();
    res.status(201).send(activity);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post('/api/activity/mark-all-read', auth, async (req, res) => {
  try {
    await connectDB();
    await Activity.updateMany({ workspace: req.workspaceId, isRead: false }, { isRead: true });
    res.send({ message: 'All activities marked as read' });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete('/api/activity/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const activity = await Activity.findOneAndDelete({ _id: req.params.id, workspace: req.workspaceId });
    if (!activity) return res.status(404).send({ error: 'Activity not found' });
    res.send({ message: 'Activity deleted' });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Stats for Dashboard
app.get('/api/stats', auth, async (req, res) => {
  try {
    await connectDB();
    const workspaceId = new mongoose.Types.ObjectId(req.workspaceId);

    const leadStats = await Lead.aggregate([
      { $match: { workspace: workspaceId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const pipeline = {
      'New Lead': 0, 'Contacted': 0, 'Qualified Lead': 0, 
      'Sample / Price Sent': 0, 'Order Confirmed': 0, 
      'Delivery Scheduled': 0, 'Delivered': 0, 
      'Payment Pending': 0, 'Payment Received': 0, 
      'Active Customer / Repeat Order': 0, 'Lost Lead': 0
    };

    let totalLeads = 0;
    leadStats.forEach(stat => {
      const status = stat._id || 'New Lead';
      if (pipeline[status] !== undefined) {
        pipeline[status] = stat.count;
      }
      totalLeads += stat.count;
    });

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    
    const [todayFollowUps, samplesSent, monthlySales] = await Promise.all([
      Lead.countDocuments({ workspace: req.workspaceId, nextFollowUpDate: { $lte: endOfToday } }),
      Delivery.countDocuments({ workspace: req.workspaceId, deliveryType: 'Sales Sample' }),
      Order.aggregate([
        { $match: { 
            workspace: workspaceId,
            createdAt: { 
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) 
            }
        }},
        { $group: { _id: null, total: { $sum: "$totalOrderValue" } } }
      ]).then(res => res[0]?.total || 0)
    ]);

    res.send({
      totalLeads,
      newLeads: pipeline['New Lead'],
      hotLeads: pipeline['Qualified Lead'] + pipeline['Sample / Price Sent'],
      todayFollowUps,
      samplesSent,
      deliveredOrders: pipeline['Delivered'],
      monthlySalesValue: monthlySales,
      lostLeads: pipeline['Lost Lead'],
      pipeline
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// --- ORDER ROUTES ---
app.get('/api/orders', auth, async (req, res) => {
  try {
    await connectDB();
    const orders = await Order.find({ workspace: req.workspaceId }).populate('lead').populate('salesPerson');
    res.send(orders);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/api/orders', auth, async (req, res) => {
  try {
    await connectDB();
    const order = new Order({ ...req.body, workspace: req.workspaceId });
    await order.save();
    
    // Update lead status when order is confirmed
    await Lead.findOneAndUpdate({ _id: req.body.lead, workspace: req.workspaceId }, { status: 'Order Confirmed' });
    
    res.status(201).send(order);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// --- DELIVERY ROUTES ---
app.get('/api/deliveries', auth, async (req, res) => {
  try {
    await connectDB();
    const deliveries = await Delivery.find({ workspace: req.workspaceId }).populate('lead').populate('order');
    res.send(deliveries);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/api/deliveries', auth, async (req, res) => {
  try {
    await connectDB();
    const delivery = new Delivery({ ...req.body, workspace: req.workspaceId });
    await delivery.save();
    res.status(201).send(delivery);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Export for Vercel
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

