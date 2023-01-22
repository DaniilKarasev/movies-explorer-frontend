/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import Preloader from '../Preloader/Preloader';
import { useWindowWidth } from '../../customHooks/useWindowWidth';
import { movieNotFoundMessage } from '../../utils/constants';

const SavedMovies = ({
	handleOpenBurgerMenu,
	onChangeWindowWidth,
	onFilterMovieCards,
	onLoadingPartialCards,
	onChangeButtonVisible,
	loadMoreMoviesButtonVisible,
	savedMoviesList,
	onSavedMovieRemove,
	getSavedMoviesFromMoviesApi,
	apiErrorMessage,
	initialAmountCards,
	amountCardsForLoad,
	infoMessageHandler
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [savedShortMovieCheckbox, setSavedShortMovieCheckbox] = useLocalStorage(false, 'SavedShortMovieCheckbox');
	const [savedMoviesFilterQuery, setSavedMoviesFilterQuery] = useLocalStorage('', 'SavedMoviesFilterQuery');
	const [filteredSavedMovies, setFilteredSavedMovies] = useLocalStorage([], 'SavedFilteredMovies');
	const [returnedCards, setReturnedCards] = useState([]);
	const [moviesMessageVisible, setMoviesMessageVisible] = useState(false);
	const [moviesNotFoundMessage, setMoviesNotFoundMessage] = useState('');
	const windowWidth = useWindowWidth();

	const handleFilterQueryChange = (query) => {
		setSavedMoviesFilterQuery(query);
		if (query === '') {
			infoMessageHandler('Нужно ввести ключевое слово')
		} else {
			if (!savedMoviesFilterQuery && savedMoviesList.length === 0) {
				getSavedMoviesFromMoviesApi();
			}
		}
	}

	const handleFilterDurationChange = () => {
		setSavedShortMovieCheckbox(!savedShortMovieCheckbox);
	}

	function onLoadMoreCards() {
		setReturnedCards(onLoadingPartialCards(filteredSavedMovies, returnedCards.length + amountCardsForLoad));
	}

	useEffect(() => {
		setMoviesMessageVisible(true);
	}, [moviesNotFoundMessage, apiErrorMessage])

	useEffect(() => {
		if (filteredSavedMovies.length !== 0) {
			setSavedShortMovieCheckbox(false)
			setSavedMoviesFilterQuery('')
			getSavedMoviesFromMoviesApi();
		} else {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (savedMoviesList.length > 0) {
			setFilteredSavedMovies(savedMoviesList);
		} else {
			setMoviesNotFoundMessage(movieNotFoundMessage);
			setMoviesMessageVisible(true);
		}
		setIsLoading(false);
	}, [savedMoviesList]);

	useEffect(() => {
		if (savedMoviesFilterQuery !== '') {
			setFilteredSavedMovies(onFilterMovieCards(savedMoviesList, savedMoviesFilterQuery, savedShortMovieCheckbox));
		}

	}, [savedMoviesFilterQuery]);

	useEffect(() => {
		setFilteredSavedMovies(onFilterMovieCards(savedMoviesList, savedMoviesFilterQuery, savedShortMovieCheckbox));
	}, [savedShortMovieCheckbox]);

	useEffect(() => {
		setMoviesMessageVisible(false);
		if (filteredSavedMovies.length === 0 & savedMoviesFilterQuery !== '') {
			setMoviesNotFoundMessage(movieNotFoundMessage);
			setMoviesMessageVisible(true);
		}
		setReturnedCards(onLoadingPartialCards(filteredSavedMovies, initialAmountCards));
	}, [filteredSavedMovies]);

	useEffect(() => {
		onChangeButtonVisible(filteredSavedMovies, returnedCards, initialAmountCards);
	}, [returnedCards]);

	useEffect(() => {
		onChangeWindowWidth(windowWidth);
	}, [windowWidth]);

	useEffect(() => {
		if (initialAmountCards > returnedCards.length) {
			setReturnedCards(onLoadingPartialCards(filteredSavedMovies, initialAmountCards));
		}
	}, [initialAmountCards]);

	return (
		<>
			<Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} />
			<main className='main'>
				<SearchForm
					onFilterQueryChange={handleFilterQueryChange}
					filterQueryValue={savedMoviesFilterQuery}
					isLoading={isLoading}
					onMovieCheckboxChange={handleFilterDurationChange}
					shortMovieCheckboxChecked={savedShortMovieCheckbox}
				/>

				{isLoading ? (
					<Preloader />
				) : (
					<MoviesCardList
						onSavedMoviesPage={true}
						onLoadMoreButtonClick={onLoadMoreCards}
						loadMoreMoviesButtonVisible={loadMoreMoviesButtonVisible}
						moviesMessageVisible={moviesMessageVisible}
						moviesMessage={moviesNotFoundMessage}
						apiErrorMessage={apiErrorMessage}
					>
						{returnedCards.map((movie) => {
							return (
								<MoviesCard
									movie={movie}
									onMovieRemove={onSavedMovieRemove}
									key={`${movie._id}`}
									saved={true}
								/>
							)
						})}
					</MoviesCardList>
				)
				}
			</main>
			<Footer />
		</>
	);
};

export default SavedMovies;