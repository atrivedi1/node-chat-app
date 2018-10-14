const moment = require('moment');

const generateMessage = (from, text) => {
	return {
		from, 
		text,
		createdAt: moment().valueOf()
	}
}

const generateLocationMessage = (from, latitude, longitude) => {
	let googleMapsUrl = `https://google.com/maps/?q=${latitude},${longitude}`

	return {
		from, 
		url: googleMapsUrl,
		createdAt: moment().valueOf()
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}