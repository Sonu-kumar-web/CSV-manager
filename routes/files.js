const express = require("express");
const app = express();
const router = express.Router();
const multer=require('multer');
// var upload = multer({ dest: 'uploads/' });
const csvController = require('../controllers/csvController');


//defining multer storage as disk storage for local storage
var storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/');
    },
    filename: function(req, file,cb){
        cb(null, file.fieldname+"-"+Date.now()+"."+ file.originalname.split('.')[file.originalname.split('.').length -1]);
    },
});

//defining upload specifications
var upload=multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(csv)$/)) {
            // return cb(null, false)
            return cb(new Error('Only csv files are allowed!'));
        }
        cb(null, true);
    }
});



//different routes
router.get("/",csvController.getList);
router.get("/new",csvController.ViewUploadForm);

router.post("/new", upload.single('csvFile') , csvController.upload);

router.get("/:id", csvController.csvDisplay);

module.exports = router;