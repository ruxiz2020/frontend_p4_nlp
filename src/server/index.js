require("dotenv").config();
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const AYLIENTextAPI = require("aylien_textapi");
const config = require("../../webpack.dev");

const compiler = webpack(config);

const PORT = process.env.PORT || 8080;
const isDevEnvironment = process.env.NODE_ENV == "development";

const textapi = new AYLIENTextAPI({
  //application_id: process.env.APP_ID,
  //application_key: process.env.APP_KEY
  application_id: '1c2a5cee',
  application_key: 'dbe0bc117efc0fb04a36f80f87e4a23e'
});

const app = express();

app.use(express.json());

if (isDevEnvironment) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
}

if (!isDevEnvironment) app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.post("/sentiment", (req, res) => {
  const { url } = req.body;

  textapi.sentiment({ url }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(data);
  });
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
  console.log("Example app listening on port 8080!", process.env.NODE_ENV);
});
