
/** 
* 
* @Router Controller Security 
* @author Erick Eduardo - __@erick
* @private 
*/ 
	module.exports = function(req, res, next){

			if(req.headers['control-access-credentials'] == "uxPg+PE2uG2VqXe6bSg2rysL1j0="){

						return next();
				}else{
	  					return res.status(401).json({message: 'Token Inválido'})

			}
		}




