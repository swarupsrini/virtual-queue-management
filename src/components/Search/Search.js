/* 
Search: Used to represent a search bar, with filtering capabilities

filterClick: filterClick call-back function (not yet implemented)
searchClick: searchClick call-back function (not yet implemented)

Example: <Search filterClick= {filterClick}, searchClick = {searchClick}/>
*/

import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';

export default function Search(props) {
  /*
  const [favorited, setFavorited] = useState(true);
  
  function favoriteClick(e) {
    setFavorited(!favorited);
  }
  
  state={}

  function updateSearch(e){
    this.setState({text:e.target.value})
    console.log("a")
  }*/
  
  return (
    <div>
      <TextField label="Search" variant="outlined" size="small" /*onChange={this.updateSearch}*/></TextField>
      <IconButton>
        <SearchIcon size="medium"></SearchIcon>
      </IconButton>
      <IconButton>
        <FilterList size="medium"></FilterList>
      </IconButton>
    </div>
  );
}