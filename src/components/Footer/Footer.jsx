import React from 'react';

import './Footer.css'

const Footer = () => {
	const date = new Date().getFullYear()

	return (
		<footer className='footer'>
			<p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
			<div className='footer__link-block'>
				<p className='footer__copyright'>&#xa9; {date}</p>
				<ul className='footer__link-list'>
					<li className='footer__link-list-item'>
						<a href='https://practicum.yandex.ru/' className='footer__link' rel='noreferrer' target='_blank'>Яндекс.Практикум</a>
					</li>
					<li className='footer__link-list-item'>
						<a href='https://github.com/DaniilKarasev' className='footer__link' rel='noreferrer' target='_blank'>Github</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;