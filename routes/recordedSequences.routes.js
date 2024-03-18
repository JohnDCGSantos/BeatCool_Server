const RecordedSequence = require('../models/recordedSequence.model')
const router = require('express').Router()
router.post('/recordedSequences', async (req, res) => {
  try {
    const { name, recordedSounds } = req.body

    const newRecordedSequence = new RecordedSequence({
      name,
      recordedSounds,
    })

    await newRecordedSequence.save()

    console.log('Recorded sequence saved successfully')
    res.status(201).json({ message: 'Recorded sequence saved successfully' })
  } catch (err) {
    console.error('Error saving recorded sequence:', err)
    res.status(500).json({ error: 'An error occurred while saving recorded sequence' })
  }
})
router.get('/recordedSequences', async (req, res) => {
  try {
    const recordedSequences = await RecordedSequence.find()
    res.status(200).json(recordedSequences)
  } catch (error) {
    console.error('Error fetching recorded sequences:', error)
    res.status(500).json({ error: 'An error occurred while fetching recorded sequences' })
  }
})
module.exports = router
