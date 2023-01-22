import { useState, useEffect} from 'react';
import { useCustomInputValidation } from '../../customHooks/useCustomInputValidation';
import PageWithForm from '../PageWithForm/PageWithForm';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

const Login = ({
  onSignIn,
  isApiErrorMessage
}) => {
  const [formValid, setFormValid] = useState(false)
  const [submitButtonText, setSubmitButtonText] = useState("Войти")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const { validationMessage: emailErrorMessage, isValid: emailValid, onChange: validateEmail } = useCustomInputValidation({})
  const { validationMessage: passwordErrorMessage, isValid: passwordValid, onChange: validatePassword } = useCustomInputValidation({})

  useEffect(() => {
    emailValid && email !== '' && passwordValid && password !== '' ? setFormValid(false) : setFormValid(true);
  }, [emailValid, passwordValid, email, password])

  useEffect(() => {
    setApiErrorMessage('')
  }, [])

  useEffect(() => {
    setApiErrorMessage(isApiErrorMessage)
  }, [isApiErrorMessage])

  function changeEmail(e) {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    setEmail(e.target.value);
    validateEmail(e)
  }

  function changePassword(e) {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    setPassword(e.target.value);
    validatePassword(e)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitButtonText("Вхожу...")
    onSignIn({
      email: email,
      password: password
    })
      .finally(() => {
        setSubmitButtonText("Войти")
        setApiErrorMessage('')
      })
  }

  return (
    <PageWithForm
      name='login'
      greeting='Рады видеть!'
    >
      <AuthForm
        isFormValid={formValid}
        submitButtonText={submitButtonText}
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