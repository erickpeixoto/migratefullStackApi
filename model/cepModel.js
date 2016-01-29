
/**
*
* @Router Model Cep
* @author Erick Eduardo - __@erick
* @private
*/

	require('../config/dbConfig');

	var
		  mongoose = require('mongoose')
		, db   	   = mongoose.connection;

		  db.once('open', function(){

	  		  /**
					* @Schema Cep
					* @author Erick Eduardo - __@erick
					*/
						var CepSchema = mongoose.Schema({

										  cep: 		      String,
										  logradouro: 	String,
										  bairro: 	  	String,
										  localidade: 	String,
										  uf: 		   	  String,
									    complemento:  String,
									    tipo_logradouro: String
									})

							exports.Cep = mongoose.model('Cep', CepSchema);
})
