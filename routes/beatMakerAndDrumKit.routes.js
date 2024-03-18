// routes/beatMakerAndDrumKitRoutes.js
const express = require('express')
const router = express.Router()
const BeatMakerAndDrumKit = require('../models/BeatMakerAndDrumKit.model')

// Create BeatMakerAndDrumKit
router.post('/', async (req, res) => {
  try {
    const { name, drumKits, beatMakers } = req.body
    const newBeatMakerAndDrumKit = await BeatMakerAndDrumKit.create({ name, drumKits, beatMakers })
    res.status(201).json(newBeatMakerAndDrumKit)
  } catch (error) {
    console.error('Error creating BeatMakerAndDrumKit:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all BeatMakerAndDrumKits
router.get('/', async (req, res) => {
  try {
    const beatMakerAndDrumKits = await BeatMakerAndDrumKit.find()
    res.json(beatMakerAndDrumKits)
  } catch (error) {
    console.error('Error getting BeatMakerAndDrumKits:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get BeatMakerAndDrumKit by ID
router.get('/:id', async (req, res) => {
  try {
    const beatMakerAndDrumKit = await BeatMakerAndDrumKit.findById(req.params.id)
    if (!beatMakerAndDrumKit) {
      return res.status(404).json({ error: 'BeatMakerAndDrumKit not found' })
    }
    res.json(beatMakerAndDrumKit)
  } catch (error) {
    console.error('Error getting BeatMakerAndDrumKit by ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update BeatMakerAndDrumKit
router.put('/:id', async (req, res) => {
  try {
    const beatMakerAndDrumKit = await BeatMakerAndDrumKit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!beatMakerAndDrumKit) {
      return res.status(404).json({ error: 'BeatMakerAndDrumKit not found' })
    }
    res.json(beatMakerAndDrumKit)
  } catch (error) {
    console.error('Error updating BeatMakerAndDrumKit:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete BeatMakerAndDrumKit
router.delete('/:id', async (req, res) => {
  try {
    const beatMakerAndDrumKit = await BeatMakerAndDrumKit.findByIdAndDelete(req.params.id)
    if (!beatMakerAndDrumKit) {
      return res.status(404).json({ error: 'BeatMakerAndDrumKit not found' })
    }
    res.json({ message: 'BeatMakerAndDrumKit deleted successfully' })
  } catch (error) {
    console.error('Error deleting BeatMakerAndDrumKit:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
