import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    avgMark: { type: Number, required: true },
    onDuty: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Student = model('Student', studentSchema);

export default Student;
