var http = require('http'),
	formidable = require('formidable'),
	fs = require('fs'),
	config = require('./config.js');

var server = http.createServer(function(req, res){
	if(req.url == '/upload'){
		var form = new formidable.IncomingForm();

		form.uploadDir = "./images";
		form.keepExtensions = true;

		form.parse(req, function(err, fields, files){
			console.log(files.imagedata.path);
			res.end('http://' + config.host + ':' + config.port + '/' + files.imagedata.path.replace(/\\/, "/").replace(/\.png/, ".html"));
		});
	}else if(req.url.match(/images\/([a-z0-9]+)\.html/)){
		var imageFile = RegExp.$1;
		res.end('<!DOCTYPE html><html><head><title>' + imageFile + '</title></head><body><a href="' + imageFile + '.png"><img src=' + imageFile + '.png></a></body></html>');
	}else if(req.url.match(/images\/([a-z0-9]+)\.png/)){
		fs.readFile('images/' + RegExp.$1 + '.png', function(err, file){
			if(err){
				res.end('File not found');
			}else{
				res.end(file);
			}
		});
	}
});
server.listen(config.port);
console.log('Server Start: ' + config.host + ':' + config.port);

process.on('uncaughtException', function (err) {
	console.error(err);
});
