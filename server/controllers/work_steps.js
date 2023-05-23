const WorkSteps = require('../models/work_steps');

exports.getOpenQualityControlStepsByWorkIds = async (request, reply) => {
  try {
    const workSteps = await WorkSteps.findOpenQualityControlStepsByWorkIds(request.body.ids);
    if (!workSteps) {
      return reply.status(404).send({ error: 'No work steps found' });
    }
    return reply.send(workSteps);
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while fetching work step info' });
  }
};
