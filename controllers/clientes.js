const { response } = require("express");
const conexion = require('../configDB/conexion');


//obtener todos los usuarios

const getClientes = (req, res = response) => {
    conexion.query('SELECT * from cliente where estatus=1 order by idcliente', (error, customers, fields) => {
        if (error) {

            console.log('Error al obtener los clientes', error);
            return;
        }
        res.json({
            ok: true,
            customers
        });
    });
}

//obtener un usuario por id 

const getClienteByid = (req, res = response) => {
    const { id } = req.params;
    const query = 'SELECT *from cliente where idcliente=?';
    conexion.query(query, [id], (error, rows, fields) => {
        if (error) {

            console.log('Error al obtener los Clientes', error);
            return;
        }
        res.json(rows);
    });
}

const crearCliente = (req, res = response) => {
    const { nit, nombre, telefono, direccion, usuario_id } = req.body;
    const query = 'SELECT * FROM cliente WHERE nit=?';
    conexion.query(query, [nit], (error, rows, fields) => {

        if (error) {
            return error
        }
        if (rows.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente ya esta registrado '
            });
        }
        const queryInsert = "INSERT INTO cliente(nit,nombre,telefono,direccion,usuario_id) values(?,?,?,?,?)";
        const params = [nit, nombre, telefono, direccion, usuario_id];
        conexion.query(queryInsert, params, async (error, rows, fields) => {
            if (error) {

                console.log('Error al agregar el Cliente', error);
                return;
            }
            res.json({ status: 'Cliente agregado' });
        });



    });



}

const deleteCliente = (req, res = response) => {

    const { id } = req.params;
    const query = "UPDATE cliente set  estatus='0' where idcliente=?";
    conexion.query(query, [id], (error, rows, fields) => {
        if (error) {

            console.log('Error al eliminar el Cliente', error);
            return;
        }
        res.json({
            status: 'Cliente eliminado',
        });
    }
    );

}
const actualizarCliente = (req, res = response) => {
    const { id } = req.params;
    const { nombre, nit, telefono, direccion, usuario_id } = req.body;
    const query = "select * from cliente where nit=? and idcliente<>?";
    conexion.query(query, [nit, id], (error, rows) => {
        if (error) {
            return error
        }
        if (rows.length > 0) {

            return res.status(400).json({
                ok: false,
                msg: ' ya existe un cliente registrado con esa identificacion'
            });
        }
        const queryUpdate = "UPDATE cliente set nit=?,nombre=?,telefono=?,direccion=?,usuario_id=? where idcliente=?";
        const params = [nit, nombre, telefono, direccion, usuario_id, id];
        conexion.query(queryUpdate, params, (error, rows, fields) => {
            if (error) {

                console.log('Error al actualizar el cliente', error);
                return;
            }
            res.json({ status: 'Cliente actualizado' });
        }
        );
    })

}

module.exports = {
    getClientes,
    getClienteByid,
    crearCliente,
    deleteCliente,
    actualizarCliente
}