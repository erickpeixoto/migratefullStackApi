
/**
*
* @Router Controller Security
* @author Erick Eduardo - __@erick
* @private
*/
	module.exports = function(req, res, next){

			if(req.headers['controlAccessToken'] == "uxPg+jaskjhdkajshdkqweqweqweq="){

						return next();
				}else{
	  					return res.status(401).json({message: 'Token Inválido'})

			}
		}
