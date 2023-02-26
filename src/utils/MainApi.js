import { mainApiUrl } from './constants'
import { moviesBaseUrl } from './constants';

class nomoredomainsApi {
	constructor({
		moviesBaseUrl,
		baseUrl,
		headers
	}) {
		this._headers = headers
		this._baseUrl = baseUrl
		this._moviesBaseUrl = moviesBaseUrl
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(res);
	}

    async signUp({ data }) {
        try {
            const response = await fetch(`${this._baseUrl}/signup`, {
                credentials: 'include',
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    password: data.password,
                    email: data.email
                })
            });
            return this._checkResponse(response);
        } catch (err) {
            console.log(err);
        }
    }

    async signIn({ data }) {
        try {
            const res = await fetch(`${this._baseUrl}/signin`, {
                credentials: 'include',
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    "password": data.password,
                    "email": data.email
                })
            });
            return this._checkResponse(res);
        } catch (error) {
            console.log(error);
        }
    }
    
	async getUser() {
        try {
            const res = await fetch(`${this._baseUrl}/users/me`, {
                credentials: 'include',
                method: 'GET',
                headers: this._headers
            });
            return this._checkResponse(res);
        } catch (err) {
            console.error(err);
        }
    }

	async  authWithToken() {
        try {
            const res = await fetch(`${this._baseUrl}/users/me`, {
                credentials: 'include',
                method: 'GET',
            });
            return this._checkResponse(res);
        } catch (err) {
            console.error(err);
        }
    }

	async saveMovie(movie) {
        try {
            const response = await fetch(`${this._baseUrl}/movies`, {
                credentials: 'include',
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    country: movie.country,
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: `${this._moviesBaseUrl}${movie.image.url}`,
                    trailerLink: movie.trailerLink,
                    thumbnail: `${this._moviesBaseUrl}${movie.image.url}`,
                    movieId: movie.id,
                    nameRU: movie.nameRU,
                    nameEN: movie.nameEN
                })
            });
            const data = await this._checkResponse(response);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

	async getSavedMovies() {
        try {
            const response = await fetch(`${this._baseUrl}/movies`, {
                credentials: 'include',
                method: 'GET',
                headers: this._headers
            });
            const result = await this._checkResponse(response);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

	async deleteMovie(movieId) {
        try {
            const response = await fetch(`${this._baseUrl}/movies/${movieId}`, {
                credentials: 'include',
                method: 'DELETE',
                headers: this._headers,
            })
            this._checkResponse(response);
        } catch (error) {
            console.log(error);
        }
    }

    async setUserInfo(name, email) {
        try {
            const response = await fetch(`${this._baseUrl}/users/me`, {
                credentials: 'include',
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    "name": name,
                    "email": email
                })
            });
            return this._checkResponse(response);
        } catch (err) {
            console.error(err);
        }
    }

    async logout() {
        try {
            const response = await fetch(`${this._baseUrl}/signout`, {
                credentials: 'include',
                method: 'POST',
                headers: this._headers
            });
            return this._checkResponse(response);
        } catch (err) {
            console.error(err);
        }
    }
}

export const mainApi = new nomoredomainsApi({
	baseUrl: `${mainApiUrl}`,
	moviesBaseUrl: `${moviesBaseUrl}`,
	headers: {
		'Content-Type': 'application/json'
	}
});