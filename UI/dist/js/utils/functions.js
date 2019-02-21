/* eslint-disable arrow-parens */
/* eslint-disable no-tabs */

const getById = (id) => document.getElementById(id);

const formToJson = (form) => {
	const formData = new FormData(form);
	const data = {};
	formData.forEach((value, key) => {
		data[key] = value;
	});
	return JSON.stringify(data);
};

export { getById, formToJson };
