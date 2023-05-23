const db = require('../config/db');

const Images = {
  insert: async (image) => {
    return await db.one('INSERT INTO images(image_url, quality_control_id, status, work_id) VALUES($1, $2, $3, $4) RETURNING *', [image.image_url, image.quality_control_id, image.status, image.work_id]);
  },

  getCount: async (quality_control_id, work_id) => {
    const count = await db.any('SELECT COUNT(*) FROM images WHERE quality_control_id = $1 AND work_id = $2', [quality_control_id, work_id]);
    return count.count;
  }

};

module.exports = Images;
