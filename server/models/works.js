const db = require("../config/db");

const Works = {

  findWorksByUserId: async (id) => {
    return await db.any('SELECT id, vendor_id, quality_responsible_id FROM works WHERE foreman_id = $1', [id]);
  },

  findWorkById: async (workId) => {
    return await db.any('SELECT id, vendor_id, quality_responsible_id FROM works WHERE id = $1', [workId]);
  }

};

module.exports = Works;
