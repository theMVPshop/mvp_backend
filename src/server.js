//dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//routers
const routers = require("./server/routers/routers");
// const authRouter = require('./routers/auth');

//more initializing
const port = process.env.PORT || 4001;
const app = express();
app.use(express.static("build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(), routers);

app.get("/", (req, res) => {
  res.send("theMVPshop");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
