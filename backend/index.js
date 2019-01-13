const cors = require('cors')
const express = require('express')
const {client: mongoClient} = require('./mongoHelper')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3003

setupEndpoints(mongoClient)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

function sendSuccessForResponse(response) {
  return () => {
    response.status(200).send()
  }
}

function sendBadRequestForResponse(response) {
  return err => {
    response.status(400).send(`The following error happened: "${err.message}".`)
  }
}

function setupEndpoints(mongoClient) {
  mongoClient.connect((err, connection) => {
    const {checkCredentials, listUsers, createUser} = require('./mongoOperations')(connection)

    app.post('/login/', (request, response) => {
      const {name, password} = request.body
      checkCredentials(name, password)
        .then(sendSuccessForResponse(response))
        .catch(sendBadRequestForResponse(response))
    })

    app.get('/all_users/', (_, response) => {
      listUsers().then(users => response.send(users))
    })

    app.post('/users/', (request, response) => {
      const {name, password} = request.body
      createUser(name, password)
        .then(sendSuccessForResponse(response))
        .catch(sendBadRequestForResponse(response))
    })
  })
}