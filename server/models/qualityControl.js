const db = require("../config/db");

const QualityControl = {
  findByFormAndWork: async (form_id, work_id) => {
    return await db.any(
      "SELECT * FROM quality_control WHERE form_id = $1 AND work_id = $2",
      [form_id, work_id]
    );
  },

  updateQualityIssue: async (issue, issue_text, id) => {
    return await db.oneOrNone(
      "UPDATE quality_control SET issue = $1, issue_text = $2 WHERE id = $3 RETURNING *",
      [issue, issue_text, id]
    );
  },
};

module.exports = QualityControl;
