const formController = require('../controllers/form');

const routes = [
  {
    method: "POST",
    path: "/api/formids",
    handler: formController.getFormIds,
  },
];

module.exports = routes;
