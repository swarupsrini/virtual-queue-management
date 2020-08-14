/* server.js - Express server*/
"use strict";
const log = console.log;
log("Express server");

const express = require("express");
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false); // for some deprecation issues
const cors = require("cors");
const app = express();

const { Store } = require("./models/store");
const { User } = require("./models/user");
const { Employee } = require("./models/user");
const { Owner } = require("./models/user");
const { Event } = require("./models/events");
const { getLatLong, getDistance } = require("./third-party-api");
const { ObjectID } = require("mongodb");
const {
  getStoreByID,
  getAllStores,
  getAllUsers,
  getUserByID,
  getEventsByStoreID,
} = require("./basic._mongo");
// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
// Setting up a static directory for the files in /pub
app.use(express.static(__dirname + "/client/build"));

/*************************************************/
// MiddleWares for checking Mongo Stuff

const mongoStoreIDChecker = (req, res, next) => {
  // check mongoose connection established.
  if (!ObjectID.isValid(req.query.store_id)) {
    res.status(500).send("Wrong Mongo ID");
    return;
  } else {
    next();
  }
};

const mongoUserIDChecker = (req, res, next) => {
  // check mongoose connection established.
  if (!ObjectID.isValid(req.query.user_id)) {
    res.status(500).send("Wrong Mongo ID");
    return;
  } else {
    next();
  }
};

/*************************************************/
// API Endpoints Below
app.post("/newCustomer", (req, res) => {
  const user = new User({
    password: req.body.password,
    email: req.body.email,
    username: req.body.username,
    phone_number: req.body.phone_number,
  });

  // Save the user
  user.save().then(
    (user) => {
      res.send(user);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

app.post("/newOwner", (req, res) => {
  const user = new Owner({
    password: req.body.password,
    email: req.body.email,
    username: req.body.username,
    phone_number: req.body.phone_number,
    store_id: req.body.store_id,
  });

  // Save the user
  user.save().then(
    (user) => {
      res.send(user);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

app.post("/newEmployee", (req, res) => {
  const user = new Employee({
    password: req.body.password,
    email: req.body.email,
    username: req.body.username,
    phone_number: req.body.phone_number,
    store_id: req.body.store_id,
  });

  // Save the user
  user.save().then(
    (user) => {
      res.send(user);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

app.post("/newStore", (req, res) => {
  // Create a new Store
  const store = new Store({
    name: req.body.name,
    address: req.body.address,
    verified: req.body.verified,
    owner_id: req.body.owner_id,
    employee_ids: [],
    lat: -1,
    long: -1,
    in_store: 0,
    open_time: req.body.open_time,
    close_time: req.body.close_time,
  });

  getLatLong(req.body.address)
    .then((result) => {
      store.lat = result.lat;
      store.long = result.long;

      store.save().then(
        (store) => {
          res.send(store);
        },
        (error) => {
          res.status(400).send(error); // 400 for bad request
        }
      );
    })
    .catch((error) => {
      store.save().then(
        (store) => {
          res.send(store);
        },
        (error) => {
          res.status(400).send(error); // 400 for bad request
        }
      );
    });
});

app.get("/getDistance", (req, res) => {
  const dist = getDistance(
    req.query.fromLat,
    req.query.fromLong,
    req.query.toLat,
    req.query.toLong
  );
  res.send(JSON.stringify({ dist: dist }));
});

app.get("/getAllStores", (req, res) => {
  getAllStores(
    (result) => {
      res.send(result);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

app.get("/getAllUsers", (req, res) => {
  getAllUsers(
    (result) => {
      res.send(result);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

app.get("/getUserById", mongoUserIDChecker, (req, res) => {
  getUserByID(
    (result) => {
      res.send(result);
    },
    (error) => {
      res.status(400).send(error);
    },
    req.query.user_id
  );
});

app.get("/getStoreById", mongoStoreIDChecker, (req, res) => {
  getStoreByID(
    (result) => {
      res.send(result);
    },
    (error) => {
      res.status(400).send(error);
    },
    req.query.store_id
  );
});

app.post("/newEvent", (req, res) => {
  // Create a new Event
  const event = new Event({
    store_id: req.body.store_id,
    user_id: req.body.user_id,
    entry_time: req.body.entry_time,
    exit_time: req.body.exit_time,
  });

  event.save().then(
    (event) => {
      res.send(event);
    },
    (error) => {
      res.status(400).send(error); // 400 for bad request
    }
  );
});

app.get("/getEventsByStoreId", mongoStoreIDChecker, (req, res) => {
  getEventsByStoreID(
    (result) => {
      res.send(result);
    },
    (error) => {
      res.status(400).send(error);
    },
    req.query.store_id
  );
});

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
