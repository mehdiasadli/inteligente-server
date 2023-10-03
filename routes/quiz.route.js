const router = require('express').Router();
const {
  startQuiz,
  endQuiz,
  deleteQuiz,
  getQuiz,
  getQuizes,
  getBoard,
  getAverage,
  getUserQuizzes,
} = require('../controllers/quiz');
const { idParam } = require('../schemas');
const { startQuizSchema, endQuizSchema, getBoardSchema } = require('../schemas/quiz.schema');
const validator = require('../middleware/validation');

router.route('/board').get(validator(getBoardSchema), getBoard);
router.route('/user/:id').get(validator(idParam), getUserQuizzes);
router.route('/average').get(getAverage);
router.route('/').post(validator(startQuizSchema), startQuiz).get(getQuizes);
router
  .route('/:id', validator(idParam))
  .get(getQuiz)
  .put(validator(endQuizSchema), endQuiz)
  .delete(deleteQuiz);

module.exports = router;
