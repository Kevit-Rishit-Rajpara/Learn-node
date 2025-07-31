const express = require("express");
const checkAuth = require("../middleware/check-auth");
const usersController = require("../controller/users");


const router = express.Router();

router.post("/signup", usersController.createUser);


router.post('/login', usersController.loginUser); 

router.delete('/:userId',checkAuth, usersController.deleteUser);

module.exports = router;
