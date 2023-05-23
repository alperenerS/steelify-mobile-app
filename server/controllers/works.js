const jwt = require('jsonwebtoken');
const Works = require('../models/works');

exports.getWorks = async (request, reply) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return reply.status(401).send({ error: 'No token provided' });

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.USER_TOKEN_KEY, async (err, decoded) => {
      if (err) {
        reject(reply.status(403).send({ error: 'Failed to authenticate token' }));
      }

      // decoded.userId will contain the user id from the token
      try {
        const works = await Works.findWorksByUserId(decoded.userId);

        if (!works) {
          reject(reply.status(404).send({ error: 'No work found' }));
        }

        resolve(reply.send(works));
      } catch (err) {
        reject(reply.status(500).send({ error: 'An error occurred while fetching work info' }));
      }
    });
  });
};

exports.getWorkById = async (request, reply) => {
  const workId = request.params.workId;
  
  try {
    const work = await Works.findWorkById(workId);
    if (!work) {
      return reply.status(404).send({ error: 'Work not found' });
    }

    return reply.send(work);
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while fetching work info' });
  }
};
