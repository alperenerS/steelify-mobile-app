const userController = require('../controllers/user');

const routes = [
  {
    method: "GET",
    path: "/api/userinfo",
    handler: userController.getUserInfo,
  },
];

module.exports = routes;
