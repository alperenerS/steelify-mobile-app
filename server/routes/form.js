const formController = require('../controllers/form');

const routes = [
  {
    method: "POST",
    path: "/mobilapi/formids",
    handler: formController.getFormIds,
  },
];

module.exports = routes;
