const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (request, reply) => {
  const { phone, password } = request.body;

  try {
    // Check if user exists
    const user = await User.findUserByPhone(phone);
    if (!user) {
      reply.status(400).send({ error: 'Invalid phone number or password' });
      return;
    }

    // Check if password is correct
    const match = await User.checkPassword(password, user.password);
    if (!match) {
      reply.status(400).send({ error: 'Invalid phone number or password' });
      return;
    }

    // Create and return token
    const token = jwt.sign({ userId: user.id }, process.env.USER_TOKEN_KEY);
    reply.send({ token });
  } catch (error) {
    reply.send({ error: error.message });
  }
};
