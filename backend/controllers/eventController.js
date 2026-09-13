import asyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';
import User from '../models/userModel.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  // Photographers can only see their assigned events. Admin sees all.
  let filter = {};
  if (req.user.role === 'Photographer') {
    filter.photographerId = req.user._id;
  }
  
  const events = await Event.find(filter)
    .populate('customerId', 'name phone email')
    .populate('photographerId', 'name')
    .populate('staffId', 'name');
  
  res.json(events);
});

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const { title, eventType, start, end, customerId, photographerId, location, notes } = req.body;

  // Conflict Check
  if (photographerId) {
    const conflict = await Event.findOne({
      photographerId,
      $or: [
        { start: { $lt: end }, end: { $gt: start } }
      ]
    });
    
    if (conflict) {
      res.status(400);
      throw new Error('Conflict: Photographer is already booked for this time slot.');
    }
  }

  const event = new Event({
    title,
    eventType,
    start,
    end,
    customerId,
    photographerId,
    location,
    notes,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

export { getEvents, createEvent };
