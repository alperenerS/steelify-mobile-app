const QualityControl = require('../models/qualityControl');

exports.getQualityControlByFormAndWork = async (request, reply) => {
  try {
    const { form_id, work_id } = request.body;
    const qualityControlRows = await QualityControl.findByFormAndWork(form_id, work_id);
    
    if (!qualityControlRows.length) {
      return reply.status(404).send({ error: 'No quality control rows found' });
    }

    return reply.send(qualityControlRows);
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while fetching quality control info' });
  }
};
