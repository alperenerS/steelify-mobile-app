// server\routes\productinfo.js

const productinfoController = require('../controllers/productinfo');

const routes = [
  {
    method: "POST",
    path: "/api/productinfo",
    handler: productinfoController.getProductInfo,
  },
];

module.exports = routes;
