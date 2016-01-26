
/**
*
* @Router Model Notification.IO Order
* @author Erick Eduardo - __@erick
* @private
*/

    /**
     * @author Erick Eduardo - __@erick
     * @import Config DataBase
     */
        require('../config/dbConfig');

       var mongoose = require('mongoose')
    	 	 , db   	  = mongoose.connection;

         db.once('open', function(){

           /**
            * @Schema Notification.IO Order
            * @author Erick Eduardo - __@erick
            */
              var OrderIoSchema = mongoose.Schema({

                       client: {
                                  id: { type: String, default: ''}
                                , email: { type: String, default: ''}
                        }
                      , order: {
                                  id: { type: String, default: ''}
                                , status:  { type: String, default: ''}
                              }
                      , created_at: { type: Date, default: Date.now}
              })
                exports.OrderIo = mongoose.model('OrderIo', OrderIoSchema);
         })
