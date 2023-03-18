const { response } = require("express");
const bcrypt =require('bcryptjs');
const {generarJWT} =require('../helpers/jwt')
const conexion = require('../config/conexion');
const e = require("express");

//obtener todos los usuarios

const getUsuarios = (req, res=response) => {
    conexion.query('SELECT u.idusuario,u.nombre,u.correo,u.usuario,r.rol from usuario u inner join rol r on u.rol =r.idrol', (error, rows,fields) => {
        if (error) {

            console.log('Error al obtener los usuarios', error);
            return;
        }
        res.json(rows);
    });
}

//obtener un usuario por id 

const getUsuarioByid = (req, res=response) => {
    const { id } = req.params;

    conexion.query(`SELECT *from usuario where idusuario=${id}`, (error, rows,fields) => {
        if (error) {

            console.log('Error al obtener los usuarios', error);
            return;
        }
        res.json(rows);
    });
}

const crearUsuario = (req, res=response) => {
    const { nombre, correo, usuario, clave, rol } = req.body;
    conexion.query(`SELECT * FROM usuario WHERE correo='${correo}'`,  (error, rows,fields) => {
       
        if (error) {
           return error
        }
        if(rows.length>0){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

            const passEncrypted= bcrypt.hashSync(clave,10);
            
        /*     const token = await generarJWT(rows.idusuario); */
           conexion.query(`INSERT INTO usuario(nombre,correo,usuario,clave,rol) VALUES ('${nombre}','${correo}','${usuario}','${passEncrypted}','${rol}')`, async(error, rows,fields) => {
                if (error) {
                    
                    console.log('Error al agregar el usuario', error);
                    return;
                }  
                const id = rows.insertId;

                // Generar token
                const token = await generarJWT( id);
                console.log(token)
                res.json({ status: 'Usuario agregado',token});
            });   
           
        

    });


   
}

const deleteUsuario = (req ,res=response)=>{

    const { id } = req.params;

    conexion.query(`UPDATE usuario set  estatus='0' where idusuario=${id}`, (error, rows,fields) => {
        if (error) {

            console.log('Error al eliminar el usuario', error);
            return;
        }
        res.json({ status: 'Usuario eliminado',
         });
    }
    );

}
const actualizarUsuario = (req ,res=response)=>{
    const { id } = req.params;
    const { nombre, correo, usuario, clave, rol } = req.body;
    conexion.query(`SELECT * FROM usuario WHERE correo='${correo}' and idusuario<>'${id}'`,  (error, rows,fields) => {
       
        if (error) {
           return error
        }
        if(rows.length>0){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado con otro user'
            });
        }
    const passEncrypted= bcrypt.hashSync(clave,10);
    conexion.query(`UPDATE usuario set nombre='${nombre}',correo='${correo}',usuario='${usuario}',clave='${passEncrypted}',rol='${rol}' where idusuario=${id}`, (error, rows,fields) => {
        if (error) {
                
            console.log('Error al actualizar el usuario', error);
            return;
        }
        res.json({ status: 'Usuario actualizado'
            });
    }
    );});
}

module.exports = {
    getUsuarios,
    getUsuarioByid,
    crearUsuario,
    deleteUsuario,
    actualizarUsuario
}