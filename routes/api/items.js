const express = require('express');
const router = express.Router();

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
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route   UPDATE api/items/:id
// @desc    Update an Item
// @access  Public
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route   DELETE api/items/:id
// @desc    Create an Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
