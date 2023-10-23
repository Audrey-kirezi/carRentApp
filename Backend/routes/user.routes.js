const express = require("express")
const { getProfile, login, registerAsAdmin ,registerAsUser} = require('../controllers/user.controller.js')
const { validateAdminRegistration, validateLogin,validateUserRegistration } = require('../validators/user.validator.js')
const authenticate = require('../middleware/auth.middleware')
const router = express.Router()

router.get("/profile", authenticate, getProfile)

router.post("/admin/register",validateAdminRegistration,registerAsAdmin)
router.post("/admin/login", validateLogin, login)

router.post('/user/register', validateUserRegistration, registerAsUser);
router.post('/login',validateLogin,login);

module.exports = router;