let express = require('express');

//routers
let userRouter = require('./routers/user');
let authRouter = require('./routers/auth');
let newuserRouter = require('./routers/newuser');
let testRouter =  require('./routers/test');

let app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

//using routers
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/newuser', newuserRouter);
app.use('/test', testRouter);


app.get('/', function(req, res){
    res.send('done');
})

app.listen('3030', function(){console.log('Listening to port 3030')});