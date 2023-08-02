const imagesControllers = require("../controllers/images");
const fastifyMulter = require('fastify-multer');
const storage = fastifyMulter.memoryStorage();
const upload = fastifyMulter({ storage: storage });

const routes = (fastify, options, done) => {
  fastify.post(
    "/mobilapi/images",
    { preHandler: upload.array('images') },
    async (request, reply) => {
      try {
        const images = request.files.map(file => {
          return {
            image: file,
            quality_control_id: request.body.quality_control_id,
            status: request.body.status,
            work_id: request.body.work_id,
            folderPath: request.body.folderPath
          }
        });
        // Add the images to the request object
        const issue_text = request.body.issue_text; // Add this line
        request.body.images = images;  
        request.body.issue_text = issue_text; // And this line
        const result = await imagesControllers.createImages(request);
        reply.code(201).send(result);
      } catch (err) {
        console.error(err);
        reply.code(500).send({
          status: "error",
          message: "Resimler yüklenirken bir hata oluştu.",
        });
      }
    }
  );

  fastify.post("/mobilapi/images/count", imagesControllers.getImageCount);
  done();
};

module.exports = routes;

