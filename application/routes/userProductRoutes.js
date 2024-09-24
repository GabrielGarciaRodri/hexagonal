// Define las rutas de la aplicación y mapea las URLs a los controladores.
const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { auth, authCookie } = require('../middlewares/authenticateToken');
const sessionAuth = require('../middlewares/sessionLogin');
const sessionGoogleOAuth = require('../../infraestructure/middlewares/sessionAuth');
const { versionMiddleware } = require('../middlewares/version');

const router = express.Router();

router.get("/v1.1.0", sessionAuth,  auth, (req, res)=>{
    res.sendFile(path.join(process.env.EXPRESS_STATIC, 'src/home/home'));
})
router.get("/v1.0.0", cookieParser(), authCookie, (req, res)=>{
    res.sendFile(path.join(process.env.EXPRESS_STATIC, 'src/home/home'));
})
router.get("/v2.0.0", sessionGoogleOAuth, (req, res)=>{
    console.log(req.session);
    res.sendFile(path.join(process.env.EXPRESS_STATIC, 'src/home/home'));
})


router.post("/", versionMiddleware("1.0.0"), fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 } // Límite de 50MB
}), (req, res) => {
    if (!req.files || !req.files.product_image) {
        return res.status(400).send('No se subió ningún archivo.');
    }

    let file = req.files.product_image;
    let fileBuffer = file.data;
    const filePath = path.resolve(__dirname, '../../frontend/storage/img', file.name);

    // Crear el directorio si no existe
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    fs.writeFile(filePath, fileBuffer, (err) => {
        if (err) {
            console.error(err); // Registrar el error para depuración
            return res.status(500).send('Error al guardar el archivo.');
        }
        res.status(200).json("Archivo Guardado");
    });
});



module.exports = router;