const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');


const router = Router();


// Login de usuario
router.post( '/', [
    check('correo', 'El email es obligatorio').isEmail(),
    check('clave', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], loginUsuario );

// Validar y revalidar token
 router.get( '/', validarJWT , revalidarToken ); 







module.exports = router;