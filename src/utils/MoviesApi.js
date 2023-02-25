import { moviesApiUrl } from './constants';

class nomorepartiesApi {
	constructor({
		baseUrl,
		headers
	}) {
		this._headers = headers
		this._baseUrl = baseUrl
	}

	_checkResponse(res) {
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async getMovies() {
        const res = await fetch(this._baseUrl, {
            method: 'GET',
            headers: this._headers
        });
        return await this._checkResponse(res);
    }
}

export const moviesApi = new nomorepartiesApi({
	baseUrl: `${moviesApiUrl}`,
	headers: {
		'Content-Type': 'application/json'
	}
});