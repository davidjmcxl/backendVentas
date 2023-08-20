
const Router = require('express');
const router = Router();
const {check}= require('express-validator');
const validarJWT = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
const expressfileUpload = require('express-fileupload');
const { getProductos, getProductosById, crearProducto, deleteProducto, actualizarProducto, addCantidad } = require('../controllers/productos');
const { actualizarCliente } = require('../controllers/clientes');
//asignacion de las rutas


//obtener todos los usuarios
router.use(expressfileUpload());
router.get('/',getProductos);
router.get('/:id',getProductosById);
router.post('/', crearProducto);
router.put('/:id',[
    check('descripcion','El nombre es obligatorio').not().isEmpty(),
    check('proveedor','El id del proveedor es necesaria').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('existencia','la cantidad del pruducto es necesaria').not().isEmpty(),
    check('usuario_id','El id del usuario es obligatorio ').not().isEmpty(),
    validarCampos
], actualizarProducto);
router.put('/add/:id',[
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('cantidad','la cantidad del pruducto es necesaria').not().isEmpty(),
    
    validarCampos
], addCantidad);
router.delete('/:id', deleteProducto);

module.exports=router;