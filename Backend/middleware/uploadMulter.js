const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"uploads/");
    },
    filename: function(req, file, cb){
        let nombre = file.originalname;
        const extension = path.extname(nombre);
        const nombreBase = path.basename(nombre, extension);
        let contador = 1;
        let nombreFinal = nombre;
        while(fs.existsSync(path.join("uploads", nombreFinal))){
            nombreFinal = `${nombreBase} (${contador})${extension}`;
            contador++;
        }
        cb(null, nombreFinal);
    }
})
const upload = multer({ storage: storage })
module.exports = upload;
