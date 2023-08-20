const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { actualizarImagen } = require("../helpers/actulizar-imagen");
const fileUpload = async(req,res=response)=>{
    
    const tipo =req.params.tipo;
    const id = req.params.id;
    const tiposValidos =['users','products','customers','providers'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'tipo de img  no valido'
        });
    }
    //validar q exista un archivo
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
      }

      // procesar imagen
        const file = req.files.imagen;
        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length -1];
        //validar extension
        const extensionesValidas = ['png','jpg','jpeg'];
        if(!extensionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok: false,
                msg: 'no es una extension permitida'
            });
        }
        //generar el nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
        //path para guardar la imagen
        const path = `./uploads/${tipo}/${nombreArchivo}`;
        //mover la imagen
        file.mv(path, (err)=> {
            if (err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'error al mover la imagen'
                });

            }
            actualizarImagen(tipo,id,nombreArchivo);
            res.json({
                ok: true,
                msg: 'archivo subido'
                ,nombreArchivo
            })
          });


}
const retornaImagen=(req,res=response)=>{
    const tipo =req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
    //imagen por defecto
    if(fs.existsSync(pathImg)){
        
        res.sendFile(pathImg);
    }
    else{
        const pathImg = path.join(__dirname,`../uploads/no_img.jpg`);
        res.sendFile(pathImg);
    }
   

}


module.exports = {
    fileUpload,
    retornaImagen
}