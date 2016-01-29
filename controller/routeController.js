
/**
*
* @Router Controller - Requests
* @author Erick Eduardo - __@erick
* @private
*/
	var
			cepController 	   = require('./cepController')
		, mailerController   = require('./mailerController')
	  , ioController 		   = require('./ioController')
		, modulesController  = require('./modulesController');

		module.exports = {

				  /**
					*
					* @Router Cep
					* @author Erick Eduardo - __@erick
					*/
						getCep: function(req, res){
									cepController.get(req, function(resp){
											res.json(resp);
									})
						},


				  /**
					*
					* @Router E-mail
					* @author Erick Eduardo - __@erick
					*/
						postMailer: function(req, res){
								mailerController.send(req, function(resp){
										res.json(resp);
								})
						},


				  /**
					*
					* @Router IO
					* @author Erick Eduardo - __@erick
					*/
					postNotification: function(req, res){
							ioController.post(req, function(resp){
										res.json(resp)
							})
						},

						/**
						*
						* @Router IO
						* @author Erick Eduardo - __@erick
						*/
						checkModules: function(req, res){
								ioController.post(req, function(resp){
											res.json(resp)
								})
							}
		}
