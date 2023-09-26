const User = require('../models/user.model');
const Quiz = require('../models/quiz.model');

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Quiz.deleteMany({ user: req.params.id });

    return res.status(200).json({ message: 'İstifadəçi silindi' });
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getUsers = async (_, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.changeRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};
