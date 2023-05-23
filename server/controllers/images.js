const Images = require('../models/images');

exports.postImage = async (request, reply) => {
  try {
    const image = request.body;
    const insertedImage = await Images.insert(image);
    if (!insertedImage) {
      return reply.status(400).send({ error: 'Image could not be inserted' });
    }
    return reply.send(insertedImage);
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while inserting image' });
  }
};

exports.getImageCount = async (request, reply) => {
  try {
    const { quality_control_id, work_id } = request.body;
    const count = await Images.getCount(quality_control_id, work_id);
    if (count === null) {
      return reply.status(404).send({ error: 'No images found for provided quality_control_id and work_id' });
    }
    return reply.send({ count });
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while fetching image count' });
  }
};

