const conn = require('../configs/db-config');
conn.connect();
const userModels = {

    getUser: (number) => {
        return new Promise((resolve, reject) => {
            result = conn.getDB().collection('users').find({"number":number}).toArray();
                resolve(result)
           
        })
    }
}

module.exports = userModels;