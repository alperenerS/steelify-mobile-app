const qualityControlController = require('../controllers/qualityControl');

const routes = [
  {
    method: "POST",
    path: "/mobilapi/qualitycontrol",
    handler: qualityControlController.getQualityControlByFormAndWork,
  },
];

module.exports = routes;
