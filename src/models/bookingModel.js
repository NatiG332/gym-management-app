const { getDb } = require('../config/database');

function listBookings() {
  const db = getDb();
  const bookings = db.prepare(`
    SELECT bookings.id, bookings.user_id, users.name AS member_name, classes.name AS class_name, bookings.booked_at
    FROM bookings
    JOIN users ON bookings.user_id = users.id
    JOIN classes ON bookings.class_id = classes.id
    ORDER BY bookings.id DESC
  `).all();
  db.close();
  return bookings;
}

function createBooking({ userId, classId }) {
  const db = getDb();
  const insert = db.prepare('INSERT INTO bookings (user_id, class_id) VALUES (?, ?)');
  const result = insert.run(userId, classId);
  db.close();
  return { id: result.lastInsertRowid, userId, classId };
}

module.exports = { listBookings, createBooking };
