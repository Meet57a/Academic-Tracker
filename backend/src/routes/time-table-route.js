const timeTableService = require("../services/time-table");
const router = require('express').Router();

router.post('/createTable', timeTableService.createTable);
router.get('/fetchTable', timeTableService.fetchTable);

module.exports = router;
