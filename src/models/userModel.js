const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/database');

function registerUser({ name, email, password, role = 'member' }) {
  const db = getDb();
  const hashedPassword = bcrypt.hashSync(password, 10);
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(name, email, hashedPassword, role);
  db.close();
  return { id: result.lastInsertRowid, name, email, role };
}

function findUserByEmail(email) {
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  db.close();
  return user;
}

function signInUser(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;

  const isValid = bcrypt.compareSync(password, user.password_hash);
  if (!isValid) return null;

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

module.exports = {
  registerUser,
  findUserByEmail,
  signInUser,
};
