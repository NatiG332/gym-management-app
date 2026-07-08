const { getDb } = require('../config/database');

function getDashboard(req, res) {
  try {
    const db = getDb();
    const users = db.prepare('SELECT COUNT(*) AS count FROM users').get();
    const classes = db.prepare('SELECT COUNT(*) AS count FROM classes').get();
    const bookings = db.prepare('SELECT COUNT(*) AS count FROM bookings').get();
    db.close();

    return res.json({
      users: users.count,
      classes: classes.count,
      bookings: bookings.count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not fetch dashboard stats' });
  }
}

module.exports = { getDashboard };
