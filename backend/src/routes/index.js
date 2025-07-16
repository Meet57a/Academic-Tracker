const router = require('express').Router();

const routes = [
    {
        path: '/auth',
        router: require('./auth-route')
    },
    {
        path: '/track',
        router: require('./track-route')
    },
    {
        path: '/timeTable',
        router: require('./time-table-route')
    }
];

routes.forEach((route) => {
    return router.use(route.path, route.router);
});

module.exports = router;