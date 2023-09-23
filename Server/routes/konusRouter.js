const Router = require('express');

const router = new Router();

const konusController = require('../controllers/konusController');

router.get('/', konusController.getAll);

module.exports = router;