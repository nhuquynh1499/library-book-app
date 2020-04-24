const express = require("express");
const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");
const transactionRoute = require("./routes/transaction.route");
const middlewareTransaction = require("./middlewares/transaction.middleware");
const middlewareCount = require("./middlewares/countCookie.middleware");
const cookieParser = require('cookie-parser');


const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'pug');

// https://expressjs.com/en/starter/basic-routing.html
// send the default array of dreams to the webpage
app.get('/', middlewareCount.countCookie, (req, res) => {
  console.log(req.cookie);
  res.render('index');
  
})
app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', middlewareTransaction.complete, transactionRoute);


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
