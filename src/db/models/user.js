import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.methods.setPassword = function(pass) {
  this.password = bcrypt.hashSync(pass, 10);
};
userSchema.methods.isValidPassword = function(pass) {
  return bcrypt.compareSync(pass, this.password);
};

export const UsersCollection = mongoose.model('User', userSchema);
