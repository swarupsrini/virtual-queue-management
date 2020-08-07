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
app.use(express.static(path.join(__dirname, "client/public")));
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  // const goodPageRoutes = ["/", "/login", "/dashboard"];
  // if (!goodPageRoutes.includes(req.url)) {
  //   // if url not in expected page routes, set status to 404.
  //   res.status(404);
  // }

  // send index.html
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
  res.end();
});

// Let's make some express 'routes'
// Express has something called a Router, which
// takes specific HTTP requests and handles them
// based on the HTTP method and URL

// Let's make a route for an HTTP GET request to the

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
}); // localhost development port 5000  (http://localhost:5000)
