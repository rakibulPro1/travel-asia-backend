const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");

const app = express();

// midleware
app.use(cors());
app.use(express.json());

// connet with mongodb database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjzgz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("travel_asia");
    const toursesCollection = database.collection("tourses");
    const bookingCollection = database.collection("bookings");

    // GET api to get all tourses
    app.get("/tourses", async (req, res) => {
      const cursor = toursesCollection.find({});
      const tourses = await cursor.toArray();
      res.send(tourses);
    });

    // GET API to get single tours
    app.get("/tourses/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await toursesCollection.findOne(query);
      res.send(result);
    });
    // POST API tourses
    app.post("/tourses", async (req, res) => {
      const tours = req.body;
      const result = await toursesCollection.insertOne(tours);
      res.json(result);
    });

    // POST API to Booking post
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.json(result);
    });

    // GET API to all bookings
    app.get("/bookings", async (req, res) => {
      const cursor = bookingCollection.find({});
      const bookings = await cursor.toArray();
      res.send(bookings);
    });

    console.log("database connected");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
