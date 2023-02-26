/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
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
	handleMovieLike,
	handleMovieDislike,
	handleChangeAmountMovies,
	handleFilterMovies,
	handleLoadingMovies,
	handleChangeMoreBtnVisible,
	IsMoreMovieBtnVisible,
	savedMoviesList,
	amountMoviesOnLoad,
	amountMoviesForLoad,
	infoMessageHandler
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isFilterActive, setIsFilterActive] = useLocalStorage(false, 'isFilterActive');
	const [filterQuery, setFilterQuery] = useLocalStorage('', 'FilterQuery');
	const [moviesList, setMoviesList] = useLocalStorage([], 'MoviesList');
	const [filteredMovies, setFilteredMovie] = useLocalStorage([], 'FilteredMovies');
	const [returnedMovies, setReturnedMovies] = useState([]);
	const [moviesMessageVisible, setMoviesMessageVisible] = useState(false);
	const [moviesMessage, setMoviesMessage] = useState(movieNotFoundMessage);
	const windowWidth = useWindowWidth();

	const handleChangeFilterQuery = async (query) => {
		setFilterQuery(query);
		if (!filterQuery && moviesList.length === 0) {
			await getMovies();
		}
		if (query === '') {
			infoMessageHandler('Нужно ввести ключевое слово')
		}
	}

	const handleChangeFilterStatus = async () => {
		await setIsFilterActive(!isFilterActive);
	}

	async function getMovies() {
		try {
			setIsLoading(true);
			const movies = await moviesApi.getMovies();
			setMoviesList(movies);
		} catch (err) {
			setFilterQuery('');
			setIsLoading(false);
			setMoviesMessage(movieLoadErrorMessage);
			setMoviesMessageVisible(true);
		}
	}

	async function loadMoreMovies() {
        const newCards = filteredMovies.slice(returnedMovies.length, returnedMovies.length + amountMoviesForLoad);
        await setReturnedMovies([...returnedMovies, ...newCards]);
    }

	useEffect(() => {
		if (moviesList.length === 0) {
			getMovies();
		} else {
			setIsLoading(false);
		}
	}, [moviesList.length]);

	useEffect(() => {
		if (moviesList.length > 0) {
			setFilteredMovie(handleFilterMovies(moviesList, filterQuery, isFilterActive));
			setIsLoading(false);
		}
	}, [moviesList, filterQuery, isFilterActive]);

	useEffect(() => {
		if (filterQuery !== '') {
			setFilteredMovie(handleFilterMovies(moviesList, filterQuery, isFilterActive));
		}
	}, [filterQuery, isFilterActive]);

	useEffect(() => {
		if (filterQuery) {
			const filteredMovies = handleFilterMovies(moviesList, filterQuery, isFilterActive);
			setFilteredMovie(filteredMovies);
		}
	}, [filterQuery, isFilterActive]);

	useEffect(() => {
        handleChangeAmountMovies(windowWidth);
    }, [windowWidth, handleChangeAmountMovies]);

	useEffect(() => {
		handleChangeMoreBtnVisible(filteredMovies, returnedMovies, amountMoviesOnLoad);
	}, [filteredMovies, returnedMovies, amountMoviesOnLoad]);

	useEffect(() => {
        setMoviesMessageVisible(false);
        if (filteredMovies.length === 0 & filterQuery !== '') {
            setMoviesMessage(movieNotFoundMessage);
            setMoviesMessageVisible(true);
        }
        if (filteredMovies.length === 0 & !moviesList.length) {
            setMoviesMessageVisible(false);
        }
        setReturnedMovies(handleLoadingMovies(filteredMovies, amountMoviesOnLoad));
    }, [filteredMovies, filterQuery, moviesList]);

	useEffect(() => {
		if (amountMoviesOnLoad > returnedMovies.length) {
			setReturnedMovies(handleLoadingMovies(filteredMovies, amountMoviesOnLoad));
		}
	}, [amountMoviesOnLoad, returnedMovies.length]);

	return (
		<>
			<Header
				handleOpenBurgerMenu={handleOpenBurgerMenu}
			/>
			<main className='main'>
				<SearchForm
					handleChangeFilterQuery={handleChangeFilterQuery}
					filterQueryValue={filterQuery}
					isLoading={isLoading}
					handleChangeFilterStatus={handleChangeFilterStatus}
					isFilterActive={isFilterActive}
				/>
				{isLoading ? (
					<Preloader />
				) : (
					<MoviesCardList
						loadMoreMovies={loadMoreMovies}
						IsMoreMovieBtnVisible={IsMoreMovieBtnVisible}
						moviesMessageVisible={moviesMessageVisible}
						moviesMessage={moviesMessage}
					>
						{returnedMovies.map((movie) => {
							let liked = false
							if (savedMoviesList.filter(savedMovie => savedMovie.movieId === movie.id).length !== 0) {
								liked = true
							}
							return (
								<MoviesCard
									movie={movie}
									handleMovieLike={handleMovieLike}
									handleMovieDislike={handleMovieDislike}
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