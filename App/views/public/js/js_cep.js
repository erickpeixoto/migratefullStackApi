/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pelo gerenciamento de Cep's
   *
   **/

      $(function(){
      	
             // INITIALIZE
              searchCep();
              dropCheckCep();
              checkCEP();
      	})




function getCep(LOJAS){
        $.ajax({
            
            url: __GETLocalStorage('CONFIG').API.SQL,
            type: 'GET',
            data: {
                AJAX: true,
                SERVICE: 'CEP',
                METHOD: 'GET',
                OPERATION: 'ALL',
                DATA: LOJAS},
          })
          .done(function(){})
          .fail(function(){})
          .always(function(response){
          var DATA = JSON.parse(response);
              __SETLocalStorage('CEPS', DATA);
         
          })
}





/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pela pesquisa offline do CEP
   *
   **/
        function searchCep(){
        
             $('[action="check-cep"]').closest('form').submit(function(event) {
                     
                       event.preventDefault();
                       var CEP_CHECK = $('[name="CHECK-CEP"]').cleanVal();
                       var CEPS = __GETLocalStorage('CEPS');
                       var _RESPONSE = false;
                                      

                         $.each(CEPS, function(loja, DATA) {
                                        
                                  $.each(DATA, function(i, CEP) {
                                                                 
                                                                                     
                                          if(CEP_CHECK == CEP.RCA_CEP){
                                                  LOJA_ATENDENTE = getLojaIn(loja);
                                                  $('header #layer').hide();
                                                  $('[data-value="name-loja"]').text(LOJA_ATENDENTE.REST_NOME);
                                                  $('.lojainfo').html('Loja:'+LOJA_ATENDENTE.REST_NOME);
                                                  $('a.checkout').removeClass('hide');
                                                   _RESPONSE = true;
                                                  
                                                  // $.getJSON('http://viacep.com.br/ws/'+CEP.RCA_CEP+'/json/', function(json, textStatus) {
                                                      getApiCep( CEP.RCA_CEP , function(json){
                                                                                                                   
                                                            __SETLocalStorage('ATENDENTE', [{'LOJA':LOJA_ATENDENTE,'CEP': json}]);  

                                                             if(!getStatusLoja(LOJA_ATENDENTE.REST_ID)){
                                                                    alert('<big><i class="flaticon-warning37"></i></big>', 'Atenção, a loja que atende seu CEP encontra-se fora do horário de atendimento.');
                                                                    
                                                                }

                                                           
                                                   });

                                          }
                          })
             })

        if(!_RESPONSE){  alert('Endereço não encontrado.')  }
})


/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access local
   *   @exemplel Verificação de CEP
   *
   **/
        $(document).on('focusout', '[name="cep-address"]', function(event) {
                        
                    var $cep  = $(this).cleanVal();
                    var $this = $(this);

                    
                               
                                    if(!/^[0-9]{8}$/.test($cep) && $cep.length > 0){

                                               alert('<big><i class="fa fa-hand-paper-o"></i></big>', 'Por gentileza, verifique o CEP fornecido.' );
                                               $this.val('');

                                        }else{
                                                
                                          // $.getJSON('http://viacep.com.br/ws/'+$cep+'/json/', function(json, textStatus) {
                                              getApiCep( $cep , function(json){
                                              
                                          
                                                if(json.error  && $cep.length > 0){
                                                       
                                                         alert('<big><i class="fa fa-hand-paper-o"></i></big>','Por gentileza, verifique o CEP fornecido.' );
                                                        $this.val('');

                                                  }else{
                                                              var CEPS = __GETLocalStorage('CEPS'); 
                                                              var _responseValidateLocal = false;

                                                                $.each(CEPS, function(loja, DATA) {
                        
                                                                                  $.each(DATA, function(i, CEP) {
                                                                                                                 
                                                                                          if($cep == CEP.RCA_CEP){
                                                                                            
                                                                                                          __SETLocalStorage('ATENDENTE', [{'LOJA': getLojaIn(loja),'CEP': json}]);  

                                                                                                  _responseValidateLocal = true;
                                                                                                 setInputAddress(json, true);

                                                                                                   if(!getStatusLoja(loja)){
                                                                                                                alert('<big><i class="flaticon-warning37"></i></big>', 'Atenção, a loja que atende seu CEP encontra-se fora do horário de atendimento.');
                                                                                                                
                                                                                                            }


                                                                                          }
                                                                                  })
                                                                          })
                                                                  if(!_responseValidateLocal  && $cep.length > 0){ 
                                                                          
                                                                           alert('<big><i class="flaticon-warning37"></i></big>', 'Infelizmente no momento não possuimos atendimento para o seu CEP.');
                                                                           $this.val('');
                                                                   }
                                                  }
                                              })
                                         }
                            
                 })

      }




