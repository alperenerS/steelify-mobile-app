// server\controllers\productinfo.js

const ProductInfo = require('../models/productinfo');

exports.getProductInfo = async (request, reply) => {
  try {
    const { product_id } = request.body;
    const productInfo = await ProductInfo.findByProductId(product_id);
    
    if (!productInfo.length) {
      return reply.status(404).send({ error: 'No product found' });
    }

    return reply.send(productInfo);
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while fetching product info' });
  }
};
