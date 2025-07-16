const authService = require("../services/auth");
const router = require('express').Router();

router.post('/registerCode',authService.registerCode);
router.post('/loginCode',authService.loginCode);

module.exports = router;
