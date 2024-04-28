// models/BeatMaker.js
const { Schema, model } = require('mongoose')

const beatMakerSchema = new Schema({
  name: { type: String, required: true },
  drumPads: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DrumPad',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const BeatMaker = model('BeatMaker', beatMakerSchema)

module.exports = BeatMaker
