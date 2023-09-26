const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.signUp = async (req, res) => {
  const { username } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'İstifadəçi adı artıq mövcuddur' });

    const user = new User(req.body);
    await user.save();

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.match(password, res))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      return res.status(200).json({ ...user._doc, token });
    }

    return res.status(400).json({ message: 'İstifadəçi adı və ya şifrə yanlışdır' });
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};
