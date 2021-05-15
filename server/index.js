//dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

//routers
const routers = require("./routers/routers");
// const authRouter = require('./routers/auth');

//more initializing
const app = express();
const port = process.env.PORT || 4001;
app.use(express.static(path.join(__dirname, "../build")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors(), routers);


app.get("/", (req, res) => {
  res.send("theMVPshop");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
