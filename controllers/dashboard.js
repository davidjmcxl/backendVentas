const { response } = require("express");
const conexion = require('../config/conexion');



//obtener todos los productos

const getDashboard = (req, res=response) => {
    conexion.query('CALL dataDashboard();',
     (error, data) => {
        if (error) {

            console.log('Error al obtener los datos', error);
            return;
        }
        console.log(data);
        res.status(200).json({
            ok:true,
            data});
    });
}

module.exports={
    getDashboard
}