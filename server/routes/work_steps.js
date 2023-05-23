const workStepsController = require('../controllers/work_steps');

const routes = [
  {
    method: "POST",
    path: "/api/worksteps",
    handler: workStepsController.getOpenQualityControlStepsByWorkIds,
  },
];

module.exports = routes;
