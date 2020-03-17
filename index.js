const express = require('express');
const http = require('http');
const morgan = require('morgan'); // for logging
const body_parser = require('body-parser');

const dishRouter = require('./routes/dishRoute');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');


const hostname = 'localhost';
const port= 3000;

const app = express();
app.use(morgan('dev'));// using morgan for dev logging.
app.use(body_parser.json()); // parse the body

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);



// defining the path from where the static pages will be served.
// __dirname is root
// www.localhost:3000/ will take to /public/index.html
// www.localhost:3000/aboutus.html will take to /public/aboutus.html
app.use(express.static(__dirname+ '/public')); 


// this is what express will serve by default when the path/static file mentioned in the URL does not exist 
// in our server , basically file not found logic should be handled here
app.use((req, res, next) => {
 console.log(req.header);
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/html');
 res.end('<html><body><p> This is express server</p><body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname , () =>{
console.log(`server running at ${hostname}:${port}`);
});
