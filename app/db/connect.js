const MongoClient = require('mongodb').MongoClient;
const MyConnection = (cb) => {
    MongoClient.connect(process.env.DBURL, (err , client) => {
        if(err) return cb(err, null);
        const db = client.db(process.env.DBNAME);
        cb(null, db)
    })
}
module.exports = MyConnection;