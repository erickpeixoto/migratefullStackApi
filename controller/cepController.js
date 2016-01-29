
/**
*
* @Router Controller Cep
* @author Erick Eduardo - __@erick
* @private
*/
	var
		 Model = require('../model/cepModel');


		 exports.get = function(getCep, callback){

		 		var cepParam = getCep.params.id.replace('-','');

				 		Model.Cep.findOne({ "cep": cepParam },function(error, cep){

				 			if(error){
				 					callback({error: 'Falha ao retornar cep'})
				 			}else{
				 					callback((cep) ? cep : false);
				 			}
				 		})
		 };
