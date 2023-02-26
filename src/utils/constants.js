export const moviesApiUrl = 'https://api.nomoreparties.co/beatfilm-movies';
export const moviesBaseUrl = 'https://api.nomoreparties.co';
export const mainApiUrl = 'https://api.movie.dkarasev.nomoredomains.club';

export const portfolio = [
	{
		title: "Статичный сайт",
		url: "https://yandex.ru",
	},
	{
		title: "Адаптивный сайт",
		url: "https://yandex.ru",
	},
	{
		title: "Одностраничное приложение",
		url: "https://yandex.ru",
	},
];

export const techs = [
	{
		name: "HTML",
	},
	{
		name: "CSS",
	},
	{
		name: "JS",
	},
	{
		name: "React",
	},
	{
		name: "Git",
	},
	{
		name: "Express.js",
	},
	{
		name: "mongoDB",
	},
];

export const navTab = [
	{
		name: "О проекте",
		link: "#aboutProject"
	},
	{
		name: "Технологии",
		link: "#techs"
	},
	{
		name: "Студент",
		link: "#aboutMe"
	},
];

export const widthMax = { maxDisplayWidth: 1280, amountMoviesOnLoad: 16, amountMoviesForLoad: 4 }
export const widthRegular = { maxDisplayWidth: 1280, amountMoviesOnLoad: 12, amountMoviesForLoad: 3 }
export const widthTablet = { maxDisplayWidth: 992, amountMoviesOnLoad: 8, amountMoviesForLoad: 2 }
export const widthMobile = { maxDisplayWidth: 631, amountMoviesOnLoad: 5, amountMoviesForLoad: 2 }

export const movieNotFoundMessage = 'Ничего не найдено';
export const movieLoadErrorMessage = 'Во время запроса произошла ошибка. Попробуйте ещё раз';
export const inputEmailCustomError = 'Не верный формат адреса электронной почты';
export const inputNameCustomError = 'Должен содержать только латиницу, кириллицу, пробел или дефис';

export const nameValidator = (name) => {
	const reg = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z\s|-]{0,28}[а-яА-ЯёЁa-zA-Z]$/;
	return reg.test(name);
}