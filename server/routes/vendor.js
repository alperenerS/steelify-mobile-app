const vendorController = require('../controllers/vendor');

const routes = [
  {
    method: "POST",
    path: "/mobilapi/vendorinfo",
    handler: vendorController.getVendorInfo,
  },
];

module.exports = routes;
