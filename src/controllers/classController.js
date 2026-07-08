const classModel = require('../models/classModel');

function getClasses(req, res) {
  try {
    const classes = classModel.listClasses();
    return res.json(classes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not fetch classes' });
  }
}

function addClass(req, res) {
  try {
    const { name, trainer, time, capacity } = req.body;
    if (!name || !trainer || !time || !capacity) {
      return res.status(400).json({ error: 'All class fields are required' });
    }

    const newClass = classModel.createClass({ name, trainer, time, capacity });
    return res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not create class' });
  }
}

module.exports = { getClasses, addClass };
