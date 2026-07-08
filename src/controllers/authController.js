const userModel = require('../models/userModel');

function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existing = userModel.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const user = userModel.registerUser({ name, email, password, role });
    return res.status(201).json({ message: 'User created', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Registration failed' });
  }
}

function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = userModel.signInUser(email, password);
    if (!result) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { register, login };
