import { useState, useEffect } from 'react';
import { useCustomInputValidation } from '../../customHooks/useCustomInputValidation';
import PageWithForm from '../PageWithForm/PageWithForm';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

const Login = ({
	handleSignIn,
	isApiErrorMessage
}) => {
	const [isFormValid, setIsFormValid] = useState(false)
	const [submitBtnText, setSubmitBtnText] = useState("Войти")
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [apiErrorMessage, setApiErrorMessage] = useState('')
	const { validationMessage: emailErrorMessage, isValid: emailValid, onChange: validateEmail } = useCustomInputValidation({})
	const { validationMessage: passwordErrorMessage, isValid: passwordValid, onChange: validatePassword } = useCustomInputValidation({})

	useEffect(() => {
        emailValid && email !== '' && passwordValid && password !== '' ? setIsFormValid(false) : setIsFormValid(true);
    }, [emailValid, passwordValid, email, password]);

	useEffect(() => {
		setApiErrorMessage(isApiErrorMessage)
	}, [isApiErrorMessage])

	async function changeEmail(e) {
        setApiErrorMessage('');
        setEmail(e.target.value);
        await validateEmail(e);
    }

	async function changePassword(e) {
        setApiErrorMessage('');
        setPassword(e.target.value);
        await validatePassword(e);
    }

	async function handleSubmit(e) {
		e.preventDefault()
		if (email === '' || password === '') {
			return
		}
		setSubmitBtnText("Вхожу...")
		try {
			await handleSignIn({
				email: email,
				password: password
			})
			setApiErrorMessage('')
		} catch (err) {
			setApiErrorMessage(err.message)
		} finally {
			setSubmitBtnText("Войти")
		}
	}

	return (
		<PageWithForm
			name='login'
			title='Рады видеть!'
		>
			<AuthForm
				isFormValid={isFormValid}
				submitBtnText={submitBtnText}
				onSubmit={handleSubmit}
			>
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
					inputError={passwordValid}
					onChange={changePassword}
					value={password}
				/>
				{apiErrorMessage && <FormErrorMessage
					inputWithErrorName='Ошибка'
					errorMessage={apiErrorMessage}
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

export default Login;