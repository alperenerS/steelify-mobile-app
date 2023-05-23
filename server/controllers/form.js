const Form = require('../models/form');

exports.getFormIds = async (request, reply) => {
  try {
    const { product_id, vendor_id } = request.body;
    const formIds = await Form.findByProductAndVendor(product_id, vendor_id);
    
    if (!formIds.length) {
      return reply.status(404).send({ error: 'No forms found' });
    }

    return reply.send(formIds);
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while fetching form info' });
  }
};
