// models/RecordedSound.js
const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const recordedSequenceSchema = new Schema(
  {
    name: {
      type: String,
    },
    recordedSounds: [
      {
        sound: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const RecordedSequence = model('RecordedSequence', recordedSequenceSchema)

module.exports = RecordedSequence
