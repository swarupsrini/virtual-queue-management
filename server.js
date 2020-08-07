/* server.js - Express server*/
"use strict";
const log = console.log;
log("Express server");

const express = require("express");
const path = require("path");

const app = express();

// Setting up a static directory for the files in /pub
// using Express middleware.
// Don't put anything in /pub that you don't want the public to have access to!
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  // const goodPageRoutes = ["/", "/login", "/dashboard"];
  // if (!goodPageRoutes.includes(req.url)) {
  //   // if url not in expected page routes, set status to 404.
  //   res.status(404);
  // }

  // send index.html
  res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
