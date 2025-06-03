// src/db/models/contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Default-експорт моделі:
export default mongoose.model('Contact', contactSchema);
