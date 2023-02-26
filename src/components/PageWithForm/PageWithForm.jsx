import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../Section/Section';
import Logo from '../Logo/Logo';
import './PageWithForm.css'

const PageWithForm = ({
	children,
	name,
	title
}) => {
	return (
		<main className='main'>
			<Section sectionName='page-with-form'>
				<div className='page-with-form__wrapper'>
					<Logo placedTo='page-with-form' />
					<h1 className='page-with-form__greetings'>{title}</h1>
					{children}
					{name === 'login' && (
						<p className='page-with-form__footer-text'>
							Ещё не зарегистрированы?
							<Link to='/signup' className='page-with-form__footer-link'>Регистрация</Link>
						</p>
					)}
					{name === 'register' && (
						<p className='page-with-form__footer-text'>
							Уже зарегистрированы?
							<Link to='/signin' className='page-with-form__footer-link'>Войти</Link>
						</p>
					)}
				</div>
			</Section>
		</main>
	);
};

export default PageWithForm;