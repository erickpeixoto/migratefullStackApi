
/**
*
* @Router Controller Io
* @author Erick Eduardo - __@erick
* @private
*/
	var Model = require('../model/ioOrderModel');

		 	exports.post = function(post, callback){

		 			new Model.OrderIo({
								client: {
								 							id: 	 post.body.client.id
								 						, email: post.body.client.email
								 		}
								 	, order: {
								 							id: 	  post.body.order.id
								 						, status: post.body.order.status
								 					}

							}).save(function(error, order){
									if(error){
											callback({error: "Fail to enter data"})
										}else{
											callback(order);
									}
							})
		 }
