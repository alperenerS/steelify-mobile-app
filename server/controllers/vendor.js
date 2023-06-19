const Vendor = require('../models/vendor');

exports.getVendorInfo = async (request, reply) => {
  try {
    const { vendor_id } = request.body;
    const vendorInfo = await Vendor.findVendorById(vendor_id);
    
    if (!vendorInfo.length) {
      return reply.status(404).send({ error: 'No vendor found' });
    }

    return reply.send(vendorInfo[0]);
  } catch (err) {
    return reply.status(500).send({ error: 'An error occurred while fetching vendor info' });
  }
};
