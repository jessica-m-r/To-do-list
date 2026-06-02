const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"uploads/");
    },
    filename: function(req, file, cb){
        const extension = path.extname(file.originalname);
        let nombre = file.originalname.split(extension)[0];
        let nombreFinal = `${nombre}-${Date.now()}${extension}`;
        cb(null, nombreFinal);
    }
})
const upload = multer({storage })
module.exports = upload;
