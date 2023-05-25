const loginController = require('../controllers/login');

const routes = [
    {
        method: "POST",
        path: "/mobilapi/mobillogin",
        handler: loginController.login,
    }
];

module.exports = routes;
