// Import necessary modules
const express = require('express')
const router = express.Router()
const DrumKit = require('../models/DrumKit.model')

// Route to create a new drum kit
router.post('/', async (req, res) => {
  try {
    const { name, drumPads } = req.body
    const drumKit = new DrumKit({ name, drumPads })
    await drumKit.save()
    res.status(201).json(drumKit)
  } catch (error) {
    console.error('Error creating drum kit:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to get all drum kits
router.get('/', async (req, res) => {
  try {
    const drumKits = await DrumKit.find()
    res.json(drumKits)
  } catch (error) {
    console.error('Error getting drum kits:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to get a specific drum kit by ID
// Route to get a specific drum kit by ID
router.get('/:id', async (req, res) => {
  try {
    const drumKit = await DrumKit.findById(req.params.id).populate('drumPads')
    if (!drumKit) {
      return res.status(404).json({ error: 'Drum kit not found' })
    }
    res.json(drumKit)
  } catch (error) {
    console.error('Error getting drum kit:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to update a drum kit by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, drumPads } = req.body
    const drumKit = await DrumKit.findByIdAndUpdate(
      req.params.id,
      { name, drumPads },
      { new: true }
    )
    if (!drumKit) {
      return res.status(404).json({ error: 'Drum kit not found' })
    }
    res.json(drumKit)
  } catch (error) {
    console.error('Error updating drum kit by ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to delete a drum kit by ID
router.delete('/:id', async (req, res) => {
  try {
    const drumKit = await DrumKit.findByIdAndDelete(req.params.id)
    if (!drumKit) {
      return res.status(404).json({ error: 'Drum kit not found' })
    }
    res.json({ message: 'Drum kit deleted successfully' })
  } catch (error) {
    console.error('Error deleting drum kit by ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
