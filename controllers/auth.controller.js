const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const md5 = require("md5");
const sgMail = require("@sendgrid/mail");

module.exports.login = (req, res) => {
  if (!req.cookies.wrongLoginCount) {
    res.cookie("wrongLoginCount", 0);
  }
  res.render("auth/login");
};

module.exports.postLogin = (req, res, next) => {
  if (parseInt(req.cookies.wrongLoginCount) >= 3) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: req.body.email,
      from: "nguyenngocnhuquynh.141999@gmail.com",
      subject: "Cảnh báo đăng nhập",
      text: "Ai đó đang đăng nhập vào tài khoản của bạn",
      html: "<strong>Ai đó đang đăng nhập vào tài khoản của bạn</strong>"
    };
    //ES6
    sgMail.send(msg).then(
      () => {},
      error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
    res.render("auth/login", {
      errors: ["You logged in wrongly too many times."],
      isSendMail: true
    });
    return;
  }
  var email = req.body.email;
  var password = req.body.password;
  var user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("auth/login", {
      errors: ["User is not exist"],
      value: req.body
    });
    return;
  }

  var result = bcrypt.compareSync(req.body.password, user.password);
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
};
