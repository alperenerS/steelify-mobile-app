require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const fastifyCors = require("@fastify/cors");
const fastifyMulter = require('fastify-multer');
const loginRoutes = require("./routes/login");
const UserInfoRoutes = require("./routes/user");
const WorksRoutes = require("./routes/works");
const WorkStepRoutes = require("./routes/work_steps");
const WorkProductsRoutes = require("./routes/workProducts");
const FormsRoutes = require("./routes/form");
const QualityControlRoutes = require("./routes/qualityControl");
const ProductInfoRoutes = require("./routes/productinfo");
const ImageRoutes = require("./routes/images");

const db = require('./config/db');

db.connect()
  .then((obj) => {
    console.log('PostgreSQL bağlantısı başarılı');
    obj.done(); 
  })
  .catch((error) => {
    console.log('PostgreSQL bağlantısı başarısız', error);
  });

fastify.register(fastifyCors, {
  origin: "*",
  allowedHeaders:
    "Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range",
  methods: "GET,POST,PUT,DELETE",
});

fastify.register(fastifyMulter.contentParser);

loginRoutes.forEach((route) => {
    fastify.route(route);
  });

UserInfoRoutes.forEach((route) => {
    fastify.route(route);
  });

WorksRoutes.forEach((route) => {
    fastify.route(route);
  });

WorkStepRoutes.forEach((route) => {
    fastify.route(route);
  });

WorkProductsRoutes.forEach((route) => {
    fastify.route(route);
  });

FormsRoutes.forEach((route) => {
    fastify.route(route);
  });

QualityControlRoutes.forEach((route) => {
    fastify.route(route);
  });

ProductInfoRoutes.forEach((route) => {
    fastify.route(route);
  });

fastify.register(ImageRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3001, host: '0.0.0.0' });
    fastify.log.info(`server listening on ${process.env.PORT || 3001}`);
  } catch (err) {
    fastify.log.error(err);
  }
};

start();
