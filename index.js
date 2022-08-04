const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
var fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imagenes/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix)
    }
})
const carga = multer({ storage: storage })

const app = express();
app.use(cors());

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/upload', carga.single('image'), (req) => {
//     const filePath = `/imagenes/${Date.now()}_${".jpg"}`
//     const buffer = Buffer.from(req.body.image.split(",")[1], "base64");
//     fs.writeFileSync(path.join(__dirname, filePath), buffer);
// })

app.post('/upload', carga.single('image'), (req) => {
    const filePath = `/imagenes/${Date.now()}_${".jpg"}`
    const buffer = Buffer.from(req.body.image.split(",")[1], "base64");
    fs.writeFileSync(path.join(__dirname, filePath), buffer);
})

const port = 3000;
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto: " + port);
})
