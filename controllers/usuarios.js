const { response } = require("express");
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')
const conexion = require('../config/conexion');
const e = require("express");

//obtener todos los usuarios

const getUsuarios = (req, res = response) => {
    conexion.query('SELECT u.idusuario,u.nombre,u.correo,u.usuario ,u.estatus ,u.imagen,r.rol from usuario u inner join rol r on u.rol =r.idrol where u.estatus="1" order by u.idusuario ' , (error, users, fields) => {
        if (error) {

            console.log('Error al obtener los usuarios', error);
            return;
        }
        res.json({ users });
    });
}

//obtener un usuario por id 

const getUsuarioByid = (req, res = response) => {
    const { id } = req.params;

    conexion.query(`SELECT *from usuario where idusuario=${id}`, (error, user) => {
        if (error) {

            console.log('Error al obtener los usuarios', error);
            return;
        }
        res.json({ user });
    });
}

const crearUsuario = (req, res = response) => {
    const { nombre, correo, usuario, clave, rol,imagen } = req.body;
    conexion.query(`SELECT * FROM usuario WHERE correo='${correo}'`, (error, user) => {

        if (error) {
            return error
        }
        if (user.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const passEncrypted = bcrypt.hashSync(clave, 10);
        conexion.query(`INSERT INTO usuario(nombre,correo,usuario,clave,rol,imagen) VALUES ('${nombre}','${correo}','${usuario}','${passEncrypted}','${rol}','${imagen}')`, async (error, user,) => {
            if (error) {
                console.log('Error al agregar el usuario', error);
                return;
            }
            const id = user.insertId;

            // Generar token
            const token = await generarJWT(id);
            conexion.query(`SELECT * FROM usuario WHERE idusuario='${id}'`, async (error, newUser) => {
                res.json({
                    status: 'Usuario agregado',
                    newUser,
                    token
                });
            })



        });



    });



}

const deleteUsuario = (req, res = response) => {

    const { id } = req.params;

    conexion.query(`UPDATE usuario set  estatus='0' where idusuario=${id}`, (error, rows, fields) => {
        if (error) {

            console.log('Error al eliminar el usuario', error);
            return;
        }
        res.json({
            status: 'Usuario eliminado',
        });
    }
    );

}
const actualizarUsuario = (req, res = response) => {
    const { id } = req.params;
    const { nombre, correo, usuario, rol } = req.body;
    conexion.query(`SELECT * FROM usuario WHERE correo='${correo}' and idusuario<>'${id}'`, (error, rows, fields) => {

        if (error) {
            return error
        }
        if (rows.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado con otro user'
            });
        }
       
        conexion.query(`UPDATE usuario set nombre='${nombre}',correo='${correo}',usuario='${usuario}',rol='${rol}' where idusuario=${id}`, (error, rows, fields) => {
            if (error) {

                console.log('Error al actualizar el usuario', error);
                return;
            }
            res.json({
                status: 'Usuario actualizado'
            });
        }
        );
    });
}
const actualizarUsuarioPropio = (req, res = response) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    conexion.query(`SELECT * FROM usuario WHERE correo='${correo}' and idusuario<>'${id}'`, (error, rows) => {

        if (error) {
            return error
        }
        if (rows.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado con otro user'
            });
        }
    
        conexion.query(`UPDATE usuario set nombre='${nombre}',correo='${correo}' where idusuario=${id}`, (error, rows, fields) => {
            if (error) {

              res.status(400).json({
                    ok:false,
                    msg:'Error al actualizar el usuario'
              })
            }   
            res.json({
                msg: 'Usuario actualizado correctamente'
            });
        }
        );
    });
}
module.exports = {
    getUsuarios,
    getUsuarioByid,
    crearUsuario,
    deleteUsuario,
    actualizarUsuario,
    actualizarUsuarioPropio,
}