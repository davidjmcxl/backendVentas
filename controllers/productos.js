const { response } = require("express");
const conexion = require('../config/conexion');


//obtener todos los productos

const getProductos = (req, res=response) => {
    conexion.query('SELECT p.codproducto,p.descripcion,p.precio,p.existencia,pr.proveedor from producto p inner join proveedor pr on p.proveedor = pr.codproveedor where p.estatus=1 order by p.codproducto',
     (error, rows) => {
        if (error) {

            console.log('Error al obtener los usuarios', error);
            return;
        }
        res.status(200).json({
            ok:true,
            rows});
    });
}

//obtener un usuario por id 

const getProductosById = (req, res=response) => {
    const { id } = req.params;

    conexion.query(`SELECT *from producto where codproducto=${id}`, (error, rows,fields) => {
        if (error) {

            console.log('Error al obtener los Productos', error);
            return;
        }
        res.json(rows);
    });
}

const crearProducto= (req, res=response) => {
    const { proveedor, descripcion, precio, existencia, usuario_id } = req.body;


           conexion.query(`INSERT INTO producto(proveedor,descripcion,precio,existencia,usuario_id) values('${proveedor}','${descripcion}','${precio}','${existencia}','${usuario_id}')`, async(error) => {
                if (error) {
                    
                    console.log('Error al agregar el Producto', error);
                    return;
                }  
                res.status(201).json({ 
                    ok:true,
                    status: 'Producto agregado'});
            });   
           
        

   


   
}

const deleteProducto = (req ,res=response)=>{

    const { id } = req.params;
    conexion.query(`UPDATE producto set  estatus='0' where codproducto=${id}`, (error) => {
        if (error) {

            console.log('Error al eliminar el Producto', error);
            return;
        }
        res.json({ status: 'Producto eliminado',
         });
    }
    );

}
const actualizarProducto= (req ,res=response)=>{
    const { id } = req.params;
    const { proveedor, descripcion, precio, existencia, usuario_id } = req.body;
    
      
            conexion.query(`UPDATE producto set proveedor='${proveedor}',descripcion='${descripcion}',precio='${precio}',existencia='${existencia}',usuario_id='${usuario_id}' where codproducto=${id}`,
                 (error) => {
                if (error) {
                        
                    console.log('Error al actualizar el Producto', error);
                    return;
                }
                res.json({ status: 'Producto actualizado'});
            }
            );
      
  
}
const addCantidad = (req, res)=>{
    const { id } = req.params;
    const { cantidad,precio } = req.body;
    conexion.query(`CALL actualizar_precio_producto(${cantidad},${precio},${id})`, (error) => {
        if (error) {

            console.log('Error al agregar la cantidad', error);
            return;
        }
        res.json({ status: 'Cantidad agregada',
         });
    }
    );
}
module.exports = {
    getProductos,
    getProductosById,
    crearProducto,
    deleteProducto,actualizarProducto,
    addCantidad
    
}