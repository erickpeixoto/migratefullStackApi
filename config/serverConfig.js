/** 
* 
* @Router Config Server  
* @author Erick Eduardo - __@erick
* @private  CONFIGURATION SERVER
*/ 
	var 
		   express 		= require('express')
		 , app 	   		= module.exports = express()
		 , bodyParser   = require('body-parser')
		 , port    		= process.env.PORT || 5888;

		 var allowCors = function(req, res, next){

		 		res.header('Access-Control-Allow-Origin','*');
				res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
				res.header('Access-Control-Allow-Headers','Content-Type, control-access-credentials');
				res.header('Access-Control-Allow-Credentials','true');
				next();			
		 }

		   app.listen(port);
		   app.use(allowCors);
		   app.use(bodyParser.json());
		   app.use(bodyParser.urlencoded({

				extended: true
			}));
	
				console.log('conectado a porta ' + port); 