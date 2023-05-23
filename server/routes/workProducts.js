const workProductsController = require('../controllers/workProducts');

const routes = [
  {
    method: "POST",
    path: "/api/workproducts",
    handler: workProductsController.getProductIdsByWorkIds,
  },
];

module.exports = routes;
