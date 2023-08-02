const db = require("../config/db");

const QualityControl = {
  findByFormAndWork: async (form_id, work_id) => {
    return await db.any(
      "SELECT * FROM quality_control WHERE form_id = $1 AND work_id = $2",
      [form_id, work_id]
    );
  },

  updateQualityIssue: async (issue, issue_text) => {
    return await db.any(
      "INSERT INTO quality_control(issue,issue_text) VALUES ($1,$2) RETURNING *",
      [issue, issue_text]
    );
  },
};

module.exports = QualityControl;
