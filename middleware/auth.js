const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  let token = req.headers?.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded || !decoded?.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Verification error' });
  }
};
