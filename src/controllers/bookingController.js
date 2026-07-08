const bookingModel = require('../models/bookingModel');

function getBookings(req, res) {
  try {
    const bookings = bookingModel.listBookings();
    return res.json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not fetch bookings' });
  }
}

function addBooking(req, res) {
  try {
    const { userId, classId } = req.body;
    if (!userId || !classId) {
      return res.status(400).json({ error: 'User ID and class ID are required' });
    }

    const booking = bookingModel.createBooking({ userId, classId });
    return res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not create booking' });
  }
}

module.exports = { getBookings, addBooking };
