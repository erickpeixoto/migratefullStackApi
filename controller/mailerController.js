
/** 
* 
* @Router Controller - Requests 
* @author Erick Eduardo - __@erick
* @private  
*/ 
	
	var
	     nodemailer     = require("nodemailer")
  	   , smtpTransport  = require('nodemailer-smtp-transport');
    	 process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	
	
		exports.send = function(sendEmail, callback){

				var _SEND = sendEmail.body;


  		 /** 
			* @Router Controller - Config Count Sender 
			* @author Erick Eduardo - __@erick
			*/ 
				var transport = nodemailer.createTransport((smtpTransport({
									  host: "mail.portalpizzahut.com.br",
									  secureConnection: false, 
									  port: 587, 
									  auth: {
									    user: "no-reply@portalpizzahut.com.br",
									    pass: "nore2125"
									  }
									})));		


				var mailOptions = {
								    from: _SEND.header +' <no-reply@portalpizzahut.com.br>',
								    to: _SEND.to, 
								    bcc: _SEND.cc, 
								    subject: _SEND.subject, 
								    html: _SEND.html
								};		
					
					transport.sendMail(mailOptions, function(error, info){
					
					    		callback({return : (!error) ? true : false})	
						});
		}