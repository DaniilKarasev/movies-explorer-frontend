import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';
import Logo from '../Logo/Logo';
import BurgerMenuButton from '../BurgerMenuButton/BurgerMenuButton';

const Header = ({
	loggedIn,
	handleOpenBurgerMenu,
	theme
}) => {
	return (
		<header className={`header ${theme ? `header_theme_${theme}` : ``}`}>
			<div className="header__nav-wrapper">
				<Logo />
				{loggedIn ? (
					<nav className='header__nav'>
						<ul className='header__nav-list'>
							<li>
								<NavLink to='/movies' className='header__link header__nav-item'>Фильмы</NavLink>
							</li>
							<li>
								<NavLink to='/saved-movies' className='header__link header__nav-item'>Сохранённые фильмы</NavLink>
							</li>
						</ul>
					</nav>
				) : (<></>)}
			</div>
			{loggedIn ? (
				<>
					<div className='header__profile-container header__profile-button'>
						<Link to='/profile' className='header__link header__profile-button-text'>Аккаунт</Link>
						<Link to='/profile' className='header__link button_placed_profile-container'></Link>
					</div>
					<BurgerMenuButton handleOpenBurgerMenu={handleOpenBurgerMenu} />
				</>
			) : (
				<div className='header__auth-container'>
					<Link to='/signup' className='header__link header__auth-signup'>Регистрация</Link>
					<Link to='/signin' className='header__link header__auth-signin button_placed_auth-container'>Войти</Link>
				</div>
			)}
		</header>
	);
};

export default Header;