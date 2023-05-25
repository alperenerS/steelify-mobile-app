const workController = require('../controllers/works');

const routes = [
  {
    method: "GET",
    path: "/mobilapi/worksbyid",
    handler: workController.getWorks,
  },
  {
    method: "GET",
    path: "/mobilapi/work/:workId",
    handler: workController.getWorkById,
  }  
];

module.exports = routes;
