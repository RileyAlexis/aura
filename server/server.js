require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const initializeSockets = require('./sockets/socketroot')

// const bodyParser = require('body-parser');

const app = express();
const httpServer = createServer(app);


const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

//Routes
const userRouter = require('./routes/user.router');
const aiRouter = require('./routes/ai.router');
const naughtyRouter = require('./routes/naughty.router');
const savesRouter = require('./routes/saves.router');
const loadingRouter = require('./routes/loadingRouter');
const gameDataRouter = require('./routes/gamedata.router');
const adminRouter = require('./routes/adminRouter');

/** ---------- MIDDLEWARE ---------- **/
const { rejectUnauthenticated } = require('./modules/authentication-middleware');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Passport Middleware
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
  
app.use(express.json({limit: '50mb' })); // needed for axios requests
// app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

/** ---------- EXPRESS ROUTES ---------- **/

app.use('/user', userRouter);
app.use('/ai', aiRouter)
app.use('/naughty', naughtyRouter);
app.use('/saves', savesRouter);
app.use('/loading', loadingRouter);
app.use('/gameData', gameDataRouter);
app.use('/admin', adminRouter);

app.use(express.static('build'));

/* --------------- Websockets connections ----------------- */
// const checkAuth = (req, res, next) => {
//     if (req.user) {
//         console.log('Verified');
//       return next();
//     }
//     res.status(401).send('Unauthorized');
//   };
const io = initializeSockets(httpServer);
// io.engine.use(sessionMiddleware);


/** ---------- START SERVER ---------- **/
const PORT = process.env.PORT || 5001;


httpServer.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});