console.log('\n\n-: App Started :-');

const express       = require('express');
const bodyParser    = require('body-parser')
const mongoose      = require('mongoose');
const session       = require('express-session');
const mongodbStore  = require('connect-mongodb-session')(session);


const mongoConnect  = require('./util/database').mongoConnect;
const MONGODB_URI   = "mongodb+srv://tester:tester1234@cluster0.hlicuim.mongodb.net/Mydb?retryWrites=true&w=majority";
const store         = new mongodbStore({ uri: MONGODB_URI, collection: 'sessions' });
const params        = { secret: 'my-secret', resave: false, saveUninitialized: false, store: store };


const app   = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session(params));


const shop = require('./routes/shop');
app.use(shop);

const product = require('./routes/product');
app.use(product);

const auth = require('./routes/auth');
app.use(auth);

app.use('/', (req, res, next)=>{
    console.log('-: Welcome :-');
    //res.send('-: Welcome :-');
    res.render('home', {sessionData:req.session});
});



console.log('-: App Running :-');
mongoConnect(()=>app.listen(3000));

mongoose.connect(MONGODB_URI).then(result => app.listen(3001)).catch(err=>console.log(err));

