/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useCustomInputValidation } from '../../customHooks/useCustomInputValidation';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';
import AuthForm from '../AuthForm/AuthForm';
import './Profile.css'

const Profile = ({
	handleOpenBurgerMenu,
	handleUpdateUserInfo,
	handleLogout,
	isApiErrorMessage
}) => {
	const currentUser = useContext(CurrentUserContext);
	const [isFormValid, setIsFormValid] = useState(false)
	const [newName, setNewName] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [submitBtnText, setSubmitBtnText] = useState('Редактировать')
	const [apiErrorMessage, setApiErrorMessage] = useState('')
	const { validationMessage: nameErrorMessage, isValid: nameValid, onChange: validateName } = useCustomInputValidation({})
	const { validationMessage: emailErrorMessage, isValid: emailValid, onChange: validateEmail } = useCustomInputValidation({})

	const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitBtnText('Сохранение...')
        await handleUpdateUserInfo(newName === '' ? currentUser.name : newName, newEmail === '' ? currentUser.email : newEmail)
        setSubmitBtnText('Редактировать')
        setNewName('')
        setNewEmail('')
    }

	const handleOnFocusNewName = async () => {
        if (newName === '') {
            await setNewName(currentUser.name)
            await setNewEmail(currentUser.email)
        }
    }

	const handleOnFocusNewEmail = async () => {
		if (newEmail === '') {
			await setNewName(currentUser.name)
			await setNewEmail(currentUser.email)
		}
	}

	useEffect(() => {
		if(nameValid && emailValid && (newName !== '' || newEmail !== '')) {
			setIsFormValid(true)
		}
			else{
				setIsFormValid(false);
			}

		if (newName === currentUser.name && newEmail === currentUser.email) {
			setIsFormValid(false)
		}
	}, [nameValid, emailValid, newName, newEmail, currentUser.name, currentUser.email])

	useEffect(() => {
		setApiErrorMessage('')
	}, [])

	useEffect(() => {
		setApiErrorMessage(isApiErrorMessage)
	}, [isApiErrorMessage])

	async function handleChangeName(e) {
		setApiErrorMessage('')
		setNewName(e.target.value);
		await validateName(e)
	}

	async function handleChangeEmail(e) {
		setApiErrorMessage('')
		setNewEmail(e.target.value);
		await validateEmail(e)
	}

	return (
		<>
			<Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} />
			<main className='main'>
				<Section sectionName='profile'>
					<h1 className='profile__greetings'>Привет, {currentUser.name}!</h1>
					<AuthForm
						isFormValid={!isFormValid}
						submitBtnText={submitBtnText}
						onSubmit={handleSubmit}
						submitButtonClassName='button_placed_profile'
						authFormClassName='auth__form_placed_profile'
					>
						<div className='profile-input-wrapper'>
							<Input
								inputName='Имя'
								classNameType='name'
								classNamePlaced='profile'
								inputPlaceholder={currentUser.name}
								inputType='text'
								required={true}
								inputError={nameValid}
								onChange={handleChangeName}
								value={newName}
								onFocus={handleOnFocusNewName}
							/>
							<Input
								inputName='E-mail'
								classNameType='email'
								classNamePlaced='profile'
								inputPlaceholder={currentUser.email}
								inputType='email'
								required={true}
								inputError={emailValid}
								onChange={handleChangeEmail}
								value={newEmail}
								onFocus={handleOnFocusNewEmail}
							/>
							{apiErrorMessage && <FormErrorMessage
								inputWithErrorName='Ошибка'
								errorMessage={apiErrorMessage}
							/>}
							{nameErrorMessage && <FormErrorMessage
								inputWithErrorName='Имя'
								errorMessage={nameErrorMessage}
							/>}
							{emailErrorMessage && <FormErrorMessage
								inputWithErrorName='Email'
								errorMessage={emailErrorMessage}
							/>}
						</div>
					</AuthForm>
					<button
						className='profile__button profile__button_type_logout'
						onClick={handleLogout}
					>Выйти из аккаунта</button>
				</Section>
			</main>
		</>
	);
};

export default Profile;