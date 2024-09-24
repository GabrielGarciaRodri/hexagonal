// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const passport = require('passport');
const sessionGoogleOAuth = require('../middlewares/sessionAuth');
const path = require('path');
const cors = require('cors');
const {auth} = require('../../application/middlewares/authenticateToken')
const indexRouter = require('../../application/routes/indexRouter');
const loginRouter = require('../../application/routes/loginRouter');
const createAccountRouter = require('../../application/routes/createAccountRouter');
const productRoutes = require('../../application/routes/userProductRoutes');
const userRoutes = require('../../application/routes/userRouter');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');

const createServer = () => {
    const app = express();
    app.use(cors({
        origin: 'http://localhost:5173', 
        credentials: true,
      }));
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);
    

    // Archivos estáticos
    app.use("/css", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "css")));
    app.use("/js", express.static(path.join(__dirname, process.env.EXPRESS_STATIC, "js")));
    app.use(express.static(process.env.EXPRESS_STATIC));

    app.use('/', indexRouter);
    app.use('/login', sessionGoogleOAuth, passport.initialize(), passport.session(), loginRouter);
    app.use('/createAccount', createAccountRouter);
    app.use('/users', userRoutes);
    app.use('/home', productRoutes);

    return app;
};

module.exports = createServer;