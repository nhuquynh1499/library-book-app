const express = require("express");
const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");
const transactionRoute = require("./routes/transaction.route");
const authRoute = require("./routes/auth.route");
const cartRoute = require('./routes/cart.route');

const middlewareTransaction = require("./middlewares/transaction.middleware");
const middlewareAuth = require("./middlewares/auth.middleware");
const sessionMiddleware = require('./middlewares/session.middleware');

const cookieParser = require('cookie-parser');



const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('abc1244'));
app.use(sessionMiddleware);

app.set('views', './views');
app.set('view engine', 'pug');

// app.use((req, res, next) => {
//   if(!req.cookies.count) {
//     res.cookie('count', 1);
//   } else {
//     var count = req.cookies.count;
//     count++;  
//     res.cookie('count', count);
//   }
//   console.log(req.cookies.count);
//   next();
// });

app.get('/', (req, res) => {
  res.render('index');
})
app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', middlewareAuth.requireAuth, middlewareTransaction.complete, transactionRoute);
app.use('/auth', authRoute);
app.use('/cart', middlewareAuth.requireAuth, cartRoute);


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
