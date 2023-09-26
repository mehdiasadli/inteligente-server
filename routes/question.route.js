const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
  getQuestionCount,
  addBulk,
} = require('../controllers/question');
const validator = require('../middleware/validation');
const {
  createQuestionSchema,
  updateQuestionSchema,
  addBulkSchema,
} = require('../schemas/question.schema');
const { idParam } = require('../schemas');

const router = require('express').Router();

router.route('/').post(validator(createQuestionSchema), createQuestion).get(getQuestions);
router.route('/count').get(getQuestionCount);
router.route('/add-bulk').post(validator(addBulkSchema), addBulk);
router
  .route('/:id', validator(idParam))
  .put(validator(updateQuestionSchema), updateQuestion)
  .delete(deleteQuestion);
module.exports = router;
