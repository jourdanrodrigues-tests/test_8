const {dbName} = require('./mongoHelper')


module.exports = connection => {
  return {checkCredentials, createUser, listUsers}

  function checkCredentials(name, password) {
    return new Promise((resolve, reject) => {
      const db = connection.db(dbName)

      const usersCollection = db.collection('users')
      // Sorry not encrypting the password...
      usersCollection.find({name, password}).limit(1).toArray((err, docs) => {
        if (err) {
          reject(err)
        } else if (docs.length === 0) {
          reject(new Error('No match for provided credentials'))
        } else {
          resolve(docs[0]) // Quickfix. :/
        }
      })
    })
  }

  function listUsers() {
    return new Promise((resolve, reject) => {
      const db = connection.db(dbName)

      const usersCollection = db.collection('users')
      usersCollection.find({}).toArray((err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  }

  function createUser(name, password) {
    return new Promise((resolve, reject) => {
      const db = connection.db(dbName)

      db.collection('users').insertOne({name, password}, (err, r) => {
        if (err) {
          reject(err)
        } else {
          resolve(r)
        }
      })
    })
  }
}