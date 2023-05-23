const db = require("../config/db");

const Form = {
  findByProductAndVendor: async (product_id, vendor_id) => {
    return await db.any('SELECT id FROM forms WHERE product_id = $1 AND vendor_id = $2', [product_id, vendor_id]);
  }
};

module.exports = Form;
