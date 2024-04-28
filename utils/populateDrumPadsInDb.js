const fs = require('fs')
const path = require('path')
const DrumPad = require('../models/DrumPad.model')
const mongoose = require('mongoose')

const soundsFolderPath = path.join(__dirname, '..', 'sounds')

async function populateDrumPads(folderPath, processedSounds = new Set()) {
  try {
    const files = fs.readdirSync(folderPath, { withFileTypes: true })

    const drumPads = []

    for (const file of files) {
      const filePath = path.join(folderPath, file.name)

      if (file.isDirectory()) {
        // Recursively populate drum pads from subdirectory
        drumPads.push(...(await populateDrumPads(filePath, processedSounds)))
      } else {
        // Skip .DS_Store files
        if (file.name === '.DS_Store') {
          continue
        }

        // Extract category names from the parent folders
        const genre = path.basename(path.dirname(path.dirname(filePath))) // Two levels up for genre
        const category = path.basename(path.dirname(filePath)) // One level up for category
        const name = path.basename(filePath, path.extname(filePath))
        const soundUrl = `http://localhost:5005/sounds/${genre}/${category}/${name}.wav`

        drumPads.push({ name, soundUrl, genre, category })
      }
    }

    return drumPads
  } catch (error) {
    console.error('Error populating drum pads:', error)
    return []
  }
}

async function filterAndSaveUniqueDrumPads() {
  try {
    const drumPads = await populateDrumPads(soundsFolderPath)
    const existingDrumPads = await DrumPad.find({}, 'soundUrl').lean()

    // Filter out duplicate drum pads based on soundUrl
    const uniqueDrumPads = drumPads.filter(newPad => {
      return !existingDrumPads.some(existingPad => existingPad.soundUrl === newPad.soundUrl)
    })

    // Save unique drum pads to the database
    if (uniqueDrumPads.length > 0) {
      await DrumPad.insertMany(uniqueDrumPads)
      console.log(`${uniqueDrumPads.length} new unique DrumPads saved to the database`)
    } else {
      console.log('No new unique DrumPads found')
    }
  } catch (error) {
    console.error('Error saving unique DrumPads to the database:', error)
  }
}

const importPads = async () => {
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/BeatCoolServer'

  try {
    await mongoose.connect(MONGO_URI)
    await filterAndSaveUniqueDrumPads()
    mongoose.connection.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

importPads()
