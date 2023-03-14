const { response } = require('express');

 const bcrypt = require('bcryptjs');
 const { generarJWT } = require('../helpers/jwt');  
const conexion = require('../config/conexion');




const loginUsuario = async(req, res = response) => {

    const { correo, clave } = req.body;

    try {
        conexion.query(`SELECT * FROM usuario WHERE correo='${correo}'`,  async(error, rows) => {
        
            if (rows.length === 0) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo no existe'
                });
            }
            
            const validPassword = bcrypt.compareSync( clave, rows[0].clave );
            if ( !validPassword ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El password no es válido'
                });
            }  
            console.log(rows)
            if(rows.length>0){
                // Generar el JWT
              const token = await generarJWT( rows[0].idusuario);
                return res.status(400).json({
                    ok: true,
                    rows,token
                });
            }
        });


            }

        

        catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


   


const revalidarToken = async(req, res = response ) => {

    const { uid } = req;

    // Leer la base de datos
    

          try{
                conexion.query(`SELECT * FROM usuario WHERE idusuario='${uid}'`,  async(error, rows) => {
                
                    if (rows.length === 0) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'El usuario no existe'
                        });
                    }
                    const token = await generarJWT( uid );
                    return res.json({
                        ok: true,
                        rows,
                        token
                    });
                
                });
            }catch (error) {
                    console.log(error);
                    return res.status(500).json({
                        ok: false,
                        msg: 'Hable con el administrador'
                    });
                }
                }
           
        
         
 



module.exports = {
    
    loginUsuario,
    revalidarToken
   
}