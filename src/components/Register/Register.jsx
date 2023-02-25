/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useCustomInputValidation } from '../../customHooks/useCustomInputValidation';
import PageWithForm from '../PageWithForm/PageWithForm';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

const Register = ({
	handleSignUp,
	isApiErrorMessage
}) => {
	const [isFormValid, setIsFormValid] = useState(false)
	const [submitBtnText, setSubmitBtnText] = useState("Зарегистрироваться")
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [apiErrorMessage, setApiErrorMessage] = useState('')
	const { validationMessage: nameErrorMessage, isValid: nameValid, onChange: validateName } = useCustomInputValidation({})
	const { validationMessage: emailErrorMessage, isValid: emailValid, onChange: validateEmail } = useCustomInputValidation({})
	const { validationMessage: passwordErrorMessage, isValid: passwordValid, onChange: validatePassword } = useCustomInputValidation({})

	async function validateForm() {
		await setIsFormValid(nameValid && name !== '' && emailValid && email !== '' && passwordValid && password !== '' ? false : true);
	}
	
	useEffect(() => {
		validateForm();
	}, [nameValid, emailValid, passwordValid, name, email, password]);

	useEffect(() => {
		setApiErrorMessage(isApiErrorMessage)
	}, [isApiErrorMessage])

	async function changeName(e) {
        setApiErrorMessage('')
        setName(e.target.value);
        await validateName(e)
    }

	async function changeEmail(e) {
		setApiErrorMessage('')
		setEmail(e.target.value);
		await validateEmail(e)
	}

	async function changePassword(e) {
		setApiErrorMessage('')
		setPassword(e.target.value);
		await validatePassword(e)
	}

	async function handleSubmit(e) {
        e.preventDefault();
        setSubmitBtnText("Регистрация...");
        try {
            await handleSignUp({
                name: name,
                email: email,
                password: password
            });
            setApiErrorMessage('');
            setSubmitBtnText("Зарегистрироваться");
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setApiErrorMessage(err.message);
        }
    }

	return (
		<PageWithForm
			name='register'
			title='Добро пожаловать!'
		>
			<AuthForm
				isFormValid={isFormValid}
				submitBtnText={submitBtnText}
				onSubmit={handleSubmit}
			>
				<Input
					inputName='Имя'
					classNameType='name'
					classNamePlaced='auth-form'
					inputPlaceholder='Имя'
					inputType='text'
					required={true}
					inputError={nameValid}
					onChange={changeName}
					value={name}
				/>
				<Input
					inputName='Email'
					classNameType='email'
					classNamePlaced='auth-form'
					inputPlaceholder='Email'
					inputType='email'
					required={true}
					inputError={emailValid}
					onChange={changeEmail}
					value={email}
				/>
				<Input
					inputName='Пароль'
					classNameType='password'
					classNamePlaced='auth-form'
					inputPlaceholder='Пароль'
					inputType='password'
					required={true}
					minLength="5"
					maxLength="30"
					inputError={passwordValid}
					onChange={changePassword}
					value={password}
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
				{passwordErrorMessage && <FormErrorMessage
					inputWithErrorName='Пароль'
					errorMessage={passwordErrorMessage}
				/>}
			</AuthForm>
		</PageWithForm>
	);
};

export default Register;