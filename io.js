/**
*
* @Router Config Server
* @author Erick Eduardo - __@erick
* @private  CONFIGURATION SERVER IO
*/
	var
		   express 		= require('express')
		 , app 	   		= express()
		 , server  		= require('http').createServer(app)
     , io         = require('socket.io').listen(server);

     server.listen(3333);
     io.sockets.on('connection', function(socket){
            socket.on('send message', function(data){
              io.sockets.emit('new message', data);
              //   socket.broadcast.emit('new message', data);
            })
     })
