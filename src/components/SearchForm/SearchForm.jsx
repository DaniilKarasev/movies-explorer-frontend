import React from 'react';
import Section from '../Section/Section';

import './SearchForm.css'
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchButton from '../../images/search/seacrh.svg';

const SearchForm = () => {
	return (
		<Section theme='dark' sectionName='search-form' >
			<form className='search-form__search-bar-wrapper'>
				<div className='search-form__search-bar'>
					<input type='text' className='search-form__input' placeholder='Фильм' required={true} />
					<Button type='submit' className='button button button_placed_search-bar'><img src={searchButton} alt="" /></Button>
				</div>
				<FilterCheckbox checked={false} />
			</form>
		</Section>
	);
};

export default SearchForm;