/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End Drop Layer
   *
   **/

      function dropCheckCep(){
          
           $(document).on('click', '[data-value="name-loja"]', function(event) {
          
                event.preventDefault();
                      $('#layer').toggle();
           
           })
      }





/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End de checagem 
   *
   **/

      function checkCEP(){


          $(document).on('submit', 'form[submit="check-cep-cadastro"]', function(event) {
            
                          event.preventDefault();

                   

                        $form   = $(this);
                        $button = $(this).find('button');
                        $cep  = $(this).find('input[name="CEP"]').cleanVal();
                        $boxAddress  = $('[box="address-usuario"]');
                        $service = false;
                        $controlAlert = false;

                        var buttonValue = $button.text();


                              if(!/^[0-9]{8}$/.test($cep)){

                                         alert('O formato digitado: '+ $cep +'  está incorreto. Por favor, digite um cep válido.');
                                          $('form[submit="cadastro-cliente"] button').attr('disabled', true).text('Verifique o Cep preenchido');
                            }else{

                                    if(($cep == '')){

                                              alert('Por favor, Digite o CEP para continuar.');
                                       
                                      }else{
                                              
                                              $button.text('Verificando...');

                                              getApiCep( $cep , function(json){
                                              
                                              // $.getJSON('http://viacep.com.br/ws/'+ $cep +'/json/', function(json, textStatus) { 

                                                    $button.text(buttonValue);

                                                        if(json.error){

                                                              alert('O cep fornecido não foi reconhecido, tem certeza que o número está correto?');
                                                          
                                                              $controlAlert = true;

                                                            }else{

                                                              $boxAddress.fadeIn();

                                                                  var CEPS = __GETLocalStorage('CEPS'); 

                                                                      $.each(CEPS, function(loja, DATA) {
                                                                                                 
                                                                                $.each(DATA, function(i, CEP) {
                                                                                       
                                                                                        if($cep == CEP.RCA_CEP){  

                                                                                             
                                                                                                $('[target="Cadastro"]').click();
                                                                                                 $service = true;
                                                                                                 $controlAlert = true;
                                                                                                  setInputAddress(json, true);

                                                                                       

                                                                                                    /***
                                                                                                       *   @author __@erick
                                                                                                       *   @this  CARREGANDO ENDEREÇOS CADASTRADOS
                                                                                                       **/
                                                                                                          
                                                                                                            LOJA_ATENDENTE = getLojaIn(loja);

                                                                                                                $('header #layer').hide();
                                                                                                                $('[data-value="name-loja"]').text(LOJA_ATENDENTE.REST_NOME);
                                                                                                                $('.lojainfo').html('Loja:'+LOJA_ATENDENTE.REST_NOME);
                                                                                                                $('a.checkout').removeClass('hide');

                                                                                                        __SETLocalStorage('ATENDENTE', [{'LOJA':LOJA_ATENDENTE,'CEP': json}]); 

                                                                                                                    if(!getStatusLoja(LOJA_ATENDENTE.REST_ID)){
                                                                                                                        alert('<big><i class="flaticon-warning37"></i></big>', 'Atenção, a loja que atende seu CEP encontra-se fora do horário de atendimento.');
                                                                                                                        
                                                                                                                    }


                                                                                                        setTimeout(function() {$('form[submit="cadastro-cliente"]').removeClass('hide');}, 100);
                                                                                                    
                                                                          
                                                                                        }
                                                                                })
                                                                         })
                                                            }

                                                                    
                                                                    if(!$controlAlert){  
                                                                                 
                                                                                 $('[list="lojas-togo"]').find('li:first').click();
                                                                                  // $('form[submit="cadastro-cliente"]').removeClass('hide');
                                                                                  $('form[submit="cadastro-togo"]').removeClass('hide');
                                                                                  $('[container="address-user-finaliza"]').addClass('hide');
                                                                                  $('form[submit="cadastro-cliente"]').addClass('hide');
                                                                                  $('[target="Cadastro"]').click();
                                                                                  alert('<big><i class="flaticon-warning37"></i></big>', 'Atenção, no momento não possuimos atendimento para o seu CEP. <br>Para processar seu pedido, você deverá retirá-lo em uma de nossas lojas.');
                                                                                  
                                                                      }else{
                                                                                  $('form[submit="cadastro-cliente"]').addClass('hide');
                                                                                  $('form[submit="cadastro-togo"]').addClass('hide');
                                                                                  $('[container="address-user-finaliza"]').addClass('hide');

                                                                      }         
                                            })
                                    } 
                              }
          })
    }




