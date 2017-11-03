var express = require('express');
var router = express.Router();
let {indexAction, postAction, deleteAction, patchAction } = require('../controllers/notesController')

/* GET home page. */
router.get('/', indexAction);

router.post('/',postAction);

router.delete('/:id', deleteAction);

router.patch('/:id', patchAction)

module.exports = router;
