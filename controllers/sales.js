const { response } = require("express");
const conexion = require('../config/conexion');

//obtener todos las ventas

const getSales = (req, res=response) => {
    conexion.query('SELECT f.nofactura, f.fecha,f.totalfactura,f.codcliente,f.estatus, u.nombre as  vendedor ,cl.nombre as cliente from factura f inner join usuario u on f.usuario=u.idusuario inner join cliente cl on f.codcliente = cl.idcliente where f.estatus!=10 order by f.fecha desc ',
     (error, sales) => {
        if (error) {

            console.log('Error al obtener las Ventas', error);
            return;
        }
        res.status(200).json({
            ok:true,
            sales});
    });
}
const getProductsTemp=(req, res=response)=>{
    const token = req.header('x-token');
    conexion.query(`SELECT tmp.correlativo,tmp.token_user,tmp.cantidad,tmp.precio_venta,p.codproducto,p.descripcion 
    from detalle_temp tmp  inner join producto p on tmp.codproducto =p.codproducto where token_user ='${token}'`,(error,products)=>{
        if (error) {
            console.log('Error al obtener los productos', error);
            return;
        }
        res.status(200).json({
            ok:true,
            products});
    })
}
//añadir producto a tabla temporal de ventas.
const addProductToSale = (req, res=response) => {
    
    const token = req.header('x-token');
    console.log(token);
    const { cantidad, codproducto} = req.body;

    conexion.query(`CALL add_detalle_temp(${codproducto},${cantidad},'${token}')`,(error,resp)=>{
        if (error) {
            console.log('Error al agregar el producto', error);
            return res.json(error);
        }
        res.status(200).json({
            ok:true,
            resp});
    })
}
//eliminar producto a tabla temporal de ventas.

const deleteProductToSale = (req, res=response) => {
    
    const token = req.header('x-token');
  
    const { id_detalle} = req.body;

    conexion.query(`CALL del_detalle_temp(${id_detalle},'${token}')`,(error,resp)=>{
        if (error) {
            return res.json({
                ok:false,
                msg:"Error al eliminar el producto",error
            });
        }
        res.status(200).json({
            ok:true,
            resp});
    })
    
}
const procesarVenta = (req, res= response)=>{
    const token =req.header('x-token');
    const{codcliente,id_usuario}=req.body;
   
            conexion.query(`CALL procesar_venta(${id_usuario},${codcliente},'${token}')`,(error,resp)=>{
                if (error) {
                    return res.json({
                        ok:false,error
                    });}
                
                    res.status(200).json({
                        ok:true,
                        resp});
            })

   

  
}
const cancelarVenta = (req, res=response) => {
    
    const token = req.header('x-token');
  
    conexion.query(`DELETE FROM  detalle_temp where  token_user = '${token}'`,(error,resp)=>{
        if (error) {
            console.log('Error al eliminar el producto', error);
            return res.json(error);
        }
        res.status(200).json({
            ok:true,
            resp});
    })
}


module.exports = {
    getSales,getProductsTemp,
    addProductToSale,
    deleteProductToSale,
    procesarVenta,
    cancelarVenta
}