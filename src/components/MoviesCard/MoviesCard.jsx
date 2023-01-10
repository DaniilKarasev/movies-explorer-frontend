import React from 'react';
import './MoviesCard.css'
import saveImg from "../../images/movies/save.svg"
import deleteImg from "../../images/movies/delete.svg"

function MoviesCard({name='', img='', duration='', saved, onSavedMoviesPage}) {
    return (
        <div className='movie'>
            <img src={img} alt="" className='movie__img'/>
            { saved === true ? 
                <> { onSavedMoviesPage ? ( <button className='movie__btn'><img src={deleteImg} alt="delete" /></button>) : (<button className='movie__btn'><img src={saveImg} alt="saved" /></button> ) }
                </> : ( <button className='movie__save'>Cохранить</button> )
            }
            <div className='movie__desctiontion-container'>
                <p className='movie__name'>{name}</p>
                <p className='movie__duration'>{duration}</p>
            </div>
        </div>
    );
}

//

export default MoviesCard;