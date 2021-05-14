//dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

//routers
const routers = require("./routers/routers");
// const authRouter = require('./routers/auth');

//more initializing
const app = express();
const port = process.env.PORT || 4001;
app.use(express.static("../build"));
// app.use(express.static(path.join(__dirname, '../build')))
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", express.static("../build"), cors(), routers);
app.use(cors(), routers);
// app.use('/auth', cors(corsOptions), authRouter)
app.get("/", (req, res) => {
  res.send("theMVPshop");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
