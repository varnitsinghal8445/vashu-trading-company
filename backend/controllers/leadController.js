import asyncHandler from 'express-async-handler';
import Lead from '../models/leadModel.js';

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private/Admin
const getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find({}).sort({ createdAt: -1 });
  res.json(leads);
});

// @desc    Create a lead
// @route   POST /api/leads
// @access  Public
const createLead = asyncHandler(async (req, res) => {
  const { name, phone, email, event, date, location, budget, source, notes } = req.body;

  const lead = new Lead({
    name,
    phone,
    email,
    event,
    date,
    location,
    budget,
    source: source || 'Website',
    notes,
  });

  const createdLead = await lead.save();
  res.status(201).json(createdLead);
});

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private/Admin
const updateLead = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;

  const lead = await Lead.findById(req.params.id);

  if (lead) {
    lead.status = status || lead.status;
    lead.notes = notes || lead.notes;

    const updatedLead = await lead.save();
    res.json(updatedLead);
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

export { getLeads, createLead, updateLead };
