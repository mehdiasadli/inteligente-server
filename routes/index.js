const auth = require('../middleware/auth');
const router = require('express').Router();

router.use('/auth', require('./auth.route'));
router.use('/users', auth, require('./user.route'));
router.use('/questions', auth, require('./question.route'));
router.use('/fields', auth, require('./field.route'));
router.use('/subfields', auth, require('./subfield.route'));
router.use('/quiz', auth, require('./quiz.route'));

module.exports = router;
