const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const { create, getAll, getOne, updateStatus, remove } = require('../controllers/applicationsController');

router.post('/', auth, create); // authenticated users apply
router.get('/', auth, permit('admin'), getAll); // admin can view all
router.get('/:id', auth, getOne);
router.patch('/:id/status', auth, permit('admin'), updateStatus);
router.delete('/:id', auth, permit('admin'), remove);

module.exports = router;