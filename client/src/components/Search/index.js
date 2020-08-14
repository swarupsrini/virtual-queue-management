/* 
Search: Used to represent a search bar, with filtering capabilities

filter: filterClick call-back function
search(query): search call-back function. Takes contents of search bar as parameter

Example: <Search filterClick= {filterClick}, searchClick = {searchClick}/>
*/

import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { FilterList, Clear } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";

import useStyles from "./styles";

export default function Search(props) {
  const classes = useStyles();

  return (
    <div>
      <TextField
        className={classes.input}
        value={props.text}
        label="Search"
        variant="outlined"
        size="small"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            props.searchClick(props.text);
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          // setText(e.target.value);
          props.onChangedSync(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                className={classes.button}
                disableRipple={true}
                onClick={props.clearClick}
              >
                <Clear size="small"></Clear>
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
      <IconButton onClick={() => props.searchClick(props.text)}>
        <SearchIcon size="medium"></SearchIcon>
      </IconButton>
      <IconButton onClick={(e) => props.filterClick(e)}>
        <FilterList size="medium"></FilterList>
      </IconButton>
    </div>
  );
}
