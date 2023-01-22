import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import BurgerMenuButton from '../BurgerMenuOpenButton/BurgerMenuOpenButton';
import './Header.css';

const Header = ({
	handleOpenBurgerMenu,
	theme
}) => {
	const currentUser = useContext(CurrentUserContext);

	return (
		<header className={`header ${theme ? `header_theme_${theme}` : ``}`}>
			<div className="header__nav-wrapper">
				<Logo />
				{currentUser.email ? (
					<nav className='header__nav'>
						<ul className='header__nav-list'>
							<li>
								<NavLink to='/movies' className={`header__link header__nav-item ${theme ? `header_theme_${theme}` : ``}`}>Фильмы</NavLink>
							</li>
							<li>
								<NavLink to='/saved-movies' className={`header__link header__nav-item ${theme ? `header_theme_${theme}` : ``}`}>Сохранённые фильмы</NavLink>
							</li>
						</ul>
					</nav>
				) : (<></>)}
			</div>
			{currentUser.email ? (
				<>
					<div className='header__profile-container header__profile-button'>
						<Link to='/profile' className='header__link header__profile-button-text'>{currentUser.email}</Link>
						<Link to='/profile' className='header__link button_placed_profile-container'></Link>
					</div>
					<BurgerMenuButton handleOpenBurgerMenu={handleOpenBurgerMenu} theme={theme} />
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