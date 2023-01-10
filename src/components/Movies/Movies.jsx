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
			<main className='main'>
				<SearchForm />
				<MoviesCardList moviesList={movies} />
			</main>
			<Footer />
		</>
	);
};

export default Movies;