import { useState, useEffect} from 'react';
import Section from '../Section/Section';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchButton from '../../images/search/seacrh.svg';
import './SearchForm.css';

const SearchForm = ({
  onFilterQueryChange,
  filterQueryValue,
  isLoading,
  onMovieCheckboxChange,
  shortMovieCheckboxChecked,
}) => {
  const [query, setQuery] = useState(filterQueryValue)
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterQueryChange(query);
  }

  useEffect(() => {
    setQuery(filterQueryValue)
  }, [filterQueryValue])

  return (
    <Section sectionName='search-form' >
      <form 
        className='search-form__search-bar-wrapper'
        onSubmit={handleSubmit}
      >
        <div className='search-form__search-bar'>
          <input 
            type='text'
            className='search-form__input' 
            placeholder='Фильм' 
            onChange={(e) => setQuery(e.target.value)}
            value={query ?? ''}
            disabled={isLoading}
          />
          <Button 
            type='submit'
            className='button button button_placed_search-bar'
            isDisabled={isLoading}
          ><img src={searchButton} alt="search" /></Button>
        </div>
        <FilterCheckbox 
          shortMovieCheckboxChecked={shortMovieCheckboxChecked}
          onMovieCheckboxChange={onMovieCheckboxChange}
          isLoading={isLoading}
        />
      </form>
    </Section>
  );
};

export default SearchForm;