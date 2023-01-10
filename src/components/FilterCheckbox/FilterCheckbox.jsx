import React from 'react';

import './FilterCheckbox.css'

const FilterCheckbox = () => {
	return (
		<div className='searchForm__checkbox-container'>
			<label className="searchForm__checkbox-switcher"  >
				<input type='checkbox' className='searchForm__checkbox-toggle' />
				<span className="searchForm__checkbox-toggle-slider"></span>
			</label>
			<label className="searchForm__checkbox-switcher-label" htmlFor='searchForm__checkbox-toggle'>Короткометражки</label>
		</div>
	);
};

export default FilterCheckbox;