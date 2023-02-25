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
	handleChangeAmountMovies,
	handleFilterSavedMovies,
	handleLoadingMovies,
	handleChangeMoreBtnVisible,
	IsMoreMovieBtnVisible,
	savedMoviesList,
	handleRemoveMovieFromSaved,
	getSavedMovies,
	apiErrorMessage,
	amountMoviesOnLoad,
	amountMoviesForLoad,
	infoMessageHandler
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isFilterActive, setIsFilterActive] = useLocalStorage(false, 'isFilterActive');
	const [filterQuery, setFilterQuery] = useLocalStorage('', 'filterQuery');
	const [filteredMovies, setFilteredMovies] = useLocalStorage([], 'SavedFilteredMovies');
	const [returnedMovies, setReturnedMovies] = useState([]);
	const [moviesMessageVisible, setMoviesMessageVisible] = useState(false);
	const [moviesNotFoundMessage, setMoviesNotFoundMessage] = useState('');
	const windowWidth = useWindowWidth();

	const handleFilterQueryChange = async (query) => {
		setFilterQuery(query);
		if (query === '') {
			infoMessageHandler('Нужно ввести ключевое слово')
		} else {
			if (!filterQuery && savedMoviesList.length === 0) {
				await getSavedMovies();
			}
		}
	}

	const handleChangeFilterStatus = async () => {
		await setIsFilterActive(!isFilterActive);
	}

	async function loadMoreMovies() {
		await setReturnedMovies(handleLoadingMovies(filteredMovies, returnedMovies.length + amountMoviesForLoad));
	}

	useEffect(() => {
        setMoviesMessageVisible(true);
        if (moviesNotFoundMessage || apiErrorMessage) {
            setMoviesMessageVisible(true);
        }
    }, [moviesNotFoundMessage, apiErrorMessage])

	useEffect(() => {
        if (filteredMovies.length !== 0) {
            setIsFilterActive(false);
            setFilterQuery('');
            getSavedMovies()
                .then(() => setIsLoading(false))
                .catch(err => console.log(err));
        } else {
            setIsLoading(false);
        }
    }, []);

	useEffect(() => {
        if (savedMoviesList.length > 0) {
            setFilteredMovies(savedMoviesList);
            setIsLoading(false);
        } else {
            setMoviesNotFoundMessage(movieNotFoundMessage);
            setMoviesMessageVisible(true);
            setIsLoading(false);
        }
    }, [savedMoviesList]);

	useEffect(() => {
		if (filterQuery !== '') {
			const filteredMovies = handleFilterSavedMovies(savedMoviesList, filterQuery, isFilterActive);
			setFilteredMovies(filteredMovies);
		}
	}, [filterQuery]);

	useEffect(() => {
        setFilteredMovies(handleFilterSavedMovies(savedMoviesList, filterQuery, isFilterActive));
    }, [savedMoviesList, filterQuery, isFilterActive]);

	useEffect(() => {
        setMoviesMessageVisible(false);
        if (filteredMovies.length === 0 && filterQuery !== '') {
            setMoviesNotFoundMessage(movieNotFoundMessage);
            setMoviesMessageVisible(true);
        }
        setReturnedMovies(handleLoadingMovies(filteredMovies, amountMoviesOnLoad));
    }, [filteredMovies, filterQuery]);

	useEffect(() => {
		handleChangeMoreBtnVisible(filteredMovies, returnedMovies, amountMoviesOnLoad);
	}, [returnedMovies]);

	useEffect(() => {
		handleChangeAmountMovies(windowWidth);
	}, [windowWidth]);

	useEffect(() => {
		if (amountMoviesOnLoad > returnedMovies.length) {
			setReturnedMovies(handleLoadingMovies(filteredMovies, amountMoviesOnLoad));
		}
	}, [amountMoviesOnLoad]);

	return (
		<>
			<Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} />
			<main className='main'>
				<SearchForm
					handleFilterQueryChange={handleFilterQueryChange}
					filterQueryValue={filterQuery}
					isLoading={isLoading}
					handleChangeFilterStatus={handleChangeFilterStatus}
					isFilterActive={isFilterActive}
				/>

				{isLoading ? (
					<Preloader />
				) : (
					<MoviesCardList
						onSavedMoviesPage={true}
						loadMoreMovies={loadMoreMovies}
						IsMoreMovieBtnVisible={IsMoreMovieBtnVisible}
						moviesMessageVisible={moviesMessageVisible}
						moviesMessage={moviesNotFoundMessage}
						apiErrorMessage={apiErrorMessage}
					>
						{returnedMovies.map((movie) => {
							return (
								<MoviesCard
									movie={movie}
									handleDeleteMovieFromSaved={handleRemoveMovieFromSaved}
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