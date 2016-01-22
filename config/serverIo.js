/**
*
* @Router Config Server
* @author Erick Eduardo - __@erick
* @private  CONFIGURATION SERVER SOCKET.IO
*/
	var
		   app 			  = require('./serverConfig')
	   , server  		= require('http').createServer(app)
     , io         = require('socket.io').listen(server);

      server.listen(5886);
	 	 	io.sockets.on('connection', function(socket){
	            socket.on('send message', function(data){
	              io.sockets.emit('new message', data);
	              //   socket.broadcast.emit('new message', data);
	            })
	     })
