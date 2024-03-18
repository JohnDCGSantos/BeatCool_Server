// routes/audioRoutes.js
const router = require('express').Router()
const fs = require('fs')
const path = require('path')

const soundsFolderPath = path.join(__dirname, '..', 'sounds')

router.get('/sounds/:genre/:category/:fileName', (req, res) => {
  const { genre, category, fileName } = req.params
  const filePath = path.join(soundsFolderPath, genre, category, `${fileName}`)

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath)
  } else {
    res.status(404).send('File not found')
  }
})

module.exports = router
