const loginController = require('../controllers/login');

const routes = [
    {
        method: "POST",
        path: "/api/mobillogin",
        handler: loginController.login,
    }
];

module.exports = routes;
