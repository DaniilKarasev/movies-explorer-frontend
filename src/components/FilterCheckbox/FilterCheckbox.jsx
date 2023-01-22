import React from 'react';
import './FilterCheckbox.css'

const FilterCheckbox = ({
  shortMovieCheckboxChecked,
  onMovieCheckboxChange,
  isLoading
}) => {

  return (
    <div className='searchForm__checkbox-container'>
      <label className={`searchForm__checkbox-switcher ${isLoading ? `searchForm__switcher_disabled` : ''}`} >
        <input 
          type='checkbox' 
          className='searchForm__checkbox-toggle'
          onChange={() => onMovieCheckboxChange(!shortMovieCheckboxChecked)}
          disabled={isLoading}
          checked={shortMovieCheckboxChecked}
        />
        <span className={`searchForm__checkbox-toggle-slider ${isLoading ? `searchForm__toggle-slider_disabled` : ''}`}></span>
      </label>
      <label className={`searchForm__checkbox-switcher-label ${isLoading ? `searchForm__switcher-label_disabled` : ''}`} htmlFor='filter-checkbox__toggle'>Короткометражки</label>
    </div>
  );
};

export default FilterCheckbox;