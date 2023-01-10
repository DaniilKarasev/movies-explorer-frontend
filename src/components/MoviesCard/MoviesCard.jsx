import React from 'react';
import './MoviesCard.css'
import saveImg from "../../images/movies/save.svg"
import deleteImg from "../../images/movies/delete.svg"

function MoviesCard({name='', img='', duration='', saved, onSavedMoviesPage}) {
    return (
        <div className='movie'>
            <img src={img} alt="" className='movie__img'/>
            { saved === true ? 
                <> { onSavedMoviesPage ? ( <img src={deleteImg} alt="" className='movie__saved'/>) : (<img src={saveImg} alt="" className='movie__saved'/> ) }
                </> : ( <p className='movie__save'>Cохранить</p> )
            }
            <div className='movie__desctiontion-container'>
                <p className='movie__name'>{name}</p>
                <p className='movie__duration'>{duration}</p>
            </div>
        </div>
    );
}

export default MoviesCard;