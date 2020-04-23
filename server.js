const express = require("express");
const favicon = require('express-favicon');
const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");
const transactionRoute = require("./routes/transaction.route");

const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.set('views', './views');
app.set('view engine', 'pug');

// https://expressjs.com/en/starter/basic-routing.html
// send the default array of dreams to the webpage
app.get('/', (req, res) => {
  res.render('index');
})
app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', transactionRoute);


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
