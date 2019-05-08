const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const port = process.env.PORT || 3333;
const users = require("./routes/users");
const profiles = require("./routes/profiles");
const posts = require("./routes/posts");

const app = express();
//use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//databse config
const db = require("./config/keys").MongoURI;

//connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongoDB connected"))
  .catch(err => console.log(err));
//passport middleware
app.use(passport.initialize());
//use cors
app.use(cors());
//passport config
require("./config/passport")(passport);
//use the routes
app.use("/users", users);
app.use("/profiles", profiles);
app.use("/posts", posts);

app.listen(port, () => console.log(`server is running on ${port}`));
