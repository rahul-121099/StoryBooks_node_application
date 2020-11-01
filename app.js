const express = require("express");
const dotenv = require("dotenv");
const connection = require("./database");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

// const __dirname = path.resolve(path.dirname(""));

//Init config
dotenv.config({ path: "./config/config.env" });

//Passport config
require('./config/passport')(passport);

//Basic config for node app
const app = express();

//Session management
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//for logging the http requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Handlebars config
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.engine(
  "handlebars",
  exphbs({
    layoutsDir: __dirname + "/views/layouts",
  })
);

//create static folder
app.use(express.static(__dirname + "public"));

//Routes confing for API
app.use("/", require('./routes/index'));
app.use("/auth", require('./routes/auth'));

const PORT = process.env.PORT || 9000;

//database connectDB
connection();

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);  
});
