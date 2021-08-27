const {Client} = require('pg')

const client = new Client({
    user: "postgres",
    password: "tesadmin",
    host: "localhost",
    port: 5432,
    database: "MyFirstDB"
})

module.exports = client