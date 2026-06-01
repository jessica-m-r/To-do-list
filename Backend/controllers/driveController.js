const database = require("../firebase/firebase");
const File = require("../models/driveModel");

exports.upload_file = async(req, res, next) =>{
    try{
        if(!req.file){
            return res.status(400).json({mensaje:"Debe subir un archivo"});
        }
        const fileRef = database.ref("file").push();
        const file = new File(fileRef.key, req.file.filename, new Date().toISOString());
        await fileRef.set(file);
        res.status(201).json({
            mensaje: "Archivo subido correctamente",
            file
        });
    }catch(error){
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
        next(error);
    }
};
