const trackService = require("../services/track-service");
const router = require('express').Router();

router.post('/createTask', trackService.taskCreate);
router.post('/subjectCreate', trackService.subjectCreate);
router.get('/fetchSubjectAndTimeTable', trackService.fetchSubjectAndTimeTable)
router.get('/deleteTask/:id', trackService.deleteTask);
router.get('/fetchTask/:id', trackService.fetchTask);
router.post('/taskUpdate',trackService.taskUpdate)


module.exports = router;
