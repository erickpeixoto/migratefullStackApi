
/** 
* 
* @Router Controller - Requests 
* @author Erick Eduardo - __@erick
* @private  
*/ 
	var cepController 	 = require('./cepController');
	var mailerController = require('./mailerController');

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
						}	
		}