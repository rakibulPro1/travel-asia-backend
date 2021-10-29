const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
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
    const services = database.collection("services");

    console.log("database connected");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/users", (req, res) => {
  res.send("This is users page");
});
app.get("/services", (req, res) => {
  res.send("This is service page");
});
app.get("/comments", (req, res) => {
  res.send("This is service page");
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
