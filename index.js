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
app.use('/api/auth',require('./routes/auth'));
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/clientes',require('./routes/clientes'));
app.use('/api/productos',require('./routes/productos'));
app.use('/api/proveedores',require('./routes/proveedores'));
app.use('/api/uploads',require('./routes/uploads'));
app.use('/api/search',require('./routes/search'));
app.use('/api/ventas',require('./routes/sales'));
//iniciar el servidor
app.listen(app.get('port'), (error) => {
    if (error) {
        console.log('Error al iniciar el servidor', error);
        return;
    }
    console.log('Server on port', app.get('port'));
}
);