require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

//Routes
const userRouter = require('./routes/user.router');

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

app.use(express.static('build'));

/** ---------- START SERVER ---------- **/
const PORT = process.env.PORT || 5001;


app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});