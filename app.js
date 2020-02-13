var express = require('express');
var path = require('path');
var https = require('https');
var cors = require('cors');
var port = process.env.PORT || 3000;
var app = express();

//Set static path
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(port, function () {
	console.log('Port: ' + port);
});

/**
 * Autocomplete - GET request for Google Autocomplete API
 */
app.get('/autocomplete', function (req, res)
{
	// Set Headers
	res.setHeader("Content-Type", "application/json"); 
	res.setHeader("Access-Control-Allow-Origin","*"); 
	res.setHeader("Access-Control-Allow-Headers","X-Requested-With");

	// Get Params
	var input = req.query.input;
	var types = "(cities)";
	var language = "en";

	// Key for Google Autocomplete API
	var key = "AIzaSyCfbRMcIgw-ZY4hk1KswKN0hCaytlh3m9g";

	// Google Geocode API URL
	var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + input + "&types=" + types + "&language=" + language + "&key=" + key;

	https.get(url, (rsp) => {
		let data = '';
		
		// Data has been recieved.
		rsp.on('data', (chunk) => {
			data += chunk;
		});
		
		// The whole response has been received.
		rsp.on('end', () => {
			return res.send(JSON.parse(data));
		});
		
		}).on("error", (err) => {
		console.log("Google Autocomplete Error: " + err.message);
		});
});


/**
 * Geocode - GET request for Google Geocode API
 */
app.get('/geocode', function (req, res)
{
	// Set Headers
	res.setHeader("Content-Type", "application/json"); 
	res.setHeader("Access-Control-Allow-Origin","*"); 
	res.setHeader("Access-Control-Allow-Headers","X-Requested-With");

	// Get Params
	var street = req.query.street;
	var city = req.query.city;
	var state = req.query.state;

	// Key for Google Geocode API
	var geocodeKey = "AIzaSyBjG29Evn-mX9C6e-Ungqvy8qa_BrXqd2w";

	// Google Geocode API URL
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + street +"," + city + "," + state + "&key=" + geocodeKey;

	https.get(url, (rsp) => {
		let data = '';
	  
		// Data has been recieved.
		rsp.on('data', (chunk) => {
		  data += chunk;
		});
	  
		// The whole response has been received.
		rsp.on('end', () => {
		  return res.send(JSON.parse(data));
		});
	  
	  }).on("error", (err) => {
		console.log("Google Geocode Error: " + err.message);
	  });
});

/**
 * DarkSky - GET request for Dark Sky API
 */
app.get('/darkSky', function (req, res)
{
	// Set Headers
	res.setHeader("Content-Type", "application/json"); 
	res.setHeader("Access-Control-Allow-Origin","*"); 
	res.setHeader("Access-Control-Allow-Headers","X-Requested-With");

	// Get Params
	var lat = req.query.lat;
	var lon = req.query.lon;

	// Key for Google Geocode API
	var darkSkyKey = "8cbc99f201f8a314fe08f86dc72bebf2";

	// Google Geocode API URL
	var url = "https://api.darksky.net/forecast/" + darkSkyKey +"/" + lat + "," + lon;

	https.get(url, (rsp) => {
		let data = '';
	  
		// Data has been recieved.
		rsp.on('data', (chunk) => {
		  data += chunk;
		});
	  
		// The whole response has been received.
		rsp.on('end', () => {
		  return res.send(JSON.parse(data));
		});
	  
	  }).on("error", (err) => {
		console.log("Dark Sky Error: " + err.message);
	  });
});

/**
 * Modal - GET request for Dark Sky API for Modal Data
 */
app.get('/modal', function (req, res)
{
	// Set Headers
	res.setHeader("Content-Type", "application/json"); 
	res.setHeader("Access-Control-Allow-Origin","*"); 
	res.setHeader("Access-Control-Allow-Headers","X-Requested-With");

	// Get Params
	var lat = req.query.lat;
	var lon = req.query.lon;
	var time = req.query.time;

	// Key for Google Geocode API
	var darkSkyKey = "8cbc99f201f8a314fe08f86dc72bebf2";

	// Google Geocode API URL
	var url = "https://api.darksky.net/forecast/" + darkSkyKey +"/" + lat + "," + lon + "," + time;

	https.get(url, (rsp) => {
		let data = '';
	  
		// Data has been recieved.
		rsp.on('data', (chunk) => {
		  data += chunk;
		});
	  
		// The whole response has been received.
		rsp.on('end', () => {
		  return res.send(JSON.parse(data));
		});
	  
	  }).on("error", (err) => {
		console.log("Modal Error: " + err.message);
	  });
});

/**
 * stateSeal - GET request for State Seal API
 */
app.get('/stateSeal', function(req, res)
{
	// Set Headers
	res.setHeader("Content-Type", "application/json"); 
	res.setHeader("Access-Control-Allow-Origin","*"); 
	res.setHeader("Access-Control-Allow-Headers","X-Requested-With");

	// Get Params
	var q = req.query.state;
	var cx = '007605095661351441351:gvpfhjcomov';
	var imageSize = "large";
	var num = 1;
	var searchType = "image";
	var imgType = "news";

	// Key for Google State Seal API
	var stateSealKey = "AIzaSyCfbRMcIgw-ZY4hk1KswKN0hCaytlh3m9g";

	// Google State Seal API URL
	var url = "https://www.googleapis.com/customsearch/v1?q=" + "Seal%20of%20" + q + "%20state" + "&cx=" + cx + "&imgSize=" + imageSize + "&imgType=" + imgType + "&num=" + num + "&searchType=" + searchType + "&key=" + stateSealKey;
	console.log("URL: " + url);

	https.get(url, (rsp) => {
		let data = '';
	  
		// Data has been recieved.
		rsp.on('data', (chunk) => {
		  data += chunk;
		});
	  
		// The whole response has been received.
		rsp.on('end', () => {
		  return res.send(JSON.parse(data));
		});
	  
	  }).on("error", (err) => {
		console.log("Dark Sky Error: " + err.message);
	  });
});

/**
 * googlePhotos - GET request for Google Custom Search API
 */
app.get('/googlePhotos', function(req, res)
{
	// Set Headers
	res.setHeader("Content-Type", "application/json"); 
	res.setHeader("Access-Control-Allow-Origin","*"); 
	res.setHeader("Access-Control-Allow-Headers","X-Requested-With");

	// Get Params
	var q = req.query.location;
	var cx = '007605095661351441351:gvpfhjcomov';
	var imageSize = "medium";
	var num = 8;
	var searchType = "image";
	var imgType = "news";

	// Key for Google Custom Search API
	var photosKey = "AIzaSyCfbRMcIgw-ZY4hk1KswKN0hCaytlh3m9g";

	// Google Custom Search API URL
	var url = "https://www.googleapis.com/customsearch/v1?q="  + q  + "&cx=" + cx + "&imgSize=" + imageSize + "&imgType=" + imgType + "&num=" + num + "&searchType=" + searchType + "&key=" + photosKey;

	// TODO: Remove Debug Stmt
	console.log("Url:" + url);

	https.get(url, (rsp) => {
		let data = '';
	  
		// Data has been recieved.
		rsp.on('data', (chunk) => {
		  data += chunk;
		});
	  
		// The whole response has been received.
		rsp.on('end', () => {
		  return res.send(JSON.parse(data));
		});
	  
	  }).on("error", (err) => {
		console.log("Dark Sky Error: " + err.message);
	  });
});

module.exports = app;
