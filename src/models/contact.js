import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ім’я обов’язкове'],
  },
  email: {
    type: String,
    required: [true, 'Email обов’язковий'],
    match: [/^\S+@\S+\.\S+$/, 'Неправильний формат email'],
  },
  phone: {
    type: String,
    required: [true, 'Номер телефону обов’язковий'],
  },
}, {
  versionKey: false,
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
