const db = require('../config/db');

const WorkProducts = {
  getByWorkIds: async (ids) => {
    return await db.any('SELECT work_id,product_id,status FROM work_products WHERE work_id = ANY($1::int[])', [ids]);
  },

  updateStatus: async (work_id, product_id, status) => {
    return await db.none('UPDATE work_products SET status = $1 WHERE work_id = $2 AND product_id = $3', [status, work_id, product_id]);
  }
};

module.exports = WorkProducts;
