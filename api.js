const client = require('./connection.js')
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/students', (req, res)=>{
    client.query(`Select * from students`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/students/:id', (req, res)=>{
    client.query(`Select * from students where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/students', (req, res)=> {
    const student = req.body;
    let insertQuery = `insert into students(id, firstname, lastname, address) 
                       values(${student.id}, '${student.firstname}', '${student.lastname}', '${student.address}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/students/:id', (req, res)=> {
    let student = req.body;
    let updateQuery = `update students
                       set firstname = '${student.firstname}',
                       lastname = '${student.lastname}',
                       address = '${student.address}'
                       where id = ${student.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/students/:id', (req, res)=> {
    let insertQuery = `delete from students where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})