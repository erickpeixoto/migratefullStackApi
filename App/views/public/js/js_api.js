/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pelo gerenciamento de Api's
   *
   **/

      function getApiCep(CEP, callback){

                  $.ajax({
                          url:  __GETLocalStorage('CONFIG').API.CEP + CEP,
                          type: 'GET',
                          dataType: 'json',
                          headers: __GETLocalStorage('CONFIG').CREDENTIAL_API
                         })
                         .fail(function(error) {  callback(error);  })
                         .always(function(json) { callback(json);   });
      }



      function getApiMailer(EMAIL, callback){

                  $.ajax({
                          url:  __GETLocalStorage('CONFIG').API.MAILER,
                          type: 'POST',
                          dataType: 'json',
                          headers: __GETLocalStorage('CONFIG').CREDENTIAL_API,
                          data: EMAIL,
                         })
                         .fail(function(error) {  callback(error);  })
                         .always(function(json) { callback(json);   });
      }
