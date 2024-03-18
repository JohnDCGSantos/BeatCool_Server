// Import necessary modules
const express = require('express')
const router = express.Router()
const BeatMaker = require('../models/BeatMaker.model')

// Route to create a new drum kit
router.post('/', async (req, res) => {
  try {
    const { name, drumPads } = req.body
    const beatMaker = new BeatMaker({ name, drumPads })
    await beatMaker.save()
    res.status(201).json(beatMaker)
  } catch (error) {
    console.error('Error creating drum kit:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to get all drum kits
router.get('/', async (req, res) => {
  try {
    const beatMakers = await BeatMaker.find()
    res.json(beatMakers)
  } catch (error) {
    console.error('Error getting drum kits:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to get a specific drum kit by ID
// Route to get a specific drum kit by ID
router.get('/:id', async (req, res) => {
  try {
    const beatMaker = await BeatMaker.findById(req.params.id).populate('drumPads')
    if (!beatMaker) {
      return res.status(404).json({ error: 'Drum kit not found' })
    }
    res.json(beatMaker)
  } catch (error) {
    console.error('Error getting drum kit:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to update a drum kit by ID

module.exports = router
