const db = require('../config/db');

const WorkProducts = {
  getByWorkIds: async (ids) => {
    return await db.any('SELECT work_id,product_id FROM work_products WHERE work_id = ANY($1::int[])', [ids]);
  }
};

module.exports = WorkProducts;
