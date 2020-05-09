const 

module.exports.login = async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = await userModel.findOne({ email: email });

  if (!user) {
    res.render("auth/login", {
      errors: ["User is not exist"],
      value: req.body
    });
    return;
  }
  
  console.log(user.password);

  var result = bcrypt.compareSync(req.body.password, user.password);
  console.log(result);
  if (!result) {
    var wrongLoginCount = parseInt(req.cookies.wrongLoginCount);
    wrongLoginCount++;
    res.cookie("wrongLoginCount", wrongLoginCount);
    res.render("auth/login", {
      errors: ["Wrong password."],
      value: req.body
    });
  }
  res.cookie("userId", user.id, {
    signed: true
  });
  res.cookie("wrongLoginCount", 0);
  res.redirect("/transactions");
}