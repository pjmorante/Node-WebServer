const mongoose = require('mongoose');

const dbConnection = async() => {

  try {
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('DB online')

  } catch (error) {
    console.log(error)
    throw new Error('Error en la conexión a la DB')
  }
}

module.exports = {
  dbConnection
}