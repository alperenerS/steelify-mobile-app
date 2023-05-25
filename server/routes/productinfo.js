// server\routes\productinfo.js

const productinfoController = require('../controllers/productinfo');

const routes = [
  {
    method: "POST",
    path: "/mobilapi/productinfo",
    handler: productinfoController.getProductInfo,
  },
];

module.exports = routes;
