const db = require("../config/db");

const ProductInfo = {
  findByProductId: async (product_id) => {
    return await db.any('SELECT id, name, technicaldrawingurl, guideurl FROM products WHERE odooid = $1', [product_id]);
  }
};

module.exports = ProductInfo;
