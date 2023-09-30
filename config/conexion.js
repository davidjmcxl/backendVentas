const mysql  = require('mysql');
const dotenv = require('dotenv').config()
const conexion = mysql.createConnection({
   host     : 'localhost',
  user     : 'root',
  password : '',
    database : 'punto',
    port: 3306 
    
   /*  host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT, */

});

conexion.connect((err)=>{
    if(err){
        console.log(process.env.MYSQLHOST);
        console.log("error al conectar ");
        return;
    }else{
        console.log('DB is connected');
    }
});
module.exports=conexion;