/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Populando valores no formulário
   *
   **/

      function setInputAddress(DATA, DISABLED){

             $dataReturn = DATA;
              $inputCep    = $('[name="cep-address"]');
              $inputRua    = $('[name="rua-address"]');
              $inputBairro = $('[name="bairro-address"]');
              $inputEstado = $('[name="uf-address"]');
              $inputCidade = $('[name="localidade-address"]');
              
              $inputCep.val($dataReturn.cep).addClass('bold');
              $inputRua.val($dataReturn.logradouro).addClass('bold');
              $inputBairro.val($dataReturn.bairro).addClass('bold');
              $inputEstado.val($dataReturn.uf).addClass('bold');
              $inputCidade.val($dataReturn.localidade).addClass('bold');

          if(DISABLED){
              
              $inputRua.attr('disabled', true);
              $inputBairro.attr('disabled', true);
              $inputEstado.attr('disabled', true);
              $inputCidade.attr('disabled', true);

          }
}











/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Validador de cep, percorrendo base local
   *
   **/
      function checkCepLocal(CEP_CHECK){


      if(CEP_CHECK && __GETLocalStorage('ACCESS')){

              var CEP = CEP_CHECK;
                        CEP_CHECK = CEP.replace("-","");
                
                     var CEPS = __GETLocalStorage('CEPS'); 

                       $.each(CEPS, function(loja, DATA) {
                                              
                                        $.each(DATA, function(i, CEP) {
                                                                       
                                                if(CEP_CHECK == CEP.RCA_CEP){
                                                        LOJA_ATENDENTE = getLojaIn(loja);
                                                        $('header #layer').hide();
                                                        $('[data-value="name-loja"]').text(LOJA_ATENDENTE.REST_NOME);
                                                        $('.lojainfo').html('Loja:'+LOJA_ATENDENTE.REST_NOME);
                                                        $('a.checkout').removeClass('hide');
                                                         
                                                        // $.getJSON('http://viacep.com.br/ws/'+CEP.RCA_CEP+'/json/', function(json, textStatus) {
                                                            getApiCep( CEP.RCA_CEP, function(json){
                                                                                                          
                                                            var ACCESS =  __GETLocalStorage('ACCESS');
                                                              if(ACCESS.CLI_CANAL_ECOMMERCE == "TGO"){
                                                          
                                                                         var ATENDENTE = [{ 
                                                                                              LOJA: LOJA_ATENDENTE,
                                                                                              TOGO: false
                                                                                         }]
                                                                  __SETLocalStorage('ATENDENTE', ATENDENTE);  

                                                              }else{

                                                                  __SETLocalStorage('ATENDENTE', [{'LOJA':LOJA_ATENDENTE,'CEP': json}]);  
                                                              }          
                                                                    getPedidoUser();  

                                                        });

                                                }
                                        })
                                })
        }
                 
      }




