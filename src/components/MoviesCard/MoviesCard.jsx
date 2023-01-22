import { useState } from 'react';
import { moviesBaseUrl } from '../../utils/constants';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import './MoviesCard.css'

const MoviesCard = ({
	onMovieLike,
	onMovieDislike,
	onMovieRemove,
	movie,
	saved = false,
	liked = false,
}) => {
	const [isLiked, setIsLiked] = useState(liked)
	const [loaded, setLoaded] = useState(false);

	function handleMovieLike() {
		onMovieLike(movie)
			.finally(() => {
				setIsLiked(true)
			})
	}

	function handleMovieDislike() {
		onMovieDislike(movie)
			.finally(() => {
				setIsLiked(false)
			})
	}

	function handleRemoveMovie() {
		onMovieRemove(movie)
	}

	return (
		<li>
			<div className='movie'>
				{loaded ? null : (<Preloader />)}
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
						style={loaded ? {} : { display: 'none' }}
						onLoad={() => setLoaded(true)}
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
									onClick={handleMovieDislike}
									className={`button button_type_like ${isLiked && `button_type_like-active`}`}
								/>
						) : (
								<Button
									onClick={handleMovieLike}
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