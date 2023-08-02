const workProductsController = require("../controllers/workProducts");

const routes = [
  {
    method: "POST",
    path: "/mobilapi/workproducts",
    handler: workProductsController.getProductIdsByWorkIds,
  },
];

module.exports = routes;
