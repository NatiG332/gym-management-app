const { getDb } = require('../config/database');

function listClasses() {
  const db = getDb();
  const classes = db.prepare('SELECT * FROM classes ORDER BY id').all();
  db.close();
  return classes;
}

function createClass({ name, trainer, time, capacity }) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO classes (name, trainer, time, capacity)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(name, trainer, time, capacity);
  db.close();
  return { id: result.lastInsertRowid, name, trainer, time, capacity };
}

module.exports = { listClasses, createClass };
