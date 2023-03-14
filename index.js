require('./config/conexion');
const cors = require('cors');
const express = require('express');
const port = (process.env.PORT || 3000);
//express
const app = express();

//configuracion del puerto
app.set('port', port);

app.use( cors() );
app.use(express.json()); 
//rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));

//iniciar el servidor
app.listen(app.get('port'), (error) => {
    if (error) {
        console.log('Error al iniciar el servidor', error);
        return;
    }
    console.log('Server on port', app.get('port'));
}
);