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

routes.route("/drinks").get(function (req, res) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  db_connect
    .collection("drinks")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

routes.route("/drinks/add").post(function (req, response) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  let myobj = {
    name: req.body.name,
    recipe: req.body.recipe,
    type: req.body.type,
    type_of_glass: req.body.type_of_glass,
    ingredients: req.body.ingredients,
    image: req.body.image,
    grades: req.body.grades,
  };
  db_connect.collection("drinks").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
    console.log("1 document added successfully");
  });
});

routes.route("/drinks/:id/avg").get(function (req, response) {
  //Average of drink grade
  let db_connect = dbo.getDb("Projekt_Bazy");
  db_connect
    .collection("drinks")
    .aggregate([
      {
        $match: { _id: ObjectId(req.params.id) },
      },
      {
        $project: {
          avg: {
            $cond: {
              if: { $eq: [{ $size: "$grades" }, 0] },
              then: 0,
              else: { $avg: "$grades" },
            },
          },
        },
      },
    ])
    .toArray(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

routes.route("/drinks/addgrade/:id").post(function (req, response) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  let myquery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $push: {
      grades: req.body.grade,
    },
  };
  db_connect
    .collection("drinks")
    .updateOne(myquery, newValues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated successfully");
      response.json(res);
    });
});

routes.route("/drinks/delete/:id").delete(function (req, res) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("drinks").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.json(obj);
  });
});

routes.route("/drinks/:id").get(function (req, res) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  db_connect
    .collection("drinks")
    .find({ _id: ObjectId(req.params.id) })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

routes.route("/drinks/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("Projekt_Bazy");
  let myquery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      name: req.body.name,
      recipe: req.body.recipe,
      type: req.body.type,
      type_of_glass: req.body.type_of_glass,
      ingredients: req.body.ingredients,
      image: req.body.image,
      grades: req.body.grades,
    },
  };
  db_connect
    .collection("drinks")
    .updateOne(myquery, newValues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated successfully");
      response.json(res);
    });
});
module.exports = routes;
