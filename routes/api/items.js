const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route   POST api/items
// @desc    Create an Item
// @access  Private
router.post('/', auth, (req, res) => {
  // router.post('/', (req, res) => {
  // console.log('req.body', req.body);
  // console.log('req.body.name', req.body.name);
  const newItem = new Item({
    name: req.body.name,
  });

  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

// @route   UPDATE api/items/:id
// @desc    Update an Item
// @access  Private
router.put('/:id', auth, (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route   DELETE api/items/:id
// @desc    Create an Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
