import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../utils/constants';

const Movies = ({
	handleOpenBurgerMenu
}) => {
	return (
		<>
			<Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} theme='white' />
			<SearchForm />
			<MoviesCardList moviesList={movies} />
			<Footer />
		</>
	);
};

export default Movies;