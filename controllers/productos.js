const { response } = require("express");
const conexion = require('../config/conexion');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');


//obtener todos los productos

const getProductos = (req, res = response) => {
    conexion.query('SELECT p.codproducto,p.descripcion,p.precio,p.existencia, p.imagen,pr.proveedor ,pr.codproveedor from producto p inner join proveedor pr on p.proveedor = pr.codproveedor where p.estatus=1 order by p.codproducto',
        (error, products) => {
            if (error) {

                console.log('Error al obtener los usuarios', error);
                return;
            }
            res.status(200).json({
                ok: true,
                products
            });
        });
}

//obtener un usuario por id 

const getProductosById = (req, res = response) => {
    const { id } = req.params;
    const query = 'SELECT *from producto where codproducto=?';
    conexion.query(query, [id], (error, rows, fields) => {
        if (error) {

            return error;
        }
        res.json(rows);
    });
}

const crearProducto = async (req, res = response) => {


    const data = req.body.data;
    const dataObject = JSON.parse(data);

    const { proveedor, descripcion, precio, existencia, usuario_id } = dataObject;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }

    // procesar imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    //validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no es una extension permitida'
        });
    }
    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    //path para guardar la imagen
    const path = `./uploads/products/${nombreArchivo}`;
    //mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen'
            });

        }
    });

    const query = 'INSERT INTO producto(proveedor,descripcion,precio,existencia,usuario_id,imagen) values(?,?,?,?,?,?)';
    conexion.query(query, [proveedor, descripcion, precio, existencia, usuario_id, nombreArchivo], async (error) => {
        if (error) {

            console.log('Error al agregar el Producto', error);
            return;
        }
        res.status(201).json({
            ok: true,
            status: 'Producto agregado'
        });
    });


}

const deleteProducto = (req, res = response) => {

    const { id } = req.params;
    const query = "UPDATE producto set  estatus='0' where codproducto=?";
    conexion.query(query, [id], (error) => {
        if (error) {

            console.log('Error al eliminar el Producto', error);
            return;
        }
        res.json({
            status: 'Producto eliminado',
        });
    }
    );

}
const actualizarProducto = (req, res = response) => {
    const { id } = req.params;
    const { proveedor, descripcion, precio, existencia, usuario_id } = req.body;

    const queryUpdate = 'UPDATE producto set proveedor=?,descripcion=?,precio=?,existencia=?,usuario_id=? where codproducto=?'
    conexion.query(queryUpdate, [proveedor, descripcion, precio, existencia, usuario_id, id],
        (error) => {
            if (error) {

                console.log('Error al actualizar el Producto', error);
                return;
            }
            res.json({ status: 'Producto actualizado' });
        }
    );


}
const addCantidad = (req, res) => {
    const { id } = req.params;
    const { cantidad, precio } = req.body;
    const query='CALL actualizar_precio_producto(?,?,?)';
    const params=[cantidad,precio,id];
    conexion.query(query,params ,(error) => {
        if (error) {

            console.log('Error al agregar la cantidad', error);
            return;
        }
        res.json({
            status: 'Cantidad agregada',
        });
    }
    );
}
module.exports = {
    getProductos,
    getProductosById,
    crearProducto,
    deleteProducto, actualizarProducto,
    addCantidad

}