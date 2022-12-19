import { SearchBar, SearchForm, Button, Input } from './Searchbar.styled';
import { RxMagnifyingGlass } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { useState } from 'react';
export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    onSubmit(searchName);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleFormSubmit}>
        <Button type="submit">
          <RxMagnifyingGlass size={24} />
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchName}
        />
      </SearchForm>
    </SearchBar>
  );
};
SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
