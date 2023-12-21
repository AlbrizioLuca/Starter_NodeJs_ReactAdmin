const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors("*"));

require("dotenv").config();

const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register");
const usersRouter = require("./users/users");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/users", usersRouter);

//Test connection
app.get("/api", (req, res) => {
  res.send("IamGroot!");
});

//* ------------------------ Lancement du serveur API ------------------------ */
const port = 5000;
app.listen(port, () => {
  console.log(`APi démarrée sur le port: ${port}`);
});
