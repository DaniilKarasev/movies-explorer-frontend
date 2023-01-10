import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { savedMovies } from '../../utils/constants';

const SavedMovies = ({
	handleOpenBurgerMenu
}) => {
	return (
		<>
			<Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} theme='white' />
			<main className='main'>
				<SearchForm />
				<MoviesCardList moviesList={savedMovies} onSavedMoviesPage={true} />
			</main>
			<Footer />
		</>
	);
};

export default SavedMovies;