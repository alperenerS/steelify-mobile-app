const db = require("../config/db");

const QualityControl = {
  findByFormAndWork: async (form_id, work_id) => {
    return await db.any('SELECT * FROM quality_control WHERE form_id = $1 AND work_id = $2', [form_id, work_id]);
  }
};

module.exports = QualityControl;
