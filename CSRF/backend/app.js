var cookieParser = require("cookie-parser");
var csrf = require("csurf");
var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
const helmet = require("helmet");
// setup route middlewares
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

// create express app
var app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.hidePoweredBy());
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type,bearer"
//   );
//   // Transport Security added
//   res.setHeader("Strict-Transport-Security", "max-age=31536000;");
//   // Pass to next layer of middleware
//   next();
// });
// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

app.get("/form", csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  // res.render('send', { csrfToken: req.csrfToken() })
  res.send({ csrfToken: req.csrfToken() });
});

app.post("/process", parseForm, csrfProtection, function (req, res) {
  res.send("data is being processed");
});

module.exports = app;
