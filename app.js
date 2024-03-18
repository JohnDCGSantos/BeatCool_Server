// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')
const path = require('path')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/api', indexRoutes)

const padRoutes = require('./routes/drum.routes')
app.use('/pads', padRoutes)
const soundRoutes = require('./routes/sounds.routes')
app.use('/', soundRoutes)

const drumKitsRouts = require('./routes/drumKits.routes')
app.use('/drumKits', drumKitsRouts)

const recordedRouts = require('./routes/recordedSequences.routes')
app.use('/recorded', recordedRouts)

const beatMakerRoutes = require('./routes/beatMaker.routes')
app.use('/beatMaker', beatMakerRoutes)

const beatmakeranddrumkits = require('./routes/beatMakerAndDrumKit.routes')
app.use('/beatMakerAndDrumKit', beatmakeranddrumkits)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
