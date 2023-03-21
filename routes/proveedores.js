
const Router = require('express');
const router = Router();
const {check}= require('express-validator');
const validarJWT = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');


const { getProveedores, getProveedorById, crearProveedor, actualizarProveedor, deleteProveedor } = require('../controllers/proveedores');

//asignacion de las rutas


//obtener todos los usuarios

router.get('/',getProveedores);
router.get('/:id',getProveedorById);
router.post('/',[
    
    check('contacto','El nombre del contacto es obligatorio').not().isEmpty(),
    check('proveedor','El id del proveedor es necesaria').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('direccion','la direccion del Proveedor es necesaria').not().isEmpty(),
    check('usuario_id','El id del usuario es obligatorio ').not().isEmpty(),
    validarCampos
], crearProveedor);
router.put('/:id',[
    check('contacto','El nombre del contacto es obligatorio').not().isEmpty(),
    check('proveedor','El id del proveedor es necesaria').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('direccion','la direccion del Proveedor es necesaria').not().isEmpty(),
    check('usuario_id','El id del usuario es obligatorio ').not().isEmpty(),
    validarCampos
], actualizarProveedor);
router.delete('/:id', deleteProveedor);

module.exports=router;