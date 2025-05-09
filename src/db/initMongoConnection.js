import mongoose from 'mongoose';

export async function initMongoConnection(uri) {
  if (!uri) throw new Error('MONGODB_URI is not set');
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
