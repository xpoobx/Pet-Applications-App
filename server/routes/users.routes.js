// User.routes - updated to expand profile functionality
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const {
  getAll,
  getOne,
  update,
  remove,
  getCurrentUser,
  updateCurrentUser
} = require('../controllers/usersController');

router.get('/', auth, permit('admin'), getAll); 
router.get('/me', auth, getCurrentUser);   
router.put('/me', auth, updateCurrentUser);  
router.get('/:id', auth, getOne);
router.put('/:id', auth, update);
router.delete('/:id', auth, permit('admin'), remove);

module.exports = router;
