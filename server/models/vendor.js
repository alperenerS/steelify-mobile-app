const db = require("../config/db");

const Vendor = {
  findVendorById: async (vendor_id) => {
    return await db.any('SELECT id, name FROM vendors WHERE id = $1', [vendor_id]);
  }
};

module.exports = Vendor;
