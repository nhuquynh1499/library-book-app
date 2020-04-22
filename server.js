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
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

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

app.get("/books/create", (req, res) => {
  res.render('create');
});

app.post("/books/create", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  db.get('books').push({
    id: db.get('books').value().length,
    title: title,
    description: description
  }).write()
  res.redirect('/books');
});

app.get("/books/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get('books').remove({ id: parseInt(id) }).write();
  res.redirect('/books');
}) 

app.get("/books/:id/update", (req, res) => {
  res.render('')
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
