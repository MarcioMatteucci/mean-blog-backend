const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: { type: String, required: true },
   lastname: { type: String, required: true },
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   email: { type: String, required: true, unique: true, lowercase: true },
   role: { type: String, enum: ['admin', 'user'], required: false, default: 'user' },
   image: { type: String, required: false, default: './uploads/users/default-avatar.jpg' }
}, { timestamps: true });

// Metodo para comparar las passwords
userSchema.methods.isValidPassword = async function (inputPassword) {
   try {
      return await bcrypt.compare(inputPassword, this.password);
   } catch (err) {
      throw new Error(err);
   }
};

const User = mongoose.model('user', userSchema);

module.exports = User;