const app = require("express")();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const { ObjectId } = require("mongodb");

app.use(cors());

const uri =
  "mongodb+srv://hasnain:urdu@cluster0.tcc34.mongodb.net/bugs?retryWrites=true&w=majority";

let queryDB = (collection_name, query_expression) => {
  return new Promise((resolve) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
      const collection = client.db("bugs").collection(collection_name);
      resolve(query_expression(collection));
      client.close();
      if (err) throw err;
    });
  });
};

app.get("/create", (req, res) =>
  queryDB("bugs", (collection) =>
    collection
      .insertOne({
        _id: req.query.id,
        description: req.query.description,
        resolved: false,
      })
      .then((data) => res.json(data.result.n))
      .catch((err) => console.log(err))
  )
);
app.get("/read", (req, res) =>
  queryDB("bugs", (collection) => collection.find({}).toArray())
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
);
app.get("/updateDesc", (req, res) =>
  queryDB("bugs", (collection) =>
    collection.updateOne(
      { _id: req.query.id },
      {
        $set: {
          description: req.query.description,
        },
      }
    )
  )
    .then((data) => res.json(data.result.n))
    .catch((err) => console.log(err))
);

app.get("/updateRes", (req, res) =>
  queryDB("bugs", (collection) =>
    collection.updateOne(
      { _id: req.query.id },
      {
        $set: {
          resolved: req.query.resolved === "true" ? true : false,
        },
      }
    )
  )
    .then((data) => res.json(data.result.n))
    .catch((err) => console.log(err))
);

app.get("/delete", (req, res) =>
  queryDB("bugs", (collection) => collection.deleteOne({ _id: req.query.id }))
    .then((data) => res.json(data.deletedCount))
    .catch((err) => console.log(err))
);

app.listen(4000, () => console.log("port 4000"));
