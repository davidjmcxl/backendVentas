const mysql      = require('mysql');
const conexion = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
    database : 'punto',
    port: 3306
});

conexion.connect((err)=>{
    if(err){
        console.log("error al conectar ");
        return;
    }else{
        console.log('DB is connected');
    }
});
module.exports=conexion;
