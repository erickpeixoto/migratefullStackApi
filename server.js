
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
