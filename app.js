const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');

app.set('view engine', 'ejs');


const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');


const errorController = require('./controllers/error')

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); // Here we are allowing 'public' folder public access.

app.use('/admin',adminRouter); 
app.use('/shop',shopRouter);
app.use('/',shopRouter);


//adding 404 error page
app.use(errorController.getError);


mongoose
  .connect(
    'mongodb+srv://randomboy059:OAlZXsqQq63w7sY9@cluster0.zcujzra.mongodb.net/ExpenseTracker?retryWrites=true'
  )
  .then(result => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

  //app.listen(5000);