import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const CompanyFilter = (props) => {
  const menuItems = props.filterItems.map(item =>
    <MenuItem value={item}>{item}</MenuItem>,
  );
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <FormControl>
            <InputLabel htmlFor="business-type-filter">Business Type</InputLabel>
            <Select
              value={props.filter}
              onChange={props.handleFilterChange}
              label="Name"
              inputProps={{
                name: 'CompanyFilter',
                id: 'business-type-filter',
              }}
            >
              <MenuItem value="All" disabled selected="true">
              Business Type
              </MenuItem>
              <MenuItem value="All">
              All
              </MenuItem>
              {menuItems}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="company-filter-search">Search Companies</InputLabel>
            <Input
              id="company-filter-search"
              onChange={props.handleSearchBarChange}
              startAdornment={(
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
)}
            />
          </FormControl>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default CompanyFilter;
