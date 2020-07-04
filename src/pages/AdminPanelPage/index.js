import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Popover,
  List,
  ListItem,
  ListItemSecondaryAction,
  Switch,
  ListItemText,
  Typography,
  GridList,
  GridListTile,
} from "@material-ui/core";
import AdminCard from "../../components/AdminCard";
import Header from "../../components/Header";
import Search from "../../components/Search";
import { useStyles } from "./styles";

function getStores() {
  // Get stores from server
  // code below requires backend call
  return [
    {
      name: "Walmart",
      address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
      latitude: 43.7763,
      longitude: -79.25802,
      wait: 12,
      ID: 0,
      isVerified: true,
    },
    {
      name: "No Frills",
      address: "4473 Kingston Rd, Scarborough, ON M1E 2N7",
      latitude: 43.76984,
      longitude: -79.18742,
      ID: 1,
      wait: 9,
      isVerified: false,
    },
    {
      name: "FreshCo",
      address: "650 Kingston Rd, Pickering, ON L1V 1A6",
      latitude: 43.81807,
      longitude: -79.11887,
      ID: 2,
      wait: 24,
      isVerified: true,
    },
    {
      name: "Walmart",
      address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
      latitude: 43.7763,
      longitude: -79.25802,
      wait: 100,
      ID: 4,
      isVerified: false,
    },

    {
      name: "Grocery Store",
      address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
      latitude: 43.7763,
      longitude: -79.25802,
      wait: 12,
      ID: 5,
      isVerified: true,
    },
    {
      name: "Shop Store",
      address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
      latitude: 43.7763,
      longitude: -79.25802,
      wait: 12,
      ID: 6,
      isVerified: true,
    },
  ];
}

function getUsers() {
  // Below is mock code for backend call that returns list of users and their info
  return [
    { name: "hemantb3434", ID: 11 },
    { name: "swarupsrini", ID: 12 },
    { name: "jasonconte131", ID: 13 },
  ];
}

function editStoreData(store) {
  // Backend call update the admin's currently editing state
}

function editUserData(user) {
  // Backend call update the admin's currently editing state
}

export default function AdminPanelPage(props) {
  const [anchor, setAnchor] = useState(null);
  const [text] = useState("");
  const [showUsers, setShowUsers] = useState(true);
  const [showStores, setShowStores] = useState(true);

  const [users, setUsers] = useState(getUsers());
  const [stores, setStores] = useState(getStores());
  const classes = useStyles();

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {}, [showUsers, showStores]);

  function searchBarClicked(query) {
    if (query === "") {
      setStores(getStores());
      setUsers(getUsers());
    } else {
      if (!isNaN(query)) {
        const result = [];
        const stores = getStores();
        searchArrayID(stores, query) &&
          result.push(searchArrayID(stores, query));
        result.length === 1 && setStores(result);
        if (result.length === 0) {
          const users = getUsers();
          searchArrayID(users, query) &&
            result.push(searchArrayID(users, query));
          result.length === 1 && setUsers(result);
        }
        result.length === 0 && setUsers([]);
        result.length === 0 && setStores([]);
      } else {
        const storeResult = searchArrayNames(getStores(), query);
        const userResult = searchArrayNames(getUsers(), query);
        setStores(storeResult);
        setUsers(userResult);
      }
    }
  }

  function searchArrayNames(listToSearchFrom, query) {
    const result = [];
    for (let i = 0; i < listToSearchFrom.length; i++) {
      if (
        listToSearchFrom[i].name.toLowerCase().includes(query.toLowerCase())
      ) {
        result.push(listToSearchFrom[i]);
      }
    }
    return result;
  }

  function searchArrayID(listToSearchFrom, query) {
    for (let i = 0; i < listToSearchFrom.length; i++) {
      if (parseInt(query) === listToSearchFrom[i].ID) {
        return listToSearchFrom[i];
      }
    }
    return;
  }

  return (
    <div>
      {redirect && <Redirect to={redirect} />}
      <Header></Header>
      <div className={classes.search}>
        <Search
          filterClick={(e) => {
            setAnchor(e.currentTarget);
          }}
          searchClick={searchBarClicked}
          text={text}
        />
      </div>

      {showStores && (
        <div className={classes.display}>
          <Typography variant="h4">Stores</Typography>
          <br></br>
          <GridList
            cellHeight={210}
            className={classes.gridList}
            cols={0}
            spacing={15}
          >
            {stores.map((store) => (
              <GridListTile key={store.ID} className={classes.tile}>
                <AdminCard
                  title={store.name}
                  subtitle={"Store ID: " + store.ID}
                  editClick={() => {
                    editStoreData(store);
                    setRedirect("/settings");
                  }}
                  address={store.address}
                ></AdminCard>
              </GridListTile>
            ))}
          </GridList>
        </div>
      )}

      {showUsers && (
        <div className={classes.display}>
          <Typography variant="h4">Users</Typography>
          <br></br>
          <GridList
            cellHeight={210}
            className={classes.gridList}
            cols={0}
            spacing={15}
          >
            {users.map((user) => (
              <GridListTile key={user.ID} className={classes.tile}>
                <AdminCard
                  title={user.name}
                  subtitle={"User ID: " + user.ID}
                  editClick={() => {
                    editUserData(user);
                    setRedirect("/settings");
                  }}
                  address=""
                ></AdminCard>
              </GridListTile>
            ))}
          </GridList>
        </div>
      )}

      <Popover
        id={"popover"}
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List className={classes.popup}>
          <ListItem>
            <Typography variant="h4">Filter</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Show users" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                edge="end"
                onChange={() => {
                  setShowUsers((prev) => !prev);
                }}
                checked={showUsers}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Show stores" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                edge="end"
                onChange={() => {
                  setShowStores((prev) => !prev);
                }}
                checked={showStores}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
