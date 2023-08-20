

const Router = require('express');
const { getDocumentosColeccion } = require('../controllers/search');
const validarJWT = require('../middlewares/validar-jwt');
const router = Router();

router.get('/:tabla/:busqueda',validarJWT,getDocumentosColeccion);
module.exports = router;