import React from 'react';

import './TechsItem.css'

const TechsItem = ({
	name = ''
}) => {
	return (
		<li className='techs__list-item'>
			<span className='techs__list-item-name'>
				{name}
			</span>
		</li>
	);
};

export default TechsItem;