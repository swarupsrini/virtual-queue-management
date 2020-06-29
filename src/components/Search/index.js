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

export default function Search(props) {
  
  let state={
    text:""
  }

  function updateSearch(e){
    state.text = e.target.value
  }
  function searchClick(e){
    props.search(state.text)
  }
  
  return (
    <div>
      <TextField label="Search" variant="outlined" size="small" onChange={updateSearch}></TextField>
      <IconButton onClick={searchClick}>
        <SearchIcon size="medium"></SearchIcon>
      </IconButton>
      <IconButton onClick={props.filter}>
        <FilterList size="medium"></FilterList>
      </IconButton>
    </div>
  );
}