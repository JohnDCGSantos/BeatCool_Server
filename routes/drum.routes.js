const router = require('express').Router()
const DrumPad = require('../models/DrumPad.model')

router.get('/', async (req, res, next) => {
  try {
    console.log('Fetching pads...')
    const pads = await DrumPad.find()
    console.log('Pads:', pads)
    res.json(pads)
  } catch (error) {
    console.error('Error fetching pads:', error)
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const drumPad = await DrumPad.findById(req.params.id)
    if (!drumPad) {
      return res.status(404).json({ error: 'Drum pad not found' })
    }
    res.json(drumPad)
  } catch (error) {
    console.error('Error fetching drum pad:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
module.exports = router
