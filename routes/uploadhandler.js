const express = require('express')
const bodyParser = require ("body-parser")
const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
// const app = express()

var router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;

let host = `http://localhost:${port}/`;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/gif" || file.mimetype == "image/jpeg") {
            cb(null, 'photos')
        } else if (file.mimetype == "audio/mpeg" || file.mimetype == "audio/webm" || file.mimetype == "audio/x-wav" || file.mimetype == "audio/ogg" || file.mimetype == "audio/mp3" || file.mimetype == "audio/mp4") {
            cb(null, 'audios')
        } else if (file.mimetype == "video/mp3" || file.mimetype == "video/mp4") {
            cb(null, 'videos')
        } else if (file.mimetype == "application/pdf" || file.mimetype == "application/msword" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            cb(null, 'documents')
        } else {
            cb(null, 'autres')
        }
    },
    filename: function (req, file, cb) {
        let hash = crypto.createHash('md5').update(file.originalname).digest('hex');
        cb(null, hash + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })




router.post('/file', upload.single("file"), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error("Please upload a file")
        return next(error)
    }
    res.send(host + file.path)
})


router.post('/many', upload.array('files', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }

    let fileUrl = []

    files.forEach(item => {
        fileUrl.push(host + item.path)
    });

    res.send(fileUrl)

})

module.exports = router