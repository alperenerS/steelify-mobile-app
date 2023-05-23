const WorkProducts = require('../models/workProducts');

exports.getProductIdsByWorkIds = async (request, reply) => {
  try {
    const productIds = await WorkProducts.getByWorkIds(request.body.ids);
    if (!productIds) {
      return reply.status(404).send({ error: 'No work products found' });
    }
    return reply.send(productIds);
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while fetching work products info' });
  }
};
