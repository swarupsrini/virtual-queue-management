/* 
Search: Used to represent a search bar, with filtering capabilities

filter: filterClick call-back function
search(query): search call-back function. Takes contents of search bar as parameter

Example: <Search filterClick= {filterClick}, searchClick = {searchClick}/>
*/

import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "white",
  },
}));

export default function Search(props) {
  const [text, setText] = useState()
  const classes = useStyles()
  function searchClick(e) {
    props.search(text)
  }

  return (
    <div>
      <TextField className={classes.input} label="Search" variant="outlined" size="small" onChange={(e) => setText(e.target.value)}></TextField>
      <IconButton onClick={searchClick}>
        <SearchIcon size="medium"></SearchIcon>
      </IconButton>
      <IconButton onClick={props.filterClick}>
        <FilterList size="medium"></FilterList>
      </IconButton>
    </div>
  );
}