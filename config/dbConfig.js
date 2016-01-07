
/** 
* 
* @Router Config Db 
* @author Erick Eduardo - __@erick
* @private 
*/ 
	var  
		  mongoose = require('mongoose')
		, dbString = 'mongodb://127.0.0.1/api';

		  mongoose.connect(dbString);

	var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'Falha na Conexão'));	  