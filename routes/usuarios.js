
const Router = require('express');
const router = Router();
const {check}= require('express-validator');
const { getUsuarios, getUsuarioByid, crearUsuario, deleteUsuario, actualizarUsuario } = require('../controllers/usuarios');
const validarJWT = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
//asignacion de las rutas


//obtener todos los usuarios

router.get('/',getUsuarios);
router.get('/:id',getUsuarioByid);
router.post('/',[
    
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo es obligatorio').isEmail(),
    check('clave','El nombre es obligatorio').not().isEmpty(),
    check('rol','El role es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo es obligatorio').isEmail(),
    check('clave','El nombre es obligatorio').not().isEmpty(),
    check('rol','El role es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario);
router.delete('/:id',validarJWT, deleteUsuario);


module.exports = router;
