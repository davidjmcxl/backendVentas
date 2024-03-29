const { response } = require("express");

const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const conexion = require("../configDB/conexion");

const loginUsuario = async (req, res = response) => {
    const { correo, clave } = req.body;

    try {
        const query = "SELECT * FROM usuario WHERE correo=?";
        conexion.query(query, [correo], async (error, user) => {
            if (user.length === 0) {
                return res.status(400).json({
                    ok: false,
                    msg: "El correo Ingresado no existe",
                });
            }

            const validPassword = bcrypt.compareSync(clave, user[0].clave);
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: "El password no es válido",
                });
            }

            if (user.length > 0) {
                // Generar el JWT
                const token = await generarJWT(user[0].idusuario);

                return res.status(200).json({
                    ok: true,
                    token,
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const revalidarToken = async (req, res = response) => {
    const { uid } = req;

    // Leer la base de datos

    try {
        // Utiliza una consulta preparada
        const query = "SELECT * FROM usuario WHERE idusuario = ?";
        conexion.query(query, [uid], async (error, user) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: "Hable con el administrador",
                });
            }

            if (user.length === 0) {
                return res.status(400).json({
                    ok: false,
                    msg: "El usuario no existe",
                });
            }

            const token = await generarJWT(uid);
            const userWithOutPass = user.map((u) => {
                const { clave, ...userNew } = u;
                return userNew;
            });

            return res.json({
                ok: true,
                user: userWithOutPass,
                token,
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

module.exports = {
    loginUsuario,
    revalidarToken,
};
