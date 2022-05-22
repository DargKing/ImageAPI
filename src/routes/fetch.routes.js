const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs-extra');
const ObjectId = require('mongodb').ObjectId

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'src/storage/img')
        }, filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now())
        }
})

const upload = multer({ storage: storage })

router.post("/", upload.single("image"), (req, res, next) => {
        
        console.log(req.file)
        if(req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png"){
                let img = fs.readFileSync(req.file.path)
                var finalImg = {
                        contentType: req.file.mimetype,
                        file: req.file.filename
                };
                db.collection('img').insertOne(finalImg, (err, result) => {
                        if (err) return console.log("Error: " + err)
                        res.send(result)
                })
        } else {
                res.send({ 
                        err: "Tipo De Archivo No Valido"
                })
        }
})

router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../storage/favicon.ico"))
})

router.get("/:id", (req, res) => {
        var filename = req.params.id;
        db.collection('img').findOne({ '_id': new ObjectId(filename) }, (err, result) => {
                
                if (err) return console.log(err)
                
                if(result != null){
                        res.contentType(result.contentType);
                        res.sendFile(path.join(__dirname, `../storage/img/${result.file}`));
                }

        })
})

module.exports = router;