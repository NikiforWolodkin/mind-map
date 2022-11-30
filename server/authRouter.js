const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');

router.post("/registration", [
    check("email", "Email can't be empty").notEmpty(),
    check("password", "Password can't be empty").notEmpty()
], controller.registration);
router.post("/login", controller.login);
router.get("/user", authMiddleware, controller.getUsers);

module.exports = router;