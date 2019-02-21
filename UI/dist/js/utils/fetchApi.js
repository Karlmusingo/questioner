/* eslint-disable no-tabs */
/* eslint-disable arrow-parens */
/* eslint-disable no-else-return */
const checkStatus = (response) => {
	if (Array.of(201, 200).includes(response.status)) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(response);
	}
};

const parseResponse = (response) => response.json();

const fetchAPI = (url, method, data = {}, token = '') => {
	const baseUrl = 'http://localhost:5000/api/v1';
	const requestData = {
		method,
		headers: {
			'content-type': 'application/json',
		},
	};
	if (data && Array.of('PATCH', 'POST').includes(method)) {
		requestData.body = data;
	}
	if (token) {
		requestData.headers.authorization = token;
	}
	return new Promise((resolve, reject) => {
		fetch(`${baseUrl}${url}`, requestData)
			.then(checkStatus)
			.then(parseResponse)
			.then((successData) => {
				resolve(successData);
			})
			.catch((error) => {
				if (error.json) {
					error.json().then((errorData) => {
						reject(errorData);
					});
				} else {
					reject(error);
				}
			});
	});
};

export default fetchAPI;
