import mongoose from 'mongoose'
import { getEnvVar } from '../utils/getEnvVar.js'

export const initMongoConnection = async () => {
  const uri = getEnvVar('MONGODB_URI')  
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
    throw error
  }
}
