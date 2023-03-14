
const validarJWT= (req, res,next)=>{
const jwt = require('jsonwebtoken');

//leer el token
const token = req.header('x-token');
if (!token) {
    return res.status(401).json({
        ok: false,
        msg: 'No hay token en la peticion'
    });
}

try {
    const {uid}=jwt.verify(token,'daelprovidquechegeenlol3666as');
    
    req.uid=uid;
    next();
} catch (error) {
    return res.status(401).json({
        ok: false,
        msg: 'Token no valido'
    });
}
}
module.exports = validarJWT; 