const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
       type: String, 
       required: true, 
       unique: true 
      },

    password: {
      type: String,
      required: [true, 'Password is required.'],
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
  combinedEntities: [
    {
       type: Schema.Types.ObjectId,
       ref: 'BeatMakerAndDrumKit' 
      }
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
