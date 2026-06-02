const database = require("../firebase/firebase");
const File = require("../models/driveModel");
const path = require("path");
const fs = require("fs");

exports.upload_file = async(req, res, next) =>{
    try{
        if(!req.file){
            return res.status(400).json({mensaje:"Debe subir un archivo"});
        }
        const fileRef = database.ref("files").push();
        const tiempo = new Date();
        const fecha = tiempo.toLocaleDateString();
        const hora = tiempo.toLocaleTimeString();
        const file = new File(req.file.filename, fecha, hora);
        await fileRef.set(file);
        res.status(201).json({
            mensaje: "Archivo subido correctamente",
            file
        });
    }catch(error){
        console.log(error);
        next(error);
    }
}
exports.file_list = async (req, res, next) => {
    try{
        const datos = await database.ref("files").get();
        if (!datos.exists()) {
            return res.json([]);
        }
        res.json(datos.val());
    }catch (error){
        console.log(error);
        next(error);
    }
};
exports.file_delete = async(req, res, next) => {
    try{
        const {id} = req.params;
        const archivos = await database.ref("files/" + id).get();
        if(!archivos.exists()){
            return res.status(404).json({mensaje: "Archivo no encontrado"});
        }
        const archivoDatos = archivos.val();
        const rutaArchivo = path.join(__dirname, "../uploads",archivoDatos.titulo)
        
        if(fs.existsSync(rutaArchivo)){
            fs.unlinkSync(rutaArchivo)
        }

        await database.ref("files/" + id).remove();
        res.json({mensaje: "Archivo eliminado correctamente"});
    }catch(error){
        console.log(error);
        next(error);
    }
};

exports.file_download = async(req, res, next) => {
    try{
        const{id} = req.params;
        const archivo = await database.ref("files/" + id).get();

        if(!archivo.exists()){
            return res.status(404).json({mensaje:"Error archivo inexistente"})
        }
        const archivoDatos = archivo.val();
        const rutaArchivo = path.join(__dirname, "../uploads",archivoDatos.titulo)
        res.download(rutaArchivo, archivoDatos.filename)

    }catch(error){
        console.log(error);
        next(error);
    }
}