import mongoose from 'mongoose';

export const initMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://danylovol13:58baxmLejH63sBD@cluster0.4uvzyak.mongodb.net/contactsdb?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
