const db = require('../config/db');

const Images = {
  insert: async (images) => {
    const queries = images.map(image => {
      return db.query('INSERT INTO images(image_url, quality_control_id, status, work_id) VALUES($1, $2, $3, $4) RETURNING *', [image.image_url, image.quality_control_id, image.status, image.work_id]);
    });
    return await Promise.all(queries);
  },

  getCount: async (quality_control_id, work_id) => {
    const result = await db.one('SELECT COUNT(*) as count FROM images WHERE quality_control_id = $1 AND work_id = $2 AND (status = $3 OR status = $4)', [quality_control_id, work_id, 'pending', 'approved']);
    const count = parseInt(result.count);
    return count;
  } 
};


module.exports = Images;
