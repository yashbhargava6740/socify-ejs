const mongoose = require('mongoose');

require('dotenv').config();
// console.log(process.env.MONGO_URL);
const dbConnect = () => {
    const conn = mongoose.connect(process.env.MONGO_URL);
    return conn;
}
module.exports = dbConnect;

