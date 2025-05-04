import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone number for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String, // 🔥 оце додай
      default: '',  // не обов’язково, але можна
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
