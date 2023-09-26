const router = require('express').Router();
const { signUp, signIn } = require('../controllers/auth');
const { signInSchema, signUpSchema } = require('../schemas/auth.schema');
const validator = require('../middleware/validation');

router.post('/signup', validator(signUpSchema), signUp);
router.post('/signin', validator(signInSchema), signIn);

module.exports = router;
