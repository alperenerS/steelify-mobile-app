const workController = require('../controllers/works');

const routes = [
  {
    method: "GET",
    path: "/api/worksbyid",
    handler: workController.getWorks,
  },
  {
    method: "GET",
    path: "/api/work/:workId",
    handler: workController.getWorkById,
  }  
];

module.exports = routes;
