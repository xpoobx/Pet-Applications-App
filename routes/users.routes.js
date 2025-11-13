const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const { getAll, getOne, update, remove } = require('../controllers/usersController');

router.get('/', auth, permit('admin'), getAll); // admin only
router.get('/:id', auth, getOne);
router.put('/:id', auth, update); // owner or admin check could be added
router.delete('/:id', auth, permit('admin'), remove);
module.exports = router;