const imagesController = require('../controllers/images');

const routes = [
  {
    method: "POST",
    path: "/api/images",
    handler: imagesController.postImage,
  },
  {
    method: "POST",
    path: "/api/images/count",
    handler: imagesController.getImageCount,
  },
];

module.exports = routes;
