const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const drumKitSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required.'],
    trim: true,
  },
  
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
  // Outros campos que você desejar adicionar, como descrição, proprietário, etc.
})

const DrumKit = model('DrumKit', drumKitSchema)

module.exports = DrumKit
