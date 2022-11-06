const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();

const router = express.Router();
let corsOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET'
};
app.use(cors(corsOptions));

router.get("/", function (req, res) {
  fetch("https://zenquotes.io/api/random")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
