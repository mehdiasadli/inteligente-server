const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Member', 'Moderator', 'Admin'], default: 'Member' },
    bio: String,
    image: String,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);

    this.password = hashed;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.match = async function (password, res) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return res.status(500).json({ message: 'Cryption error' });
  }
};

module.exports = mongoose.model('User', userSchema);
