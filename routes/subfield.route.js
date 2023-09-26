const router = require('express').Router();
const {
  createSubfield,
  deleteSubfield,
  getSubfields,
  getSubfield,
} = require('../controllers/subfield');
const validator = require('../middleware/validation');
const { idParam } = require('../schemas');
const { createSubfieldSchema, getSubfieldsSchema } = require('../schemas/subfield.schema');

router.route('/').post(validator(createSubfieldSchema), createSubfield);
router.route('/:id', validator(idParam)).get(getSubfield).delete(deleteSubfield);
router.route('/field/:fieldId').get(validator(getSubfieldsSchema), getSubfields);

module.exports = router;
