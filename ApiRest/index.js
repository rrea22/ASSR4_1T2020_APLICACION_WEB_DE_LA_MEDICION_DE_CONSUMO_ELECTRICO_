const mysql=require('mysql');
const path = require('path');
const morgan = require('morgan');
const express=require('express');
var app=express();
const bodyparser=require('body-parser');
var cors = require('cors');


app.set('port',process.env.PORT|3000);
app.use(bodyparser.json(), cors());
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(morgan('dev'));


var mysqlConnection=mysql.createConnection({
    host:'bxjylqh6rikr82hw1fqt-mysql.services.clever-cloud.com',
    user:'u8vc8l0krx0dhdnb',
    password:'7pMQdJkuTszsbahBQqCj',
    database:'bxjylqh6rikr82hw1fqt'
});





//app.listen(3000,()=>console.log('Express server is running at port no: 3000'));

app.get('/', (req, res) =>{
    res.render('index');
});
app.get('/USUARIOS',(req,res)=>{
    mysqlConnection.query('SELECT * FROM USUARIO',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/USUARIO',(req,res)=>{
    console.log(req.query.id)
    mysqlConnection.query('SELECT * FROM USUARIO WHERE Cedula=? ',[req.query.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});
app.get('/Medidores',(req,res)=>{
    mysqlConnection.query('SELECT m.* FROM USUARIO u JOIN MEDIDOR m USING (Cedula) WHERE u.Cedula = ?'
    ,[req.query.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});
app.get('/Facturas',(req,res)=>{
    mysqlConnection.query('SELECT f.* FROM MEDIDOR m JOIN FACTURA f USING (CodigoMedidor) WHERE m.codigoMedidor = ?'
    ,[req.query.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});
/*app.get('/FacturasMedidor',(req,res)=>{
    mysqlConnection.query('insert into FACTURA values(99969,"2020-08-18T00:00:00.000","2020-09-02T00:00:00.000",170,65,348826)'
    ,[req.query.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});*/
/*app.get('/USUARIO/:id',(req,res)=>{
    mysqlConnection.query('SELECT u.Cedula, f.CodigoMedidor, f.NumeroFactura FROM USUARIO u JOIN MEDIDOR m USING (Cedula) JOIN FACTURA f USING (CodigoMedidor) WHERE u.Cedula = ?'
    ,[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});*/

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(mysqlConnection); // Recreate the connection, since
                                                  // the old one cannot be reused.

    mysqlConnection.connect((err)=>{
        if(!err)
            console.log('DB connection succeded');
        else
            console.log('DB connection failed \n Error: ' +JSON.stringify(err,undefined,2));

    });                               // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

app.listen(process.env.PORT || 5000, function() {
    console.log("Server started.......");
});
