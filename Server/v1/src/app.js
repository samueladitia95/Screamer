"use strict";

const express = require("express");
const { urlencoded, json } = express;
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
