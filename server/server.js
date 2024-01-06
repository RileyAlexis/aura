require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');


// const bodyParser = require('body-parser');

const app = express();
const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

//Routes
const userRouter = require('./routes/user.router');
const aiRouter = require('./routes/ai.router');
const { rejectUnauthenticated } = require('./modules/authentication-middleware');

/** ---------- MIDDLEWARE ---------- **/
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
  
// app.use(express.json({limit: '50mb' })); // needed for axios requests
// app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

/** ---------- EXPRESS ROUTES ---------- **/

app.use('/user', userRouter);
app.use('/ai', aiRouter)
app.use(express.static('build'));

/* --------------- Websockets connections ----------------- */
const checkAuth = (req, res, next) => {
    if (req.user) {
        console.log('Verified');
      return next();
    }
    res.status(401).send('Unauthorized');
  };

const messages = {
    user: 'Riley',
    message: 'Websockets has connected to the things and it probably mostly works now'
};

const onlineUsers = [];
io.engine.use(sessionMiddleware);

io.use((socket, next) => {
    console.log(socket.request.session);
    const handshakeData = socket.request;
    if (handshakeData.session && handshakeData.session.passport && handshakeData.session.passport.user) {
        return next();
    }
    next(new Error('Unauthorized'));
});

io.on('connection', (socket) => {
    console.log('A user connected to ', socket.id);
    
    socket.on('onlineUsers', (data) => {
        console.log('Online Users received', data.user);
        if (data.user !== null || data.user !== undefined) onlineUsers.push(data.user);
    });

    socket.emit("msg:get", { messages });
    socket.emit("onlineUsers", { onlineUsers });
    
});

io.on('disconnect', (socket) => {
    console.log("A user disconected from ", socket.id);
});


/** ---------- START SERVER ---------- **/
const PORT = process.env.PORT || 5001;


httpServer.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});