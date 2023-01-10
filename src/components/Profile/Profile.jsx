import React from 'react';
import { useState } from 'react';
import './Profile.css'
import Header from '../Header/Header';
import Section from '../Section/Section';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

const Profile = ({
	handleOpenBurgerMenu
}) => {

	const [isOnEdit, setIsOnEdit] = useState(false);
	const [isDisabled, setIsDisabled] = useState('disabled');

	function handleClickOnEdit() {
		setIsOnEdit(true);
		setIsDisabled('');
		console.log(isDisabled)
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		setIsOnEdit(false)
		setIsDisabled('disabled');
		console.log(isDisabled)
	}

	return (
		<>
			<Header loggedIn={true} theme='white' handleOpenBurgerMenu={handleOpenBurgerMenu} />
			<Section theme='dark' sectionName='profile'>
				<h1 className='profile__greetings'>Привет, Виталий!</h1>
				<form action='#' className='profile__form' name='profile' onSubmit={handleSubmit}>
					<div className='profile-input-wrapper'>
						<Input
							inputName='Имя'
							classNameType='name'
							classNamePlaced='profile'
							inputdefaultValue='Виталий'
							inputType='text'
							required={true}
							inputError={false}
							disabled={isDisabled}
						/>
						<Input
							inputName='E-mail'
							classNameType='email'
							classNamePlaced='profile'
							inputdefaultValue='pochta@yandex.ru'
							inputType='email'
							required={true}
							inputError={true}
							disabled={isDisabled}
						/>
						<FormErrorMessage
							errorMessage='Ошибка'
						/>
						<button type='submit' className={`profile__save-btn ${isOnEdit ? '' : 'profile__btn-hidden'}`}>Сохранить</button>
					</div>
				</form>
				<button className={`profile__edit-btn ${isOnEdit ? 'profile__btn-hidden' : ''}`} onClick={handleClickOnEdit}>Редактировать</button>
				<button className={`profile__loggout-btn ${isOnEdit ? 'profile__btn-hidden' : ''}`}>Выйти из аккаунта</button>
			</Section>
		</>
	);
};

export default Profile;