// models/DrumPad.model.js

const { Schema, model } = require('mongoose')

const drumPadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    soundUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const DrumPad = model('DrumPad', drumPadSchema)

module.exports = DrumPad
