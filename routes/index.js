require('express-async-errors');
const auth = require('./auth');
const user = require('./user');
const role = require('./role')
const notFoundMiddleware = require('../middlewares/not-found');
const errorHandlerMiddleware = require('../middlewares/error_handler');

const initRoutes = (app) => {
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/users', user);
    app.use('/api/v1/roles', role);

    app.use('/', (req, res) => {
        res.status(200).send('Hello!')
    });

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
}

module.exports = initRoutes;
