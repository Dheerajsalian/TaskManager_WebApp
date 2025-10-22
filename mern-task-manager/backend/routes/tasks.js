const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Task = require('../models/Task');


router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/', [auth, body('title').notEmpty().withMessage('Title required')], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const newTask = new Task({ user: req.user.id, title: req.body.title, description: req.body.description || '', status: req.body.status || 'Pending' });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.put('/:id', auth, async (req, res) => {
  const { title, description, status } = req.body;
  const taskFields = {};
  if (title !== undefined) taskFields.title = title;
  if (description !== undefined) taskFields.description = description;
  if (status !== undefined) taskFields.status = status;


  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });
    res.json(task);
  } 
catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Task removed' });
  } 
catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
