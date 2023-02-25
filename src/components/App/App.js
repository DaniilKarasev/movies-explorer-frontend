/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import PageNotFound from '../PageNotFound/PageNotFound'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { mainApi } from '../../utils/MainApi';
import {
	widthMax,
	widthRegular,
	widthTablet,
	widthMobile,
	movieLoadErrorMessage,
} from '../../utils/constants';
import './App.css';

function App() {
	const [loggedIn, setloggedIn] = useLocalStorage(false, 'loggedIn');
	const [currentUser, setCurrentUser] = useLocalStorage('', 'currentUser');
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
	const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
	const [IsMoreMovieBtnVisible, setIsMoreMovieBtnVisible] = useState(false);
	const [savedMoviesList, setSavedMoviesList] = useLocalStorage([], 'SavedMoviesList');
	const [amountMoviesOnLoad, setAmountMoviesOnLoad] = useState(12);
	const [amountMoviesForLoad, setAmountMoviesForLoad] = useState(3);
	const [apiErrorMessage, setApiErrorMessage] = useState('');
	const [isApiError, setIsApiError] = useState('');
	const [isApiErrorMessage, setIsApiMessage] = useState('');
	const navigate = useNavigate();

	async function apiErrorHandler(err) {
		if (err.status === 400) {
			await setIsApiError('Bad Request');
		}
		if (err.status === 403) {
			await setIsApiError('Forbidden');
		}
		if (err.status === 409) {
			await setIsApiError('Пользователь с таким email уже зарегистрирован');
		}
		if (err.status === 401) {
			await setIsApiError('Нет доступа');
		}
		if (err.status === 500) {
			await setIsApiError('Ошибка сервера');
		}
		if (err.status === 404) {
			await setIsApiError('Не найдено');
		}
		if (!err.status) {
			await setIsApiError('Ошибка');
		}
		await handleOpenErrorPopup();
	}

	const apiErrorMessageHandler = async (err) => {
		if (err.status === 400) {
			await setIsApiMessage('CastError');
		}
		if (err.status === 403) {
			await setIsApiMessage('ForbiddenError');
		}
		if (err.status === 409) {
			await setIsApiMessage('Пользователь с таким email уже зарегистрирован');
		}
		if (err.status === 401) {
			await setIsApiMessage('Не правильный email или пароль');
		}
		if (err.status === 500) {
			await setIsApiMessage('Ошибка сервера');
		}
		if (err.status === 404) {
			await setIsApiMessage('Не найдено');
		}
		if (!err.status) {
			await setIsApiMessage('Упс, что-то пошло не так. Попроуйте ещё раз.');
		}
	}

	const infoMessageHandler = async (message) => {
		await setIsApiError(message);
		await handleOpenErrorPopup();
	}

	const handleOpenBurgerMenu = async () => {
		setIsBurgerMenuOpen(!isBurgerMenuOpen);
		await closeErrorPopup();
	}

	const handleOpenErrorPopup = async () => {
		setIsErrorPopupOpen(!isErrorPopupOpen);
		await closeBurgerMenu();
	}

	const closeBurgerMenu = async () => {
		await setIsBurgerMenuOpen(false);
	}

	const closeErrorPopup = async () => {
		await setIsErrorPopupOpen(false);
	}

	const closeByEscape = useCallback(async (event) => {
		if (event.key === 'Escape') {
			await closeBurgerMenu();
			await closeErrorPopup();
			document.removeEventListener('keydown', closeByEscape);
		}
	}, [closeBurgerMenu, closeErrorPopup]);

	const closeByEscapeOverlayClick = useCallback(async (event) => {
		if (event.target.classList.contains('burger-menu_visible')) {
			await closeBurgerMenu();
		}
		if (event.target.classList.contains('error-popup_visible')) {
			await closeErrorPopup();
		}
	}, [closeBurgerMenu, closeErrorPopup]);

	const handleSignUp = async (data) => {
		setIsApiMessage('')
		try {
			await mainApi.signUp({ data })
			const res = await mainApi.signIn({ data })
			setloggedIn(true)
			setCurrentUser(res.data)
			navigate('/movies', { push: true })
		} catch (err) {
			apiErrorMessageHandler(err)
			throw err
		}
	}

	const handleSignIn = async (data) => {
		setIsApiMessage('');
		try {
			const res = await mainApi.signIn({ data });
			if (res.data) {
				setloggedIn(true);
				setCurrentUser(res.data);
				navigate('/movies', { push: true });
			}
		} catch (err) {
			apiErrorMessageHandler(err);
			throw err
		}
	};

	const handleLogout = async () => {
		try {
			await mainApi.logout();
			setloggedIn(false);
			setCurrentUser({});
			localStorage.clear();
			navigate('/', { replace: true });
		} catch (err) {
			apiErrorHandler(err);
		}
	}

	const handleUpdateUserInfo = async (name, email) => {
		try {
			setIsApiMessage('')
			const user = await mainApi.setUserInfo(name, email)
			setCurrentUser(user)
			infoMessageHandler('Профиль обновлен')
			return user
		} catch (err) {
			apiErrorMessageHandler(err)
			throw err
		}
	}

	const getSavedMovies = async () => {
		try {
			const movies = await mainApi.getSavedMovies();
			setApiErrorMessage('');
			setSavedMoviesList(movies);
		} catch (err) {
			setApiErrorMessage(movieLoadErrorMessage);
			console.error(err);
		}
	};

	const handleRemoveMovieFromSaved = async (movie) => {
		try {
			await handleDeleteMovieFromSaved(movie);
			const updatedSavedMovies = savedMoviesList.filter((el) => el._id !== movie._id);
			setSavedMoviesList(updatedSavedMovies);
		} catch (err) {
			console.log(err);
		}
	}

	async function handleMovieLike(movie) {
		try {
			const res = await mainApi.saveMovie(movie);
			setSavedMoviesList([...savedMoviesList, res]);
		} catch (err) {
			apiErrorHandler(err);
		}
	}

	async function handleMovieDislike(movie) {
		try {
			const [dislikedSavedMovie] = savedMoviesList.filter(savedMovie => savedMovie.movieId === movie.id)
			await mainApi.deleteMovie(dislikedSavedMovie._id);
		} catch (err) {
			apiErrorHandler(err);
			throw err;
		}
	}

	async function handleDeleteMovieFromSaved(movie) {
		return await mainApi.deleteMovie(movie._id);
	}

	async function handleChangeAmountMovies(windowWidth) {
		let amountMoviesOnLoad;
		let amountMoviesForLoad;
		if (windowWidth <= widthMobile.maxDisplayWidth) {
			amountMoviesOnLoad = widthMobile.amountMoviesOnLoad;
			amountMoviesForLoad = widthMobile.amountMoviesForLoad;
		} else if (windowWidth <= widthTablet.maxDisplayWidth) {
			amountMoviesOnLoad = widthTablet.amountMoviesOnLoad;
			amountMoviesForLoad = widthTablet.amountMoviesForLoad;
		} else if (windowWidth <= widthRegular.maxDisplayWidth) {
			amountMoviesOnLoad = widthRegular.amountMoviesOnLoad;
			amountMoviesForLoad = widthRegular.amountMoviesForLoad;
		} else {
			amountMoviesOnLoad = widthMax.amountMoviesOnLoad;
			amountMoviesForLoad = widthMax.amountMoviesForLoad;
		}
		await setAmountMoviesOnLoad(amountMoviesOnLoad);
		await setAmountMoviesForLoad(amountMoviesForLoad);
	}

	function handleFilterMovies(moviesList, filterQuery, filterCheckbox) {
		let filteredArray = [];

		if (filterQuery) {
			filteredArray = moviesList.filter(item => item.nameRU.toLowerCase().includes(filterQuery.toLowerCase()));
			if (filterCheckbox) {
				let filterDuration = 40;
				filteredArray = filteredArray.filter(item => item.duration <= filterDuration);
			}
		}

		return filteredArray;
	}

	function handleFilterSavedMovies(moviesList, filterQuery, filterCheckbox) {
		let filteredArray = [];
		let filterDuration = 40;
		if (filterQuery) {
			filteredArray = moviesList.filter(item => item.nameRU.toLowerCase().includes(filterQuery.toLowerCase()));
			if (filterCheckbox) {
				return filteredArray.filter(item => item.duration <= filterDuration);
			}
			return filteredArray
		}
		if (filterCheckbox) {
			return moviesList.filter(item => item.duration <= filterDuration);
		}
		return moviesList;
	}

	function handleLoadingMovies(arrayMoviesForLoad, moviesMustBeLoaded) {
		if (arrayMoviesForLoad.length <= moviesMustBeLoaded) {
			return arrayMoviesForLoad;
		} else {
			const arrayMoviesMustBeLoaded = arrayMoviesForLoad.slice(0, moviesMustBeLoaded)
			return arrayMoviesMustBeLoaded;
		}
	}

	async function handleChangeMoreBtnVisible(filteredMovies, returnedMovies, amountMoviesOnLoad) {
		const hasMoreMovies = filteredMovies.length > amountMoviesOnLoad;
		const hasMoreReturnedMovies = returnedMovies.length < filteredMovies.length;
		await setIsMoreMovieBtnVisible(hasMoreMovies || hasMoreReturnedMovies);
	}

	useEffect(() => {
		const setEventListeners = () => {
			document.addEventListener('keydown', closeByEscape);
			document.addEventListener('click', closeByEscapeOverlayClick);
		}

		const removeEventListeners = () => {
			document.removeEventListener('keydown', closeByEscape);
			document.removeEventListener('click', closeByEscapeOverlayClick);
		}

		if (isBurgerMenuOpen) {
			setEventListeners();
		} else {
			removeEventListeners();
		}
	}, [closeByEscapeOverlayClick, closeByEscape, isBurgerMenuOpen]);

	useEffect(() => {
		if (loggedIn) {
			getSavedMovies();
		}
	}, [loggedIn]);

	return (
		<div className='app'>
			<CurrentUserContext.Provider value={currentUser}>
				<Routes>
					<Route path='/' element={
						<Main
							handleOpenBurgerMenu={handleOpenBurgerMenu}
						/>
					} />
					<Route path='/movies' element={
						<ProtectedRoute
							component={Movies}
							loggedIn={loggedIn}
							amountMoviesOnLoad={amountMoviesOnLoad}
							amountMoviesForLoad={amountMoviesForLoad}
							handleChangeAmountMovies={handleChangeAmountMovies}
							handleFilterMovies={handleFilterMovies}
							handleLoadingMovies={handleLoadingMovies}
							handleChangeMoreBtnVisible={handleChangeMoreBtnVisible}
							handleMovieDislike={handleMovieDislike}
							handleMovieLike={handleMovieLike}
							savedMoviesList={savedMoviesList}
							IsMoreMovieBtnVisible={IsMoreMovieBtnVisible}
							handleOpenBurgerMenu={handleOpenBurgerMenu}
							infoMessageHandler={infoMessageHandler}
						/>
					} />
					<Route path='/saved-movies' element={
						<ProtectedRoute
							component={SavedMovies}
							loggedIn={loggedIn}
							amountMoviesOnLoad={amountMoviesOnLoad}
							amountMoviesForLoad={amountMoviesForLoad}
							handleChangeAmountMovies={handleChangeAmountMovies}
							handleFilterSavedMovies={handleFilterSavedMovies}
							handleOpenBurgerMenu={handleOpenBurgerMenu}
							handleDeleteMovieFromSaved={handleDeleteMovieFromSaved}
							handleLoadingMovies={handleLoadingMovies}
							handleChangeMoreBtnVisible={handleChangeMoreBtnVisible}
							handleRemoveMovieFromSaved={handleRemoveMovieFromSaved}
							IsMoreMovieBtnVisible={IsMoreMovieBtnVisible}
							getSavedMovies={getSavedMovies}
							savedMoviesList={savedMoviesList}
							apiErrorMessage={apiErrorMessage}
							infoMessageHandler={infoMessageHandler}
						/>
					} />
					<Route path='/profile' element={
						<ProtectedRoute
							component={Profile}
							loggedIn={loggedIn}
							handleOpenBurgerMenu={handleOpenBurgerMenu}
							handleUpdateUserInfo={handleUpdateUserInfo}
							handleLogout={handleLogout}
							infoMessageHandler={infoMessageHandler}
							isApiErrorMessage={isApiErrorMessage}
						/>
					} />
					<Route path='/signin' element={
						<Login
							handleSignIn={handleSignIn}
							isApiErrorMessage={isApiErrorMessage}
						/>
					} />
					<Route path='/signup' element={
						<Register
							handleSignUp={handleSignUp}
							isApiErrorMessage={isApiErrorMessage}
						/>
					} />
					<Route exact path="/*" element={<PageNotFound />} />
				</Routes>
				<BurgerMenu
					burgerMenuOpen={isBurgerMenuOpen}
					handleOpenBurgerMenu={handleOpenBurgerMenu}
				/>
				<ErrorPopup
					isErrorPopupOpen={isErrorPopupOpen}
					errorMessage={isApiError}
					handleOpenErrorPopup={handleOpenErrorPopup}
				/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
