const Router = require('express');

const router = new Router();
const konusRouter = require('./konusRouter');

router.use('/konus', konusRouter);


module.exports = router;