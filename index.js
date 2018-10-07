let express = require('express');
let cors = require('cors');

//routers
let userRouter = require('./routers/user');
let authRouter = require('./routers/auth');
let newuserRouter = require('./routers/newuser');
let testRouter =  require('./routers/test');

let port = process.env.PORT || 3000;
let app = express();
app.use(cors());
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

app.listen(port, function(){console.log('Listening to port 3030')});