import React from 'react';

import './BurgerMenuButton.css'

const BurgerMenuOpenButton = ({
	className,
	handleOpenBurgerMenu
}) => {
	return (
		<div
			className={`burger-menu-button ${className ?? ``}`}
			onClick={handleOpenBurgerMenu}
		>
			<span className='burger-menu-button__line'></span>
			<span className='burger-menu-button__line'></span>
			<span className='burger-menu-button__line'></span>
		</div>
	);
};

export default BurgerMenuOpenButton;