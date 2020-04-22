const express = require("express");
const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ books: [] }).write();

const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.set('views', './views');
app.set('view engine', 'pug');

// https://expressjs.com/en/starter/basic-routing.html
// send the default array of dreams to the webpage
app.get("/books", (req, res) => {
  // express helps us take JS objects and send them as JSON
  res.render('index', {
    books: db.get('books').value()
  })
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
