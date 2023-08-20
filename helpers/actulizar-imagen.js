const fs =require('fs');
const conexion = require('../config/conexion');



const borraImg=(path)=>{
   
            //Si existe elimina la imagen anterior
            if(fs.existsSync(path)){
                
                 //Borrar imagen anterior
                fs.unlinkSync(path);
            }
}
const actualizarImagen=async(tipo,id,nombreArchivo)=>{
   
    switch(tipo){
        case 'users':
         
            conexion.query(`select * from usuario where idusuario=${id}`,(error,user)=>{
               
                if(error){
                    console.log(error);
                    return false;
                }
                console.log(nombreArchivo);
             
                
                const pathViejoU=`./uploads/users/${user[0].imagen}`;
                borraImg(pathViejoU);
               
                conexion.query(`update usuario set imagen='${nombreArchivo}' where idusuario=${id}`,(error,usuario)=>{
                    if(error){
                        console.log(error);
                        return false;
                    }
                
                    return true;
                })
            });
            break;
          
     
        case 'products':
            conexion.query(`select * from producto where codproducto=${id}`,(error,product)=>{
                if(error){
                    console.log(error);
                    return false;
                }
                if(product.length===0){
                    console.log('No es un producto por id');
                    return false;
                }
                const pathViejoU=`./uploads/products/${product[0].imagen}`;
                borraImg(pathViejoU);
                conexion.query(`update producto set imagen='${nombreArchivo}' where codproducto=${id}`,(error)=>{
                    if(error){
                        console.log(error);
                        return false;
                    }
                    return true;
                })
            });
        
        case 'customers':
            conexion.query(`select * from cliente where idcliente=${id}`,(error,customer)=>{
                if(error){
                    console.log(error);
                    return false;
                }
                if(customer.length===0){
                    console.log('No es un cliente por id');
                    return false;
                }
                const pathViejoU=`./uploads/customers/${customer[0].imagen}`;
                borraImg(pathViejoU);
                conexion.query(`update cliente set imagen='${nombreArchivo}' where idcliente=${id}`,(error,customer)=>{
                    if(error){
                        console.log(error);
                        return false;
                    }
                    return true;
                })
            });
        case 'providers':
            conexion.query(`select * from proveedor where codproveedor=${id}`,(error,provider)=>{
                if(error){
                    console.log(error);
                    return false;
                }
                if(provider.length===0){
                    console.log('No es un producto por id');
                    return false;
                }
                const pathViejoU=`./uploads/providers/${provider[0].imagen}`;
                borraImg(pathViejoU);
                conexion.query(`update proveedor set imagen='${nombreArchivo}' where codproveedor=${id}`,(error)=>{
                    if(error){
                        console.log(error);
                        return false;
                    }
                    return true;
                })
            });

        default:

            
        break;

            
}}

module.exports = {
    actualizarImagen
}