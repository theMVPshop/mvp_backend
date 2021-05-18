//dependencies
const express = require("express");
const cors = require("cors");

//routers
const routers = require("./server/routers/routers");
// const authRouter = require('./routers/auth');

//more initializing
const app = express();
const port = process.env.PORT || 4001;
app.use(express.static("build"));
app.use(cors(), routers);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("theMVPshop");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
