const { red } = require("@mui/material/colors");
const express = require("express");
const bcrypt = require('bcrypt')
 
const saltRounds = 7;
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("./connect");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// Retrieve All Tasks
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb();
 db_connect
   .collection("Tasks")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Retrieve All Projects
recordRoutes.route("/project").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("Projects")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

// Retrieve Task
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("Tasks")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Create Task
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   title: req.body.title,
   description: req.body.description,
   projectId: req.body.projectId,
   dateCreated: req.body.dateCreated,
   tags: req.body.tags,
   status: 1,
 };
 db_connect.collection("Tasks").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});

// Create Project
recordRoutes.route("/project/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
    status: 1,
  };
  db_connect.collection("Projects").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });
 
// Update Task
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     title: req.body.title,
     description: req.body.description,
     dateCreated: req.body.dateCreated,
     projectId: req.body.projectId,
     tags: req.body.tags,
     status: req.body.status,
   },
 };
 db_connect
   .collection("Tasks")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});

// Update Project
recordRoutes.route("/updateP/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      dateCreated: req.body.dateCreated,
      status: req.body.status,
    },
  };
  db_connect
    .collection("Projects")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });
 
// Delete task
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("Tasks").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});

// Delete Project
recordRoutes.route("/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Projects").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
 });
 
 // Register New User
 recordRoutes.route("/register").post(async function (req, response) {
  let db_connect = dbo.getDb();

  const takenUsername = await db_connect.collection("Users").findOne({username: req.body.username})
  const takenEmail = await db_connect.collection("Users").findOne({email: req.body.email})

  if (takenUsername || takenEmail) {
    response.json({message: "Username or email has already been taken"})
  }

  else {
    let hash = await bcrypt.hash(req.body.password, saltRounds)
    console.log(hash)

    let myobj = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
      dateJoined: req.body.dateJoined,
      authorizations: req.body.authorizations
    };
    db_connect.collection("Users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  }
 });

  // Login Verification
  recordRoutes.route("/login").post(async function (req, response) {
    let db_connect = dbo.getDb();
  
    const userObj = await db_connect.collection("Users").findOne({email: req.body.email})

    if (userObj) {
      let confirmation = await bcrypt.compare(req.body.password, userObj.password)
      console.log(confirmation)
      response.json({success: confirmation, userObj})
    } else {
      console.log("No email was found")
      response.json({success: false, message: "No email was found"})
    }
   });

  // Get single user information
recordRoutes.route("/user").get(function (req, res) {
  let db_connect = dbo.getDb(); 
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("Users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

module.exports = recordRoutes;