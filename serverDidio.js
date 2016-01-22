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

//
// /**
// *
// * @API RESTFUL
// * @copyright Erick Eduardo
// * @private - GET CEP
// */
// 	var
// 			app 				 = require('./config/serverConfig')
// 		, io 			  	 = require('./config/serverIo')
// 		, express 		 = require('express')
// 		, validator  	 = require('validator')
// 		, router 			 = express.Router()
// 		, routesController 	 = require('./controller/routeController')
// 		, securityController = require('./controller/securityController');
//
//
// 	app.use('/', router);
//
// 	router.route('/cep/:id')
// 		  .get(securityController,routesController.getCep);
//
// 	router.route('/send/')
// 		  .post(securityController,routesController.postMailer);
