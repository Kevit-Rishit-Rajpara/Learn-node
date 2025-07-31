const express = require("express");
const checkAuth = require("../middleware/check-auth");
const usersController = require("../controller/users");
const validate = require('../middleware/validate');
const { userSignupSchema, userLoginSchema } = require('../validators/user');


const router = express.Router();

router.post("/signup", validate(userSignupSchema), usersController.createUser);


router.post('/login', validate(userLoginSchema), usersController.loginUser); 

router.delete('/:userId',checkAuth, usersController.deleteUser);

module.exports = router;
