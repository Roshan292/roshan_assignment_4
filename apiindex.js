const mysql=require('mysql');
const express=require('express');
var app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./apiswagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
var mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mydb"
});
mysqlConnection.connect((err)=>{
    if(!err)
    console.log("DB connection succeded");
    else
    console.log("db connection failed \n error:"+JSON.stringify(err,undefined,2));
});
app.listen(3000,()=>console.log('Express server is running at port no : 3000'));
//GET all customers from database
app.get('/custommers',(req,res)=>{
    mysqlConnection.query('SELECT * FROM customers',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});
//GET all customers from database
app.get('/custommers/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM customers WHERE id=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});
//DELETE all customers from database
app.delete('/custommers/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM customers WHERE id=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('deleted successfully');
        else
        console.log(err);
    })
});
//INSERT all customers from database
app.post('/custommers',(req,res)=>{
    mysqlConnection.query("INSERT INTO customers (name, address) VALUES (?,?)",[req.body.name,req.body.address],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        // rows.forEach(element => {
        //     if(element.constructor==Array)
        //     res.send('Inserted customer id:'+element[0].id);
        // });
        else
        console.log(err);
    })
});
//UPDATE all customers from database
app.put('/custommers',(req,res)=>{
    mysqlConnection.query("UPDATE customers SET name=?,address=? WHERE id=?",[req.body.name,req.body.address,req.body.id],(err,rows,fields)=>{
        if(!err)
        res.send('updated successfully');
        else
        console.log(err);
    })
});