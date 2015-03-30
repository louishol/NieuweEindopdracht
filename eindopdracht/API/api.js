 

module.exports = {
  getCafeByLoc: function (http, _lat, _long, succes) {
    // whatever
    var options = {
	  host: 'https://maps.googleapis.com',
	  path: "/maps/api/place/nearbysearch/json?key=AIzaSyBiRwy-lPEwPJkfOOG0XPpeT_OCG88Ust8&location=" + _lat + ","+ _long + "&radius=5000&type=cafe"
	};
	http.request(options, succes).end();

	
  }
};


