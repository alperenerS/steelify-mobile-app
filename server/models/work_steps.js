const db = require("../config/db");

const WorkSteps = {

  findOpenQualityControlStepsByWorkIds: async (ids) => {
    return await db.any('SELECT work_id, status FROM work_steps WHERE work_id = ANY($1::int[]) AND step_name = $2 AND status = $3', [ids, 'Quality Control', 'Open']);
  }
};

module.exports = WorkSteps;
