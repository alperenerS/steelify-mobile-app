const userController = require('../controllers/user');

const routes = [
  {
    method: "GET",
    path: "/mobilapi/userinfo",
    handler: userController.getUserInfo,
  },
];

module.exports = routes;
