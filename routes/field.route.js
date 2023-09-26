const router = require('express').Router();
const { createField, deleteField, getField, getFields } = require('../controllers/field');
const { createFieldSchema } = require('../schemas/field.schema');
const validator = require('../middleware/validation');
const { idParam } = require('../schemas');

router.route('/').get(getFields).post(validator(createFieldSchema), createField);
router.route('/:id', validator(idParam)).get(getField).delete(deleteField);

module.exports = router;
