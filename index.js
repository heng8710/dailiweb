var globalSetting = require('./global.json')
var bodyParser = require('body-parser')
var e = require('express')
var app = e()
app.set('port', 3000)

app.get('/', function(req, resp){
	//console.log('root/ get');
	resp.type('application/json; charset=utf-8');
	resp.sendFile(globalSetting.daili_json);
})

app.post('/', bodyParser.json({type: '*/*'}),  function(req, resp){
	//var bodyParser = require('body-parser')
	var bodyJsonStr = JSON.stringify(req.body);
//	console.log(globalSetting.daili_json)	
//	console.log(req.body)
//	console.log(bodyJsonStr);
	var fs = require('fs');
	fs.writeFileSync(globalSetting.daili_json, bodyJsonStr);
	resp.type('text/plain')
//	resp.send(bodyJsonStr);
	resp.send();
})


app.use(function(req, resp){
	resp.type('text/plain');
	resp.status(404)
	resp.send('404 not found')
})

app.use(function(err, req, res, next){
	console.error(err.stack)
	res.type('text/plain')
	res.status(500)
	res.send('500 server error')
})

app.listen(app.get('port'), function(){
	console.log('express started on')
})
