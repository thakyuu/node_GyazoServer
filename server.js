var http = require('http'),
	formidable = require('formidable'),
	dataUri = require('datauri'),
	config = require('./config.js');

var server = http.createServer(function(req, res){
	if(req.url == '/upload'){
		var form = new formidable.IncomingForm();

		form.uploadDir = "./images";
		form.keepExtensions = true;

		form.parse(req, function(err, fields, files){
			console.log(files.imagedata.path);
			res.end('http://' + config.host + ':' + config.port + '/' + files.imagedata.path.replace(/\\/, "/"));
		});
	}else if(req.url.match(/images\/([a-z0-9]+)\.png/)){
		var imageFile = RegExp.$1;
		var dUri = new dataUri();

		res.write('<!DOCTYPE html><html><head><title>' + imageFile + '</title></head><body>');

		dUri.on('encoded', function(image_dataUri){
			res.end('<img src="'+image_dataUri+'"></body></html>');
		});

		dUri.on('error', function(err){
			console.log('Error: ' + imageFile);
			res.end('File Not Found</body></html>');
		});

		dUri.encode('./images/' + imageFile + '.png');
	}
});
server.listen(config.port);
console.log('Server Start: ' + config.host + ':' + config.port);

process.on('uncaughtException', function (err) {
	console.error(err);
});
