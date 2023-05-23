const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getUserInfo = async (request, reply) => {
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
        const user = await User.findUserById(decoded.userId);

        if (!user) {
          reject(reply.status(404).send({ error: 'No user found' }));
        }

        resolve(reply.send({
          id: user.id,
          phone: user.phone,
          role: user.role,
          name: user.name,
          related_company: user.related_company,
          // add other user information you want to return here
        }));
      } catch (err) {
        reject(reply.status(500).send({ error: 'An error occurred while fetching user info' }));
      }
    });
  });
};