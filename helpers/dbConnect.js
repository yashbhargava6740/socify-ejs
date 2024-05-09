const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = () => {
    const conn = mongoose.connect(process.env.MONGO_URL);
    return conn;
}
module.exports = dbConnect;

