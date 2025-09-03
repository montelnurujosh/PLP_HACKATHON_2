const mongoose = require('mongoose')

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set')
  }
  await mongoose.connect(uri, {
    autoIndex: true
  })
  return mongoose.connection
}

module.exports = { connectToDatabase }



