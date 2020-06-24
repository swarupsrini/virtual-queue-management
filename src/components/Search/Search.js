import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';

class Search extends React.Component {
  render() {
    return (
      <div>
        <TextField label="Search" variant="outlined" size="small"></TextField>
        <IconButton>
          <SearchIcon size="medium"></SearchIcon>
        </IconButton>
        <IconButton>
          <FilterList size="medium"></FilterList>
        </IconButton>
      </div>
    );
  }
}
export default Search;