const workProductsController = require("../controllers/workProducts");

const routes = [
  {
    method: "POST",
    path: "/mobilapi/workproducts",
    handler: workProductsController.getProductIdsByWorkIds,
  },
  {
    method: "PUT", 
    path: "/mobilapi/workproducts/updatestatus",
    handler: workProductsController.updateWorkProductStatus,
  },
];

module.exports = routes;
