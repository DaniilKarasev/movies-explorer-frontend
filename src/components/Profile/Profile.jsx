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
  onChangeUserData,
  onLogout,
  isApiErrorMessage
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [formValid, setFormValid] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [submitButtonText, setSubmitButtonText] = useState('Редактировать')
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const {validationMessage: nameErrorMessage, isValid: nameValid, onChange: validateName } = useCustomInputValidation({})
  const {validationMessage: emailErrorMessage, isValid: emailValid, onChange: validateEmail } = useCustomInputValidation({})

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitButtonText('Сохранение...')
    onChangeUserData(newName === '' ? currentUser.name : newName, newEmail === '' ? currentUser.email : newEmail)
    .finally(() => {
      setSubmitButtonText('Редактировать')
      setNewName('')
      setNewEmail('')
    })
  }

  const handleFocusNewNameInput = () => {
    if (newName === '') {
      setNewName(currentUser.name)
      setNewEmail(currentUser.email)
    }
  }

  const handleFocusNewEmailInput = () => {
    if (newEmail === '') {
      setNewName(currentUser.name)
      setNewEmail(currentUser.email)
    }
  }

  useEffect(() => {
    nameValid && emailValid && (newName !== '' || newEmail !== '') ? setFormValid(true) : setFormValid(false);

    if (newName === currentUser.name && newEmail === currentUser.email) {
      setFormValid(false)
    }
  }, [nameValid, emailValid, newName, newEmail])

  useEffect(() => {
    setApiErrorMessage('')
  }, [])

  useEffect(() => {
    setApiErrorMessage(isApiErrorMessage)
  }, [isApiErrorMessage])

  function handleChangeName(e) {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    setNewName(e.target.value);
    validateName(e)
  }

  function handleChangeEmail(e) {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    setNewEmail(e.target.value);
    validateEmail(e)
  }

  return (
    <>
      <Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} />
      <main className='main'>
      <Section sectionName='profile'>
        <h1 className='profile__greetings'>Привет, {currentUser.name}!</h1>
          <AuthForm
            isFormValid={!formValid}
            submitButtonText={submitButtonText}
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
              onFocus={handleFocusNewNameInput}
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
              onFocus={handleFocusNewEmailInput}
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
          onClick={onLogout}
        >Выйти из аккаунта</button>
      </Section>
      </main>
    </>
  );
};

export default Profile;