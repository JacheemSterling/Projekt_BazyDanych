const express = require("express");
const routes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

routes.route("/comments").get(function (req, res) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  db_connect
    .collection("comments")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

routes.route("/comments/add").post(function (req, response) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  let myobj = {
    comment: req.body.comment,
    user: req.body.user,
  };
  db_connect.collection("comments").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
    console.log("1 document added successfully");
  });
});

routes.route("/comments/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  let myquery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      comment: req.body.comment,
      user: req.body.user,
    },
  };
  db_connect
    .collection("comments")
    .updateOne(myquery, newValues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated successfully");
      response.json(res);
    });
});

routes.route("/comments/delete/:id").delete(function (req, res) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("comments").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.json(obj);
  });
});

module.exports = routes;
