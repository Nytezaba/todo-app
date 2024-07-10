const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
    dbName: "myMockDb"
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`server listening on port ${PORT}`);
});
