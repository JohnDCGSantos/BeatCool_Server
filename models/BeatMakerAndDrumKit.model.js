const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const BeatMakerAndDrumKitSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required.'],
    trim: true,
  },
  drumKits: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DrumKit',
    },
  ],
  beatMakers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BeatMaker',
    },
  ],
  // Outros campos que você desejar adicionar, como descrição, proprietário, etc.
})

const PlayBeatAndDrum = model('BeatMakerAndDrumKit', BeatMakerAndDrumKitSchema)

module.exports = PlayBeatAndDrum
