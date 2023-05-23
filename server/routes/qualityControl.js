const qualityControlController = require('../controllers/qualityControl');

const routes = [
  {
    method: "POST",
    path: "/api/qualitycontrol",
    handler: qualityControlController.getQualityControlByFormAndWork,
  },
];

module.exports = routes;
