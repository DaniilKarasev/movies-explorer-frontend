import React from 'react';
import Section from '../Section/Section';
import SectionTitle from '../SectionTitle/SectionTitle';
import studentPhoto from '../../images/about-me/avatar.jpg'
import './AboutMe.css'

const AboutMe = () => {
	return (
		<Section sectionName='about-me' sectionID="aboutMe">
			<SectionTitle title='Студент' />
			<div className='about-me__container'>
				<div className='about-me__text-block'>
					<h3 className='about-me__title'>Виталий</h3>
					<p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
					<p className='about-me__info'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
						и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
					<a className='about-me__link' href='https://github.com/DaniilKarasev'>Github</a>
				</div>
				<img className='about-me__photo' src={studentPhoto} alt='student' />
			</div>
		</Section>
	);
};

export default AboutMe;