
const Router = require('express');
const router = Router();
const validarJWT = require('../middlewares/validar-jwt');
const { getDashboard } = require('../controllers/dashboard');



//obtener todos los usuarios

router.get('/',validarJWT,getDashboard);



module.exports=router;