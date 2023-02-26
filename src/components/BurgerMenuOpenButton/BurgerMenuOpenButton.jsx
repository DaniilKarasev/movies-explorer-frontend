import React from 'react';
import './BurgerMenuOpenButton.css'

const BurgerMenuOpenButton = ({
	theme,
	handleOpenBurgerMenu
}) => {
	return (
		<div
			className='burger-menu-button'
			onClick={handleOpenBurgerMenu}
		>
			<span className={`burger-menu-button__line ${theme ? `burger-menu-button__line_theme_${theme}` : ``}`}></span>
			<span className={`burger-menu-button__line ${theme ? `burger-menu-button__line_theme_${theme}` : ``}`}></span>
			<span className={`burger-menu-button__line ${theme ? `burger-menu-button__line_theme_${theme}` : ``}`}></span>
		</div>
	);
};

export default BurgerMenuOpenButton;