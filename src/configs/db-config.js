require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const  mongoURI =  process.env.DB_URI;
const client = new MongoClient(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true  })
;

let conn

module.exports = {
  connect(){
    return new Promise((resolve, reject) => {
      client.connect(err => {
        if(err) return reject(err)
        console.log('DB connected')

        conn = client.db('myxl')
        resolve(conn)
      })
    })
  },
  getDB(){
    return conn
  }
}

