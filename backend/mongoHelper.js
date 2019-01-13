const MongoHelper = require('mongodb').MongoClient;

const dbName = process.env.DB_NAME
const client = new MongoHelper(`mongodb://${process.env.MONGODB_HOST}/${dbName}`)

module.exports = {dbName, client};