import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Метод для хешування і збереження пароля
userSchema.methods.setPassword = function (plainPassword) {
  const hash = bcrypt.hashSync(plainPassword, 10);
  this.password = hash;
};

// Метод для перевірки, чи підходить введений пароль
userSchema.methods.isValidPassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

export const UsersCollection = mongoose.model('User', userSchema);
