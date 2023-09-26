const router = require('express').Router();
const { getUsers, updateUser, deleteUser, changeRole, getUser } = require('../controllers/user');
const { updateUserSchema, changeRoleSchema } = require('../schemas/user.schema');
const { idParam } = require('../schemas');
const validator = require('../middleware/validation');
const verifyAdmin = require('../middleware/verifyAdmin');
const verifyUser = require('../middleware/verifyUser');

router.route('/').get(verifyAdmin, getUsers);
router
  .route('/:id', validator(idParam))
  .get(getUser)
  .put(verifyUser, validator(updateUserSchema), updateUser)
  .delete(verifyUser, deleteUser);
router.put('/role/:id', validator(idParam), verifyAdmin, validator(changeRoleSchema), changeRole);

module.exports = router;
