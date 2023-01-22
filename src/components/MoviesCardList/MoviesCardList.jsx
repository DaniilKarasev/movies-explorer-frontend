import React from 'react';
import Section from '../Section/Section';
import Button from '../Button/Button';
import './MoviesCardList.css'

const MoviesCardList = ({
  children,
  onLoadMoreButtonClick,
  loadMoreMoviesButtonVisible,
  moviesMessageVisible,
  moviesMessage,
  apiErrorMessage
}) => {

  return (
    <Section sectionName='moviesCardList'>
      
      {moviesMessageVisible ? (
          <p className='moviesCardList__no-found'>{apiErrorMessage ? apiErrorMessage : moviesMessage}</p>
        ) : (
          <ul className='moviesCardList__film-list'>
          {children}
      </ul>
      )}
      
      {loadMoreMoviesButtonVisible ? (
        <div className='moviesCardList__footer moviesCardList__footer_with_button'>
          <Button 
            className='button button_placed_card-list' 
            onClick={onLoadMoreButtonClick}
          >Ещё</Button>
        </div>
          ) : (
        <div className='moviesCardList__footer' />
      )}
      
    </Section>
  );
};

export default MoviesCardList;