import { useState } from 'react';
import { moviesBaseUrl } from '../../utils/constants';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import './MoviesCard.css'

const MoviesCard = ({
	handleMovieLike,
	handleMovieDislike,
	handleDeleteMovieFromSaved,
	movie,
	saved = false,
	liked = false,
}) => {
	const [isLiked, setIsLiked] = useState(liked)
	const [isLoaded, setIsLoaded] = useState(false);

	async function handleLike() {
		try {
			await handleMovieLike(movie);
			setIsLiked(true);
		} catch (err) {
			console.log(err);
		}
	}

	async function handleDislike() {
		try {
			await handleMovieDislike(movie);
			setIsLiked(false);
		} catch (err) {
			console.error(err);
		}
	}

	async function handleRemoveMovie() {
		await handleDeleteMovieFromSaved(movie)
	}

	return (
		<li>
			<div className='movie'>
				{isLoaded ? null : (<Preloader />)}
				<a
					href={movie.trailerLink}
					className='movie__link'
					target='_blank'
					rel='noreferrer'
				>
					<img
						src={`${saved ? movie.image : `${moviesBaseUrl}${movie.image.url}`}`}
						alt={movie.nameRU}
						className='movie__img'
						style={isLoaded ? {} : { display: 'none' }}
						onLoad={() => setIsLoaded(true)}
					/>
				</a>
				<div className='movie__desctiontion-container'>
					{ saved ? (
							<Button
								onClick={handleRemoveMovie}
								className={`button ${saved && `button_type_like-delete`}`}
							/>
						) : ( isLiked ? (
								<Button
									onClick={handleDislike}
									className={`button button_type_like ${isLiked && `button_type_like-active`}`}
								/>
						) : (
								<Button
									onClick={handleLike}
									className={`button test button_type_like ${isLiked && `button_type_like-active`}`}
								>Сохранить</Button>
						))
					}
					<h3 className='movie__name'>{movie.nameRU}</h3>
					<p className='movie__duration'>{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
				</div>
			</div>
		</li>
	);
};

export default MoviesCard;