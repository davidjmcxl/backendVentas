const { response } = require("express");
const conexion = require('../config/conexion');
const getDocumentosColeccion= async(req,res=response)=>{
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
   
    
   
    switch
    (tabla) {
        case 'usuarios':
            const users = await conexion.query(`SELECT u.idusuario,u.nombre,u.correo,u.usuario,r.rol from usuario u inner join rol r on u.rol =r.idrol where ( u.idusuario LIKE  '%${busqueda}%' OR u.nombre LIKE '%${busqueda}%' OR u.correo LIKE  '%${busqueda}%' or
            u.usuario LIKE '%${busqueda}%' or r.rol LIKE  '%${busqueda}%') and estatus=1  order by idusuario asc`, (error, user) => {
                if (error) {
        
                    console.log('Error al buscar los usuarios', error);
                    return;
                }
                res.json({ user });
            });
        break;
        case 'proveedores':
            const providers = await conexion.query(`SELECT * from proveedor  where (  proveedor LIKE '%${busqueda}%' OR contacto LIKE  '%${busqueda}%' or
            date_add LIKE '%${busqueda}%' ) and estatus=1  order by codproveedor asc`, (error, provider) => {
                if (error) {
        
                    console.log('Error al buscar los proveedores', error);
                    return;
                }
                res.json({ provider });
            });
        break;
        case 'productos':
            const products = await conexion.query(`SELECT p.codproducto,p.descripcion,p.precio,p.existencia, p.imagen,pr.proveedor ,pr.codproveedor from producto p inner join proveedor pr on p.proveedor = pr.codproveedor where (  p.descripcion LIKE '%${busqueda}%' )and  p.estatus=1 order by p.codproducto`, (error, product) => {
                if (error) {
        
                    console.log('Error al buscar los Productos', error);
                    return error;
                }
                res.json({ product });
            });
        break;
        case 'clientes':
            const customers = await conexion.query(`SELECT *from cliente  where (  nombre LIKE '%${busqueda}%' OR nit LIKE '%${busqueda}%'  )and  estatus=1 order by idcliente`, (error, customer) => {
                if (error) {
        
                    console.log('Error al buscar los Clientes', error);
                    return error;
                }
                res.json({ customer });
            });
        break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }
    


}
module.exports = {
   
    getDocumentosColeccion
}