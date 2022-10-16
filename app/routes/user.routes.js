const router = require('express').Router()
const Task = require('../controllers/task.controller')

router.get("/", Task.showAll)
router.get("/addPage", Task.addPage)
router.post("/addLogic", Task.addLogic)
router.get("/single/:id", Task.single)
router.get("/edit/:id", Task.edit)
router.post("/editLogic/:id", Task.editLogic)
router.get("/del/:id", Task.del)


module.exports = router
