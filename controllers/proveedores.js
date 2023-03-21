const { response } = require("express");
const conexion = require('../config/conexion');

//obtener todos los Proveedores

const getProveedores = (req, res=response) => {
    conexion.query('SELECT * from proveedor where estatus=1 order by codproveedor',
     (error, rows) => {
        if (error) {

            console.log('Error al obtener los proveedores', error);
            return;
        }
        res.status(200).json({
            ok:true,
            rows});
    });
}

//obtener un Proveedor por id 

const getProveedorById = (req, res=response) => {
    const { id } = req.params;

    conexion.query(`SELECT * from proveedor where codproveedor=${id}`, (error, rows) => {
        if (error) {

            console.log('Error al obtener los Proveedores', error);
            return;
        }
        res.json(rows);
    });
}

const crearProveedor= (req, res=response) => {
    const { proveedor, contacto, telefono, direccion, usuario_id } = req.body;


           conexion.query(`INSERT INTO proveedor(proveedor,contacto,telefono,direccion,usuario_id) values('${proveedor}','${contacto}','${telefono}','${direccion}','${usuario_id}')`, async(error) => {
                if (error) {
                    
                    console.log('Error al agregar el Proveedor', error);
                    return;
                }  
                res.status(201).json({ 
                    ok:true,
                    status: 'Provedor creado Correctamente'});
            });   
  
}
const deleteProveedor = (req ,res=response)=>{

    const { id } = req.params;
    conexion.query(`UPDATE proveedor set  estatus='0' where codproveedor=${id}`, (error) => {
        if (error) {

            console.log('Error al eliminar el Proveedor', error);
            return;
        }
        res.json({ status: 'Proveedor eliminado',
         });
    }
    );

}
const actualizarProveedor= (req ,res=response)=>{
    const { id } = req.params;
    const { proveedor, contacto, telefono, direccion, usuario_id } = req.body;
    
      
            conexion.query(`UPDATE proveedor set proveedor='${proveedor}',contacto='${contacto}',telefono='${telefono}',direccion='${direccion}',usuario_id='${usuario_id}' where codproveedor=${id}`,
                 (error) => {
                if (error) {
                        
                    console.log('Error al actualizar el Proveedor', error);
                    return;
                }
                res.json({ status: 'Proveedor actualizado'});
            }
            );
      
  
}

module.exports = {
    getProveedores,
    getProveedorById,
    crearProveedor,
    deleteProveedor,
    actualizarProveedor
}