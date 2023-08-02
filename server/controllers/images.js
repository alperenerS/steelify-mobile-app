const Images = require("../models/images");
const { uploadFile } = require("../utils/upload_azure");
const { updateQualityIssue } = require("../models/qualityControl");

exports.createImages = async (request) => {
  try {
    const images = request.body.images.map(async (image) => {
      const image_buffer = image.image;
      const image_url = await uploadFile(
        image_buffer.buffer,
        image_buffer.originalname,
        image.folderPath
      );
      return {
        image_url: image_url,
        quality_control_id: image.quality_control_id,
        status: image.status,
        work_id: image.work_id,
        folderPath: image.folderPath,
        issues: image.issues,
      };
    });
    const issues = request.body.images[0].issues;
    console.log(issues);
    if (issues) {
      await updateQualityIssue(true, issues);
    } else {
      await updateQualityIssue(false, null);
    }

    const result = await Images.insert(await Promise.all(images));
    return {
      status: "success",
      statusCode: 201,
      data: result,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.getImageCount = async (request, reply) => {
  try {
    const { work_id, quality_control_ids } = request.body;
    const counts = await Promise.all(
      quality_control_ids.map(async (id) => {
        const count = await Images.getCount(id, work_id);
        return { quality_control_id: id, count }; // Here, use `count` directly.
      })
    );
    return reply.send(counts);
  } catch (err) {
    return reply
      .status(500)
      .send({ error: "An error occurred while fetching image counts" });
  }
};
