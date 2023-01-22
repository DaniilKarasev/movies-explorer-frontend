/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect} from 'react';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { useWindowWidth } from '../../customHooks/useWindowWidth';
import { moviesApi } from '../../utils/MoviesApi';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import {
	movieNotFoundMessage,
	movieLoadErrorMessage,
} from '../../utils/constants';


const Movies = ({
	handleOpenBurgerMenu,
	onMovieLike,
	onMovieDislike,
	onChangeWindowWidth,
	onFilterMovieCards,
	onLoadingPartialCards,
	onChangeButtonVisible,
	loadMoreMoviesButtonVisible,
	savedMoviesList,
	initialAmountCards,
	amountCardsForLoad,
	infoMessageHandler
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [shortMovieCheckbox, setShortMovieCheckbox] = useLocalStorage(false, 'ShortMovieCheckbox');
	const [filterQuery, setFilterQuery] = useLocalStorage('', 'FilterQuery');
	const [moviesList, setMoviesList] = useLocalStorage([], 'MoviesList');
	const [filteredMovies, setFilteredMovie] = useLocalStorage([], 'FilteredMovies');
	const [returnedCards, setReturnedCards] = useState([]);
	const [moviesMessageVisible, setMoviesMessageVisible] = useState(false);
	const [moviesMessage, setMoviesMessage] = useState(movieNotFoundMessage);
	const windowWidth = useWindowWidth();

	const handleFilterQueryChange = (query) => {
		setFilterQuery(query);
		if (!filterQuery && moviesList.length === 0) {
			getMoviesFromMoviesApi();
		}
		if (query === '') {
			infoMessageHandler('Нужно ввести ключевое слово')
		}
	}

	const handleFilterDurationChange = () => {
		setShortMovieCheckbox(!shortMovieCheckbox);
	}

	const getMoviesFromMoviesApi = () => {
		setIsLoading(true);
		moviesApi.getMovies()
			.then((movies) => {
				setMoviesList(movies);
			})
			.catch(err => {
				setFilterQuery('');
				setIsLoading(false);
				setMoviesMessage(movieLoadErrorMessage);
				setMoviesMessageVisible(true);
			})
	}

	useEffect(() => {
		if (moviesList.length === 0) {
			getMoviesFromMoviesApi();
		} else {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (moviesList.length > 0) {
			setFilteredMovie(onFilterMovieCards(moviesList, filterQuery, shortMovieCheckbox));
			setIsLoading(false);
		}
	}, [moviesList]);

	useEffect(() => {
		if (filterQuery !== '') {
			setFilteredMovie(onFilterMovieCards(moviesList, filterQuery, shortMovieCheckbox));
		}
	}, [filterQuery]);

	useEffect(() => {
		if (filterQuery !== '') {
			setFilteredMovie(onFilterMovieCards(moviesList, filterQuery, shortMovieCheckbox));
		}
	}, [shortMovieCheckbox]);

	useEffect(() => {
		onChangeWindowWidth(windowWidth);
	}, [windowWidth]);

	useEffect(() => {
		onChangeButtonVisible(filteredMovies, returnedCards, initialAmountCards);
	}, [returnedCards]);

	useEffect(() => {
		setMoviesMessageVisible(false);
		if (filteredMovies.length === 0 & filterQuery !== '') {
			setMoviesMessage(movieNotFoundMessage);
			setMoviesMessageVisible(true);
		}
		if (filteredMovies.length === 0 & moviesList.length === 0) {
			setMoviesMessageVisible(false);
		}
		setReturnedCards(onLoadingPartialCards(filteredMovies, initialAmountCards));
	}, [filteredMovies]);

	useEffect(() => {
		if (initialAmountCards > returnedCards.length) {
			setReturnedCards(onLoadingPartialCards(filteredMovies, initialAmountCards));
		}

	}, [initialAmountCards]);

	function onLoadMoreCards() {
		setReturnedCards(onLoadingPartialCards(filteredMovies, returnedCards.length + amountCardsForLoad));
	}

	return (
		<>
			<Header
				handleOpenBurgerMenu={handleOpenBurgerMenu}
			/>
			<main className='main'>
			<SearchForm
				onFilterQueryChange={handleFilterQueryChange}
				filterQueryValue={filterQuery}
				isLoading={isLoading}
				onMovieCheckboxChange={handleFilterDurationChange}
				shortMovieCheckboxChecked={shortMovieCheckbox}
			/>
			{isLoading ? (
				<Preloader />
			) : (
				<MoviesCardList
					onLoadMoreButtonClick={onLoadMoreCards}
					loadMoreMoviesButtonVisible={loadMoreMoviesButtonVisible}
					moviesMessageVisible={moviesMessageVisible}
					moviesMessage={moviesMessage}
				>
					{returnedCards.map((movie) => {
						let liked = false
						if (savedMoviesList.filter(savedMovie => savedMovie.movieId === movie.id).length !== 0) {
							liked = true
						}
						return (
							<MoviesCard
								movie={movie}
								onMovieLike={onMovieLike}
								onMovieDislike={onMovieDislike}
								key={`${movie.id}`}
								liked={liked}
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

export default Movies;