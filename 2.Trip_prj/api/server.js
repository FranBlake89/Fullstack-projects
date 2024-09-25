/*********************************************************************************
 *  WEB422 – Assignment 1
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Francisco Castillo Student ID: 148904212 Date: 2023-09-18
 *  Cyclic Link:
 *  https://careful-teal-threads.cyclic.app/api/trips?page=1&perPage=7
 ********************************************************************************/
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TripDB = require("./modules/tripDB.js");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3030;
const db = new TripDB();

app.use(express.json());
app.use(cors());
const { MONGODB_CONN_STRING } = process.env;
db.initialize(MONGODB_CONN_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error Mongoose: " + err);
  });

// setup handlebars
const exphbs = require("express-handlebars");
const { get } = require("http");
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      json: (context) => {
        return JSON.stringify(context);
      },
    },
  })
);
app.set("view engine", ".hbs");

// ----------------
// endpoints
// ----------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.post("/api/trips", async (req, res) => {
  try {
    const tripData = req.body;
    //console.log(`data from html ${tripData}`);

    const newTrip = await db.addNewTrip(tripData);
    res.status(201).render("main", { layout: false, trip: newTrip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/trips", async (req, res) => {
  try {
    const { page, perPage } = req.query;
    const trips = await db.getAllTrips(page, perPage);
    res.json(trips)
    //console.log(`get all trips ${trips} `)
    //res.render("main", { layout: false, trip: trips });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/trips/:id
app.get("/api/trips/:id", async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await db.getTripById(tripId);
    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ error: "Trip not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/trips/:id
app.put("/api/trips/:id", async (req, res) => {
  try {
    const tripId = req.params.id;
    const updatedTripData = req.body;
    const updatedTrip = await db.updateTripById(updatedTripData, tripId);
    if (updatedTrip) {
      res.json(updatedTrip);
    } else {
      res.status(404).json({ error: "Trip not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/trips/:id
app.delete("/api/trips/:id", async (req, res) => {
  try {
    const tripId = req.params.id;
    const result = await db.deleteTripById(tripId);
    if (result.deletedCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Trip not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
