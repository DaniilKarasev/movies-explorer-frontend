import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFound.css'
import Section from '../Section/Section';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Section theme='dark' sectionName='not-found'>
			<div className='not-found__wrapper'>
				<div className='not-found__text-block'>
					<h1 className='not-found__title'>404</h1>
					<p className='not-found__subtitle'>Страница не найдена</p>
				</div>
				<p className='not-found__link' onClick={() => navigate(-1)}>Назад</p>
			</div>
		</Section>
	);
};

export default NotFound;