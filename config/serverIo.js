/**
*
* @Router Config Server
* @author Erick Eduardo - __@erick
* @private  CONFIGURATION SERVER
*/
	var
		   express 		= require('express')
		 , app 	   		= express()
		 , server  		= require('http').createServer(app)
     , io         = require('socket.io').listen(server);


     server.listen(5886);

     io.sockets.on('connection', function(socket){
            socket.on('send message', function(data){
              io.sockets.emit('new message', data);
              //   socket.broadcast.emit('new message', data);
            })
     })

		//  var allowCors = function(req, res, next){
     //
		//  		res.header('Access-Control-Allow-Origin','*');
		// 		res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
		// 		res.header('Access-Control-Allow-Headers','Content-Type, control-access-credentials');
		// 		res.header('Access-Control-Allow-Credentials','true');
		// 		next();
		//  }
     //
		//    app.listen(port);
		//    app.use(allowCors);
     //
     //
			console.log('conectado a porta ' + 4000);


		//  var allowCors = function(req, res, next){
     //
		//  		res.header('Access-Control-Allow-Origin','*');
		// 		res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
		// 		res.header('Access-Control-Allow-Headers','Content-Type, control-access-credentials');
		// 		res.header('Access-Control-Allow-Credentials','true');
		// 		next();
		//  }
     //
		//    app.listen(port);
		//    app.use(allowCors);
     //
     //
			console.log('conectado a porta ' + 4000);



// /**
// *
// * @Router Config Server
// * @author Erick Eduardo - __@erick
// * @private  CONFIGURATION SERVER SOCKET.IO
// */
// 	var
// 		   appIO 			  = require('express')
// 	   , server  		= require('http').createServer(appIO)
//      , io         = require('socket.io').listen(server);
//
//       server.listen(5886);
// 	 	 	io.sockets.on('connection', function(socket){
// 	            socket.on('send message', function(data){
// 	              io.sockets.emit('new message', data);
// 	              //   socket.broadcast.emit('new message', data);
// 	            })
// 	     })
