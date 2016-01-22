/**
*
* @API RESTFUL
* @copyright Erick Eduardo
* @private - GET CEP
*/
	var
			app 				 = require('./config/serverConfig')
		, express 		 = require('express')
		, validator  	 = require('validator')
		, router 			 = express.Router()
		, routesController 	 = require('./controller/routeController')
		, securityController = require('./controller/securityController');


	app.use('/', router);

	router.route('/cep/:id')
		  .get(securityController,routesController.getCep);

	router.route('/send/')
		  .post(securityController,routesController.postMailer);



			/**
			*
			* @Router Config Server
			* @author Erick Eduardo - __@erick
			* @private  CONFIGURATION SERVER IO
			*/
				var
					   expressIO 		= require('express')
					 , appIO 	   		= express()
					 , server  		= require('http').createServer(appIO)
			     , io         = require('socket.io').listen(server);

			     server.listen(3333);
			     io.sockets.on('connection', function(socket){
			            socket.on('send message', function(data){
			              io.sockets.emit('new message', data);
			              //   socket.broadcast.emit('new message', data);
			            })
			     })
