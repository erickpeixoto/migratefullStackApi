    

        xRTML.Config.debug=false;

                            var connection = {
                              id:'myConnection',
                              appKey:'SRbjCt',
                              authToken:'r6h5N2zxpM3X',
                              url:'http://ortc-developers.realtime.co/server/2.1',
                              channels:[{name:'myChannel'}]
                            } 


                            // CONECTANDO
                            xRTML.ready(function () {
                                xRTML.ConnectionManager.create(connection);
                            });


                             // SENDER
                            function sendMessage(RETURN){
                              var msg = {
                                    trigger: 'myTrigger',
                                    action: '',
                                    data: RETURN
                                };      
                                var xrtmlMessage = xRTML.MessageManager.create(msg);
                                xRTML.ConnectionManager.sendMessage({connections: ['myConnection'], channel:'myChannel', content:xrtmlMessage});
                            }



                                
                            // GET
                            xRTML.Config.debug=false;

                              var RESTFULL =  {  
                                                  OPERATION:  null,
                                                  SERVICE:    null,
                                                  POST:       null
                                               }   

                                     
                                   
                            var connection = {

                                    id:'myConnection', 
                                    appKey:'SRbjCt', 
                                    authToken:'r6h5N2zxpM3X', 
                                    url:'http://ortc-developers.realtime.co/server/2.1', 
                                    channels:[{name:'myChannel'}], //The channels which this Connection will be monitoring for incoming messages.
                                    onMessage: function(e){ 
                                  //What to do when a message arrives through one of the subcribed channels.
                              
                                    var DATA = xRTML.JSON.parse(e.message).xrtml.d;

                                                  switch(DATA.TYPE){

                                                        case 'INSERT_PROJETO':

                                                              RESTFULL['OPERATION'] = DATA.POST.OPERATION;
                                                              RESTFULL['SERVICE'] = DATA.POST.SERVICE;
                                                              RESTFULL['POST'] = DATA.POST.POST;
                                                              __setNotification(RESTFULL);                                                                                                              
                                                     
                                                        break;
                                                        

                                                        case 'REMOVE_NOTIFICATION':

                                                              removeLocalStorage(DATA.HELPER,'CALLBACK');
                                                              __AddLocalStorage(DATA.POST,'CALLBACK');
                                                             callbackNotification(); 
                                                        break;
                                                  }


                                               
                                                
                                     }
                            }

