
const Router = require('express');
const router = Router();
const {check}= require('express-validator');
const validarJWT = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
const { getSales, addProductToSale, cancelarVenta, getProductsTemp, deleteProductToSale, procesarVenta } = require('../controllers/sales');

//asignacion de las rutas


//obtener todos los usuarios

router.get('/',getSales);
router.get('/productsTemp',getProductsTemp);
router.post('/addProduct',addProductToSale);
router.post('/process',procesarVenta);
router.delete('/deleteProduct',deleteProductToSale);
router.delete('/anular',cancelarVenta);


module.exports=router;