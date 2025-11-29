const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const { create, getAll, getOne, update, remove } = require('../controllers/petsController');

router.post('/', auth, permit('admin'), create); // only admins can add pets
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', auth, permit('admin'), update);
router.delete('/:id', auth, permit('admin'), remove);

module.exports = router;