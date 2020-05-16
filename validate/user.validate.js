module.exports.postCreate = (req, res, next)=> {
  console.log(req.body.name);
  var name = req.body.name;
  var error = '';
  if (name.length > 30) {
    error = 'Name must be less than 30 characters'
    res.render('users/create', {
      error: error
    })
    return;
  }
  next();
}