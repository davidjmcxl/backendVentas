
const Router = require('express');
const router = Router();
const {check}= require('express-validator');
const validarJWT = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
const { getClientes, getClienteByid, crearCliente, actualizarCliente, deleteCliente } = require('../controllers/clientes');
//asignacion de las rutas


//obtener todos los usuarios

router.get('/',getClientes);
router.get('/:id',getClienteByid);
router.post('/',[
    
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('nit','El numero de identificacion es obligatorio').not().isEmpty(),
    check('direccion','la direccion es obligatoria').not().isEmpty(),
    validarCampos
], crearCliente);
router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('nit','El numero de identificacion es obligatorio').not().isEmpty(),
    check('direccion','la direccion es obligatoria').not().isEmpty(),
    validarCampos
], actualizarCliente);
router.delete('/:id', deleteCliente);

module.exports=router;