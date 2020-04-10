const URL = `${window.location.protocol}//${window.location.host}/api`;

const buildPromise = (endpoint, type, body) => {
	const url = `${URL}${endpoint}`;

	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open(type, url);

		let requestBody = body;

		if (type === `POST`) {
			request.setRequestHeader(`Content-type`, `application/json`);
			requestBody = JSON.stringify(body);
		}

		request.onload = () => resolve(request);
		request.onerror = () => reject(JSON.parse(request.response));
		request.send(requestBody);
	});
};

// Parameters:

// request: Object
//	Structure: {
//		endpoint: String, endpoint to hit, ex: /golf/createGolfclub,
//		type: String, either POST or GET,
//		body: Object containing info needed for call, required for POST
//		}

// success: Function
//		Function you want to happen on success
//		Have to account for failing status codes

// failure: Function
//		Function you want to happen on failure
export default async function apiCall(request, success, failure) {
	const promise = buildPromise(request.endpoint, request.type, request.body);

	promise.then(success).catch(failure);
};
