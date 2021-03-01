require('./models/db')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const rtsIndex = require('./routes/cate.router');
const productRoute = require('./routes/product.router');
const customerRoute = require('./routes/customer.router');
const cartRoute = require('./routes/cart.router');

const path = require('path');

var imagePath = path.join(__dirname, 'uploads')

const port=8080;
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(imagePath))
app.use('/api',rtsIndex);
app.use('/api', productRoute);
app.use('/api',customerRoute);
app.use('/api',cartRoute);


app.listen(port,()=>console.log(`server running at port ${port}`));