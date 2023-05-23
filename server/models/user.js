const db = require("../config/db");

const User = {
    
  findUserByPhone: async (phone) => {
    return await db.one('SELECT * FROM users WHERE phone = $1', [phone]);
  },

  checkPassword: (password, userPassword) => {
    return password === userPassword;
  },

  findUserById: async (id) => {
    return await db.one('SELECT * FROM users WHERE id = $1', [id]);
  }

};

module.exports = User;
