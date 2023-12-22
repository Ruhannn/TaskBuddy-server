const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.llm45p4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const taskCollection = client.db("TaskBuddy").collection("Task");

    app.post("/add-service", async (req, res) => {
      const formData = req.body;
      const result = await taskCollection.insertOne(formData);
      res.send(result);
    });
    console.log("You successfully connected to MongoDB!");
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("I love Ayaka");
});

app.listen(port, () => {
  console.log(`Love Ayaka on ${port}`);
});
