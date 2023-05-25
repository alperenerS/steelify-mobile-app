const workStepsController = require('../controllers/work_steps');

const routes = [
  {
    method: "POST",
    path: "/mobilapi/worksteps",
    handler: workStepsController.getOpenQualityControlStepsByWorkIds,
  },
];

module.exports = routes;
