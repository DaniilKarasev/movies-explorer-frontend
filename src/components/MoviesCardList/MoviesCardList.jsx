import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'


function MoviesCardList({moviesList, onSavedMoviesPage}) {
    return (
        <section className='moviesCardList'>
            <div className='moviesCardList__wrapper'>
                {moviesList.map((moviesList, index) => {
                    return (
                        <MoviesCard name={moviesList.name} img={moviesList.img} duration={moviesList.duration} saved={moviesList.saved} key={index} onSavedMoviesPage={onSavedMoviesPage}/>
                    )
                })}
            </div>
            {onSavedMoviesPage ? (<></>) : (<button className='moviesCardList__morebtn'>Ещё</button>)}
        </section>
    );
}

export default MoviesCardList;