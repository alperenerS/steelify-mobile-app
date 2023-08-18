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

exports.updateWorkProductStatus = async (request, reply) => {
  try {
    const { work_id, product_id, status } = request.body;
    await WorkProducts.updateStatus(work_id, product_id, status);
    return reply.send({ success: true, message: 'Status updated successfully' });
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while updating status' });
  }
}