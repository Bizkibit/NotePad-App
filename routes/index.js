var express = require('express');
var router = express.Router();
let {indexAction, postAction, deleteAction } = require('../controllers/notesController')

/* GET home page. */
router.get('/', indexAction);

router.post('/',postAction);

router.delete('/:id', deleteAction);

module.exports = router;
