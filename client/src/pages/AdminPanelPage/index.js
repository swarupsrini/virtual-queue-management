import React, { useState, useEffect } from "react";
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
import UserSettingsPopup from "../../components/UserSettingsPopup";
import StoreSettingsPopup from "../../components/StoreSettingsPopup";
import useStyles from "./styles";
import { getAllStores, getAllUsers } from "../../utils/actions";

// function getStores() {
//   // Get stores from server
//   // code below requires backend call
//   return [
//     {
//       name: "Walmart",
//       address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
//       latitude: 43.7763,
//       longitude: -79.25802,
//       wait: 12,
//       ID: 0,
//       isVerified: true,
//     },
//     {
//       name: "No Frills",
//       address: "4473 Kingston Rd, Scarborough, ON M1E 2N7",
//       latitude: 43.76984,
//       longitude: -79.18742,
//       ID: 1,
//       wait: 9,
//       isVerified: false,
//     },
//     {
//       name: "FreshCo",
//       address: "650 Kingston Rd, Pickering, ON L1V 1A6",
//       latitude: 43.81807,
//       longitude: -79.11887,
//       ID: 2,
//       wait: 24,
//       isVerified: true,
//     },
//     {
//       name: "Walmart",
//       address: "3850 Sheppard Ave E, Scarborough, ON M1T 3L3",
//       latitude: 43.7843507,
//       longitude: -79.2933375,
//       wait: 100,
//       ID: 4,
//       isVerified: false,
//     },
//     {
//       name: "Grocery Store",
//       address: "380 Borough Dr Unit 363125, Scarborough, ON M1P 212",
//       latitude: 43.7763,
//       longitude: -79.25802,
//       wait: 12,
//       ID: 5,
//       isVerified: true,
//     },
//     {
//       name: "Shop Store",
//       address: "222 Borough Dr Unit 12, Scarborough, ON M1P 654",
//       latitude: 43.7763,
//       longitude: -79.25802,
//       wait: 12,
//       ID: 6,
//       isVerified: true,
//     },
//   ];
// }

// function getUsers() {
//   // Below is mock code for backend call that returns list of users and their info
//   return [
//     { name: "hemantb3434", ID: 11 },
//     { name: "swarupsrini", ID: 12 },
//     { name: "jasonconte131", ID: 13 },
//   ];
// }

export default function AdminPanelPage(props) {
  const [anchor, setAnchor] = useState(null);
  const [text, setText] = useState("");
  const [showUsers, setShowUsers] = useState(true);
  const [showStores, setShowStores] = useState(true);

  const [showUserSettings, setShowUserSettings] = useState(false);
  const [showStoreSettings, setShowStoreSettings] = useState(false);

  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getAllStores()
      .then((allStores) => {
        return allStores.json();
      })
      .then((allStores) => {
        return [
          new Promise((resolve) => {
            resolve(allStores);
          }),
          getAllUsers(),
        ];
      })
      .then((arr) => {
        return Promise.all(arr);
      })
      .then(([allStores, allUsers]) => {
        return [
          new Promise((resolve) => {
            resolve(allStores);
          }),
          allUsers.json(),
        ];
      })
      .then((arr) => {
        return Promise.all(arr);
      })
      .then(([allStores, allUsers]) => {
        let resultStores = [];
        let resultUsers = [];
        if (text === "") {
          resultStores = allStores;
          resultUsers = allUsers;
        } else {
          allStores.map((temp) => {
            if (
              temp.name.toLowerCase().includes(text.toLowerCase()) ||
              temp._id.includes(text)
            ) {
              resultStores.push(temp);
            }
          });
          allUsers.map((temp) => {
            if (
              temp.username.toLowerCase().includes(text.toLowerCase()) ||
              temp._id.includes(text)
            ) {
              resultUsers.push(temp);
            }
          });
        }
        setStores(resultStores);
        setUsers(resultUsers);
      });
  }, [text, showUsers, showStores]);

  function editStoreData(store) {
    setShowStoreSettings(store);
  }

  function editUserData(user) {
    setShowUserSettings(user);
  }

  return (
    <div>
      <Header />
      {showUserSettings && (
        <UserSettingsPopup
          id={showUserSettings._id}
          isAdmin={true}
          close={() => setShowUserSettings(false)}
        />
      )}
      {showStoreSettings && (
        <StoreSettingsPopup
          id={showStoreSettings._id}
          isAdmin={true}
          close={() => setShowStoreSettings(false)}
        />
      )}
      <div className={classes.search}>
        <Search
          filterClick={(e) => {
            setAnchor(e.currentTarget);
          }}
          searchClick={setText}
          clearClick={() => {
            setText("");
          }}
          onChangedSync={(e) => setText(e)}
          text={text}
        />
      </div>

      {showStores && (
        <div className={classes.display}>
          <Typography variant="h4">Stores</Typography>
          <br></br>
          <GridList
            cellHeight={220}
            className={classes.gridList}
            cols={0}
            spacing={15}
          >
            {stores.map((store, i) => (
              <GridListTile key={i} className={classes.tile}>
                <AdminCard
                  title={store.name}
                  subtitle={"Store ID: " + store._id}
                  editClick={() => {
                    editStoreData(store);
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
            cellHeight={220}
            className={classes.gridList}
            cols={0}
            spacing={15}
          >
            {users.map((user, i) => (
              <GridListTile key={i} className={classes.tile}>
                <AdminCard
                  title={user.username}
                  subtitle={"User ID: " + user._id}
                  editClick={() => {
                    editUserData(user);
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
