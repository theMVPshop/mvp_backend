const express = require("express");
const cors = require("cors");
const authRouter = require("./server/routers/auth");

//routers
const routers = require("./server/routers/routers");

//initializing
const port = process.env.PORT || 4001;
const app = express();
app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("theMVPshop");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
