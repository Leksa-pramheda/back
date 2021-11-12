const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const { asyncHandler, syncHandler } = require('../middlewares/middlewares');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const router = Router();

function initRoutes() {
    router.all('/', syncHandler(test));
}

function test(req, res, next) {
    res.status(200).json({ message: 'This is test )' });
}

initRoutes();

module.exports = router;