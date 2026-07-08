const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const dbDir = path.join(__dirname, '..', '..', 'data');
const dbPath = path.join(dbDir, 'gym.db');
const schemaPath = path.join(__dirname, '..', '..', 'db', 'schema.sql');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

function seedSampleData(db) {
  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
  if (userCount === 0) {
    const adminPassword = bcrypt.hashSync('admin123', 10);
    const memberPassword = bcrypt.hashSync('member123', 10);

    db.prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `).run('Amina Clarke', 'admin@pulsefit.com', adminPassword, 'admin');

    db.prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `).run('Noah Brooks', 'member@pulsefit.com', memberPassword, 'member');
  }

  const classCount = db.prepare('SELECT COUNT(*) AS count FROM classes').get().count;
  if (classCount === 0) {
    db.prepare(`
      INSERT INTO classes (name, trainer, time, capacity)
      VALUES (?, ?, ?, ?)
    `).run('HIIT Burn', 'Mina', '06:30 AM', 18);

    db.prepare(`
      INSERT INTO classes (name, trainer, time, capacity)
      VALUES (?, ?, ?, ?)
    `).run('Strength Lab', 'Daniel', '7:00 PM', 12);

    db.prepare(`
      INSERT INTO classes (name, trainer, time, capacity)
      VALUES (?, ?, ?, ?)
    `).run('Yoga Flow', 'Sara', '8:00 PM', 16);
  }

  const bookingCount = db.prepare('SELECT COUNT(*) AS count FROM bookings').get().count;
  if (bookingCount === 0) {
    const member = db.prepare('SELECT id FROM users WHERE email = ?').get('member@pulsefit.com');
    const classRow = db.prepare('SELECT id FROM classes ORDER BY id LIMIT 1').get();
    if (member && classRow) {
      db.prepare('INSERT INTO bookings (user_id, class_id) VALUES (?, ?)').run(member.id, classRow.id);
    }
  }
}

function initializeDatabase() {
  const db = new Database(dbPath);
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
  seedSampleData(db);
  db.close();
  return dbPath;
}

function getDb() {
  return new Database(dbPath);
}

module.exports = {
  initializeDatabase,
  getDb,
};
