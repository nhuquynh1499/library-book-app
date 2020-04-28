const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const md5 = require("md5");

module.exports.login = (req, res) => {
  if (!req.cookies.wrongLoginCount) {
    res.cookie("wrongLoginCount", 0);
  }
  res.render("auth/login");
};

module.exports.postLogin = (req, res, next) => {
  if (parseInt(req.cookies.wrongLoginCount) >= 3) {
    var helper = require("sendgrid").mail;
    var fromEmail = new helper.Email("test@example.com");
    var toEmail = new helper.Email("test@example.com");
    var subject = "Sending with SendGrid is Fun";
    var content = new helper.Content(
      "text/plain",
      "and easy to do anywhere, even with Node.js"
    );
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require("sendgrid")(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
      if (error) {
        console.log("Error response received");
      }
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
    res.render("auth/login", {
      errors: ["You logged in wrongly too many times. Please check your mail!"],
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
