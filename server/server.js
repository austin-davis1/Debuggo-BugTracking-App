require("dotenv").config({ path: "./config.env" })

const express = require("express")
const cors = require("cors")
const record = require("./record")
const users = require("./users")
const connect = require("./connect")

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(record);
app.use(users);
// get driver connection
const dbo = connect;
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});
