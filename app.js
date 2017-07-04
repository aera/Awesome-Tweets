const path         = require('path');
const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

const home      = require('./routes/home');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(logger('dev'));

app.use('/', home);


//URL localhost:4500
const PORT = 4500;
app.listen(PORT, function() {
    console.log(`Server listening on http://localhost:${PORT}`)
});
