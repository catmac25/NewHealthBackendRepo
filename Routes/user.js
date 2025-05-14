const express = require("express");
const {updateUser, deleteUser, getSingleUser, getUserProfile} = require("../Controllers/userController");
const {authenticate, restrict} = require("../auth/verifyToken");

const router = express.Router();
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/profile', authenticate, getUserProfile);
module.exports = router;