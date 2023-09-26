module.exports = async (req, res, next) => {
  if (!req.user) return res.status(403).json({ message: 'Access denied' });

  try {
    const { role } = req.user;

    if (role === 'Moderator' || role === 'Admin') return next();
    return res.status(403).json({ message: 'Access denied' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
