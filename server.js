/* server.js - Express server*/
"use strict";
const log = console.log;
log("Express server");

const express = require("express");
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false); // for some deprecation issues
const cors = require("cors");
const app = express();
// CORS for React back-end
// REMOVE OPTIONS IN CORS CALL IF BUILDING
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// import mongoose models
const { Store } = require("./models/store");
const { User, Employee, Owner } = require("./models/user");
const { Event } = require("./models/events");
const { getLatLong, getDistance } = require("./third-party-api");
const { ObjectID } = require("mongodb");
const {
  getStoreByID,
  getAllStores,
  getAllUsers,
  getUserByID,
  getEventsByStoreID,
  updateUser,
  updateStore,
} = require("./basic._mongo");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Setting up a static directory for the files in /pub
app.use(express.static(__dirname + "/client/build"));

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*************************************************
 * Session Handling */
app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 4 * 60000,
      httpOnly: true,
      // secure: false,
    },
  })
);

// A route to login and create a session
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  log("login:", username, password);

  // Use the static method on the User model to find a user by their username and password
  User.findByUsernamePassword(username, password)
    .then((user) => {
      // Add the user's id to the session cookie.
      // We can check later if this exists to ensure we are logged in.
      req.session.user = user._id;
      req.session.username = user.username;
      req.session.__t = !user.__t ? "visitor" : user.__t.toLowerCase();
      res.send({
        currentUser: user.username,
        __t: req.session.__t,
      });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

// A route to logout a user
app.get("/logout", (req, res) => {
  log("logout");
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

// A route to check if a use is logged in on the session cookie
app.get("/check-session", (req, res) => {
  if (req.session.user) {
    res.send({ currentUser: req.session.username, __t: req.session.__t });
  } else {
    res.status(401).send();
  }
});

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

// session authentication middleware
const authenticate = (req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user)
      .then((user) => {
        if (!user) {
          return Promise.reject();
        } else {
          req.user = user;
          next();
        }
      })
      .catch((error) => {
        res.status(401).send("Unauthorized");
      });
  } else {
    res.status(401).send("Unauthorized");
  }
};

const userExists = (req, res, next) => {
  let invalid = false;
  User.findOne(
    {
      username: req.body.username,
    },
    (err, obj) => {
      if (obj !== null) {
        res.status(403).send(err);
        invalid = true;
      }
    }
  );
  if (!invalid) next();
};

/*************************************************/
// API Endpoints Below
app.post("/newCustomer", userExists, (req, res) => {
  log("new customer");
  const user = new User({
    password: req.body.password,
    email: req.body.email,
    username: req.body.username,
    phone_number: req.body.phone_number,
    fav_stores: [],
  });

  // Save the user
  user.save().then(
    (user) => {
      res.send({ _id: user._id });
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

app.post("/newOwner", userExists, (req, res) => {
  log("new owner");
  const user = new Owner({
    password: req.body.password,
    email: req.body.email,
    username: req.body.username,
    phone_number: req.body.phone_number,
    store_id: "",
  });

  // Save the user
  user.save().then(
    (user) => {
      res.send({ _id: user._id });
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

app.post("/newEmployee", userExists, (req, res) => {
  log("new employee");
  const user = new Employee({
    password: req.body.password,
    email: req.body.email,
    username: req.body.username,
    phone_number: req.body.phone_number,
    store_id: "",
  });

  // Save the user
  user.save().then(
    (user) => {
      res.send({ _id: user._id });
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
    lat: 100,
    long: 100,
    in_store: 0,
    open_time: req.body.open_time,
    close_time: req.body.close_time,
  });
  User.findById(req.body.owner_id).then((user) => {
    store.save().then(
      (store) => {
        user.store_id = store.id;
        user.save().catch((error) => res.status(500).send(error));
        res.send(store);
      },
      (error) => res.status(500).send(error)
    );
  });

  // getLatLong(req.body.address)
  //   .then((result) => {
  //     store.lat = result.lat;
  //     store.long = result.long;
  //     return User.findById(req.body.owner_id);
  //   })
  //   .then((user) => {
  //     store.save().then(
  //       (store) => {
  //         user.store_id = store.id;
  //         user.save().catch((error) => res.status(500).send(error));
  //         res.send(store);
  //       },
  //       (error) => res.status(500).send(error)
  //     );
  //   })
  //   .catch((error) => res.status(500).send(error));
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

app.get("/getAllStores", authenticate, (req, res) => {
  getAllStores(
    (result) => {
      res.send(result);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

app.get("/getAllUsers", authenticate, (req, res) => {
  getAllUsers(
    (result) => {
      res.send(result);
    },
    (error) => {
      res.status(400).send(error);
    }
  );
});

app.get("/getUserById", authenticate, mongoUserIDChecker, (req, res) => {
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

app.get("/getUserFavStores", authenticate, (req, res) => {
  getUserByID(
    (result) => {
      res.send(result.fav_stores);
    },
    (error) => {
      res.status(400).send(error);
    },
    req.session.user
  );
});

app.get("/getUserStoreId", authenticate, (req, res) => {
  getUserByID(
    (result) => {
      res.send(result.store_id);
    },
    (error) => {
      res.status(400).send(error);
    },
    req.session.user
  );
});

app.post(
  "/updateUserFavStores",
  authenticate,
  mongoStoreIDChecker,
  (req, res) => {
    User.findById(req.session.user)
      .then((rest) => {
        if (!rest) {
          res.status(404).send("Resource not found");
        } else {
          if (req.query.bool === "true") {
            rest.fav_stores.push(req.query.store_id);
          } else if (req.query.bool === "false") {
            rest.fav_stores.pull(req.query.store_id);
          }
          rest.save();
          res.send(rest.fav_stores);
        }
      })
      .catch((error) => {
        res.status(400).send("Bad Request");
      });
  }
);

app.get("/getStoreById", authenticate, mongoStoreIDChecker, (req, res) => {
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

app.get("/getUserStore", authenticate, (req, res) => {
  User.findById(req.session.user)
    .then((user) => {
      if (user.store_id === "") res.send({ user });
      else {
        Store.findById(user.store_id)
          .then((store) => res.send({ user, store }))
          .catch((e) => res.status(400).send(e));
      }
    })
    .catch((e) => res.status(400).send(e));
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

app.get(
  "/getEventsByStoreId",
  authenticate,
  mongoStoreIDChecker,
  (req, res) => {
    getEventsByStoreID(
      (result) => {
        res.send(result);
      },
      (error) => {
        res.status(400).send(error);
      },
      req.query.store_id
    );
  }
);

app.patch("/updateUser", userExists, (req, res) => {
  const username = req.session.user;
  const password = req.body.password;
  User.findByUsernamePassword(username, password)
    .then((user) => {
      /*updateUser(
        () => {},
        (error) => {
          res.status(400).send(error);
        },
        req.session.user,
        req.body
      );*/
    })
    .catch((error) => {
      res.status(400).send();
    });
  
  /*
  getUserByID(
    (result) => {
      res.send(result);
    },
    (error) => {
      res.status(400).send(error);
    },
    req.session.user
  );*/
});

app.patch("/updateStore", (req, res) => {
  updateStore(
    () => {},
    (error) => {
      res.status(400).send(error);
    },
    req.query.store_id,
    req.body
  );
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

app.get("/getCurrentUser", authenticate, (req, res) => {
  getUserByID(
    (result) => {
      res.send({
        id: result.id,
        username: result.username,
        email: result.email,
        phone_number: result.phone_number,
        fav_stores: result.fav_stores
      });
    },
    (error) => {
      res.status(400).send(error);
    },
    req.session.user
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
