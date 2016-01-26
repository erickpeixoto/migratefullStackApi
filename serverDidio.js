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
		, routeController 	 = require('./controller/routeController')
		, securityController = require('./controller/securityController');


	app.use('/', router);

	router.route('/cep/:id')
		  .get(securityController,routeController.getCep);
	router.route('/send/')
		  .post(securityController,routeController.postMailer);
router.route('/io/order/')
			.post(securityController,routeController.postNotification)
