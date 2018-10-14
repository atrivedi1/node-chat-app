const generateMessage = (from, text) => {
	return {
		from, 
		text,
		createdAt: new Date().getTime()
	}
}

const generateLocationMessage = (from, latitude, longitude) => {
	let googleMapsUrl = `https://google.com/maps/?q=${latitude},${longitude}`

	return {
		from, 
		url: googleMapsUrl,
		createdAt: new Date().getTime()
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}