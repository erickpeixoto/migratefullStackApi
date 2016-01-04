/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pelo gerenciamento de endereços
   *
   **/

$(function(){
  
      // INITIALIZE
      setAddress();
      formAddress();
      getUpdateForm();
      updateAddress();
      getDataAddress();      
      updateFinalizaAddress();
      setAddressFinaliza();


  })




  /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End responsável pelo gerenciamento de endereços
     *
     **/
        function getAddress(ID_USUARIO) {

           
                       $.ajax({
          
                            url: __GETLocalStorage('CONFIG').API.SQL,
                            type: 'GET',
                            data: {
                                AJAX: true,
                                SERVICE: 'ADDRESS',
                                METHOD: 'GET',
                                OPERATION: 'ALL',
                                REST: __GETLocalStorage('ATENDENTE'),
                                USER:ID_USUARIO},
                          })
                          .done(function(){})
                          .fail(function(){})
                          .always(function(response){
                                  
                                    getUser( __GETLocalStorage('LOJA'));
                                    
                                      var DATA = JSON.parse(response);
                                        __SETLocalStorage('ADDRESS', DATA);
                                          listAddress();

                          })
      }




   /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @exemple GET ADDRESS ID
     *
     **/
     function getInAddress(ID){

        var ADDRESS = __GETLocalStorage('ADDRESS');
        
        if(ADDRESS){
          for (var i = 0; i < ADDRESS.length; i++) {

            if(ADDRESS[i].CDA_ID == ID){
                      
              return ADDRESS[i]; 
            }
          }
        }

     }  




  /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End responsável pelo gerenciamento de endereços
     *
     **/
          function setAddress() {

              $(document).on('submit', 'form[submit="address"],form[submit="cadastro-address-cliente"]',function(event) {

                      event.preventDefault();
            
                             $form  = $(this); 

                               $inputCep     = $form.find('[name="cep-address"]');
                               $inputRua     = $form.find('[name="rua-address"]');
                               $inputBairro  = $form.find('[name="bairro-address"]');
                               $inputEstado  = $form.find('[name="uf-address"]');
                               $inputCidade  = $form.find('[name="localidade-address"]');
                               $inputCpfCnpj = $form.find('input[name="cpf-cnpj"]');

                            $inputRua.attr('disabled', false);
                            $inputBairro.attr('disabled', false);
                            $inputEstado.attr('disabled', false);
                            $inputCidade.attr('disabled', false);
                var $cep = $inputCep.val();
                            
                              $inputCep.val($cep.replace("-","")); 




                             $.ajax({
                
                                  url: __GETLocalStorage('CONFIG').API.SQL,
                                  type: 'POST',
                                  data: {
                                      AJAX: true,
                                      SERVICE: 'ADDRESS',
                                      METHOD: 'POST',
                                      OPERATION: 'INSERIR',
                                      DATA: $form.serialize(),
                                      REST: __GETLocalStorage('ATENDENTE'),
                                      USER: __GETLocalStorage('ACCESS')},
                                })
                                .done(function(){})
                                .fail(function(){})
                                .always(function(response){
                                    
                                      var DATA = JSON.parse(response);
                                       __AddLocalStorage(DATA,'ADDRESS');
                                         getUser(__GETLocalStorage('LOJA')); 
                                     

                                            // RENEW FORM
                                            var $boxAddress      = $('section[box="address-usuario"]'); 
                                            var $buttonUpdate    = $('button[action="create-address"]');
                                            var $form            = $boxAddress.closest('form');
                                            var $boxItemAddress  = $('ul[action="add-address"]');

                                                $boxAddress.addClass('hide');
                                                $form.attr('submit', 'update-cliente'); 
                                                $buttonUpdate.attr('action', 'update-usuario').text('Alterar');
                                                $boxItemAddress.find('li').removeClass('active');
                                                $('[submit="address-finaliza"]').addClass('hide');


                               
                                })
              })
   }



/***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End, popular inputs de form
     *
     **/
          function formAddress() {

                  $(document).on('click', 'button[target="MeusDados"]', function(event) {

                                  $dataAtendente  = __GETLocalStorage('ATENDENTE');
                                  $dataAtendente  = $dataAtendente[0]; 
                               
                                  $inputCep    = $('form[submit="cadastro-address-cliente"] [name="cep-address"]');
                                  $inputRua    = $('form[submit="cadastro-address-cliente"] [name="rua-address"]');
                                  $inputBairro = $('form[submit="cadastro-address-cliente"] [name="bairro-address"]');
                                  $inputEstado = $('form[submit="cadastro-address-cliente"] [name="uf-address"]');
                                  $inputCidade = $('form[submit="cadastro-address-cliente"] [name="localidade-address"]');
                                  
                                  $inputCep.val($dataAtendente.CEP.cep).addClass('bold');
                                  $inputRua.val($dataAtendente.CEP.logradouro).addClass('bold');
                                  $inputBairro.val($dataAtendente.CEP.bairro).addClass('bold');
                                  $inputEstado.val($dataAtendente.CEP.uf).addClass('bold');
                                  $inputCidade.val($dataAtendente.CEP.localidade).addClass('bold');
                  })
          }



  /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End Drop Address
     *
     **/
      
      function dropAddress(){

            $(document).on('click', '.selector', function(event) {
              


            })

      }








/***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End, GET UPDATE ADDRESS
     *
     **/
          function getUpdateForm() {
                             
              
                var $boxAddress   = $('section[box="address-usuario"]'); 
                var $labelAddress = $('section[box="address-usuario"] .alert'); 
                var $inputCep     = $('section[box="address-usuario"] [name="cep-address"]');
                var $inputRua     = $('section[box="address-usuario"] [name="rua-address"]');
                var $inputBairro  = $('section[box="address-usuario"] [name="bairro-address"]');
                var $inputEstado  = $('section[box="address-usuario"] [name="uf-address"]');
                var $inputCidade  = $('section[box="address-usuario"] [name="localidade-address"]');
                var $inputApelido = $('section[box="address-usuario"] [name="apelido-address"]');
                var $inputNumero  = $('section[box="address-usuario"] [name="numero-address"]');
                var $inputId      = $('section[box="address-usuario"] [name="ID"]');
                var $inputComplemento = $('section[box="address-usuario"] [name="complemento-address"]');
                var $inputRefencia    = $('section[box="address-usuario"] [name="referencia-address"]');
                var $buttonUpdate     = $('button[action="update-usuario"]');
                var $form             = $boxAddress.closest('form');
       


                  $(document).on('click', '[container="address-user"] span[list="address-usuario"] li', function(event) {

                                        var ID     = $(this).attr('data-id');
                                        var _RETURN = null;
                                                      $labelAddress.removeClass('alert-info')
                                                                     .addClass('alert-warning');

                                        $address  = __GETLocalStorage('ADDRESS');
                                          
                                            
                                           $.each($address, function(index, getAddress) {
                                                          
                                                      if(getAddress.CDA_ID == ID){
                                                          
                                                            _RETURN = getAddress;
                                                      }
                                           }) 
                                        
                                       $labelAddress.html(' <i class="flaticon-map103"></i> '+_RETURN.CDA_APELIDO);
                                       $('span[list="address-usuario"] li').removeClass('callback');
                                       $(this).addClass('callback');
                                       $(this).addClass('active');
                                       $inputCep.val(_RETURN.CDA_CEP); 
                                       $inputRua.val(_RETURN.CDA_LOGRADOURO);
                                       $inputBairro.val(_RETURN.CDA_BAIRRO);
                                       $inputEstado.val(_RETURN.CDA_UF);
                                       $inputCidade.val(_RETURN.CDA_CIDADE);
                                       $inputApelido.val(_RETURN.CDA_APELIDO);
                                       $inputNumero.val(_RETURN.CDA_NUMERO);
                                       $inputComplemento.val(_RETURN.CDA_COMPLEMENTO);
                                       $inputRefencia.val(_RETURN.CDA_REFERENCIA);
                                        $inputId.val(ID);
                                       $boxAddress.find('input,textarea').attr('disabled', false); 
                                       $form.attr('submit', 'update-address');
                                       $buttonUpdate.attr('action', 'update-address').text('Alterar Endereço');
                                      // $('form[submit="update-address"]').toggleClass('hidden')
                          
                  })

                  
                               // DROP CADASTRO 
                              $(document).on('click', '[container="address-user"] li[action="new-cadastro"]', function(event) {
                                     
                                      $boxAddress.removeClass('hidden');
                                      $form.attr('submit', 'cadastro-address-cliente'); 
                                      $boxAddress.find('input,textarea').val('').attr('disabled', false); 
                                      $labelAddress.toggleClass('alert-warning')
                                                   .toggleClass('alert-info');
                                      $labelAddress.html('<p>Preencha os campos do formulário abaixo</p>');
                                      $buttonUpdate.attr('action', 'create-address').text('Cadastrar Endereço');
                                      $('[submit="create-address-finaliza"]').find('input,textarea').val('').attr('disabled', false); 
                                      $form
                              })


                               // DROP CADASTRO 
                              $(document).on('click', 'li.callback', function(event) {

                                        $('.address li').removeClass('active');
                                        $('.address li').removeClass('callback');
                                        $boxAddress.addClass('hidden');

                               })


                              $(document).on('click','[target="Login"]', function(event) {
                                
                                            event.preventDefault();
                                            $boxAddress.fadeOut();
                                            $('.address li').removeClass('active');

                                })







       $(document).on('click', 'span[list="address-usuario"] li', function(event) {

                       



                                      var ID = $(this).attr('data-id');
                                      var _RETURN = null;

                                      $address  = __GETLocalStorage('ADDRESS');
                                         
                                         $.each($address, function(index, getAddress) {
                                           
                                                    if(getAddress.CDA_ID == ID){
                                                           _RETURN = getAddress;
                                                    }
                                         }) 

                                
                                          if(_RETURN.length > 0){  _RETURN.CDA_CEP = _RETURN.CDA_CEP.replace("-","");  }
                                        
                                            var CEPS = __GETLocalStorage('CEPS'); 
                                            var _responseValidateLocal = false;

                                            $.each(CEPS, function(loja, DATA) {

                                                            $.each(DATA, function(i, CEP) {

                                                                    if(_RETURN.CDA_CEP == CEP.RCA_CEP){
                                                                      
                                                                                   __SETLocalStorage('ATENDENTE', [{'LOJA': getLojaIn(loja),'CEP': _RETURN}]);  
                                                                                   listPgto(__GETLocalStorage('PEDIDO'));

                                                                                   if(!getStatusLoja(loja)){
                                                                                    if(!$('[view="Finaliza"]').hasClass('hidden')){ 

                                                                                      alert('<big><i class="flaticon-warning37"></i></big>', 'Atenção, a loja que atende seu CEP encontra-se fora do horário de atendimento.');
                                                                                    }

                                                                                  }
                                                                                }
                                                                              })
          })
      
        $('[data-container="Address"]').removeClass('hidden');

      })
}









/***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End, listagem de elementos
     *
     **/
   
        function listAddress(){
 
                 /***
                   *   @author Erick Eduardo[erick@accon.com.br]
                   *   @exemple ATRIBUTOS E OBJETOS
                   *
                   **/
                      $ADDRESS        =  __GETLocalStorage('BASE_ACCESS');
                      $ACCESS         =  __GETLocalStorage('ACCESS');
                      _addressLoja    =  [];
                      $boxListAddress = $('span[list="address-usuario"]')
                      $html = '';
                      $iAddress = null;
                       $('form[submit="address-finaliza"]').addClass('hide');

                /***
                   *   @author Erick Eduardo[erick@accon.com.br]
                   *   @access public
                   *   @exemple CRIACAO DE OBJETO COM TODOS OS ENDEREÇOS CADASTRADOS
                   *            FUNÇÃO PERCORRE TODAS AS BASES PARA VERIFICAÇÃO    
                   *
                   **/ 



                
                       if($ACCESS){
                            
                            $.each($ADDRESS, function(loja, users){
                                
                                      $.each(users, function(index, address){
                                         
                                            if($ACCESS.CLI_LOGIN == address.CLI_LOGIN){
                                                
                                                 address.ID_LOJA = loja;                                               
                                                _addressLoja.push(address);
                                          }
                                    })
                            })
                       }
              
                 
                 /***
                   *   @author Erick Eduardo[erick@accon.com.br]
                   *   @exemple CRIAÇÃO DO OBJETO COM OS ENDEREÇOS COLETADOS 
                   *
                   **/
                        __SETLocalStorage('ADDRESS',_addressLoja);
                  



                /***
                   *   @author Erick Eduardo[erick@accon.com.br]
                   *   @exemple ESTRUTURA DE REPETIÇÃO PARA CRIAR O HTML DAS VIEWS
                   *
                   **/
                        $Address = (!_addressLoja) ? [_addressLoja] : _addressLoja;
                          
                            if($Address.length > 0){

                                 $.each((($Address.length > 0) ? $Address.sort() : $Address), function(index, getAddress) {
                                        
                                      if(getAddress.CDA_TIPO == "WEB"){


                                                    if(index < 5){
                                                                       var _LOJA    = getLojaIn(getAddress.ID_LOJA);
                                                                       var statusAM = isAvailable(_LOJA.REST_ECOMMERCE_WEB_HORARIO_INI1, _LOJA.REST_ECOMMERCE_WEB_HORARIO_FIM1);
                                                                       var statusPM = isAvailable(_LOJA.REST_ECOMMERCE_WEB_HORARIO_INI2, _LOJA.REST_ECOMMERCE_WEB_HORARIO_FIM2);
                                                                       var status   = (statusAM) ? statusAM : statusPM;
                                                                    
                                                                        $html += '<li class="' + ((!status && !$('[view="Finaliza"]').hasClass('hidden') ) ? 'closedStore' : '' ) +'"   data-id="'+getAddress.CDA_ID+'">'+
                                                                                      // ((!status && !$('[view="Finaliza"]').hasClass('hidden')) ? '<strong class="target">Loja Indisponível</strong>\n' : '' ) +
                                                                                      '<i class="flaticon-map103"></i>'+
                                                                                      '<p>'+getAddress.CDA_APELIDO+'</p>'+
                                                                                  '</li>';
                                                                  }
                                                  
                                                    $iAddress = index;
                                          }
                                     })
                      }else{

                                $html = '';
                      }

                                 $boxListAddress.html($html);
                      
                              $('[container="address-user-finaliza"]').removeClass('hide');

         
                if($iAddress >= 4){
                            
                            $('li[action="new-cadastro"]').addClass('no-change').find('p').text('Número máximo atingido');
                            $('li[action="new-cadastro"]').removeClass('active').removeAttr('action').attr('title', 'Número máximo de endereços atingido');
                }else{

                            $('li[action="new-cadastro"]').removeClass('no-change').find('p').text('Adicionar');
                            $('li[action="new-cadastro"]').attr('action', 'new-cadastro').attr('title', 'Clique para cadastrar');


               }
                          
                      
        }








function updateAddress(){
      


      $(document).on('click', '[action="update-address"]', function(event) {

         var USER = __GETLocalStorage('ACCESS');
         var $controler = true;
         var $form      = $(this).closest('form');
         var $boxAddress = $('section[box="address-usuario"]'); 
         var ID = $boxAddress.find('[name="ID"]').val();
         var $labelAddress = $('section[box="address-usuario"] .alert'); 
  


             $inputCep     = $form.find('[name="cep-address"]');
             $inputRua     = $form.find('[name="rua-address"]');
             $inputBairro  = $form.find('[name="bairro-address"]');
             $inputEstado  = $form.find('[name="uf-address"]');
             $inputCidade  = $form.find('[name="localidade-address"]');
             $inputCpfCnpj = $form.find('input[name="cpf-cnpj"]');

                            $inputCep.attr('disabled', false);
                            $inputRua.attr('disabled', false);
                            $inputBairro.attr('disabled', false);
                            $inputEstado.attr('disabled', false);
                            $inputCidade.attr('disabled', false);
                var $cep = $inputCep.val();
                            
                              $inputCep.val($cep.replace("-","")); 


               event.preventDefault(); 

                              $.ajax({
                                      url: __GETLocalStorage('CONFIG').API.SQL,
                                      type: 'POST',
                                      data: {
                                          AJAX: true,
                                          SERVICE: 'ADDRESS',
                                          METHOD: 'PUT',
                                          OPERATION: 'ALTERAR',
                                          DATA: $form.serialize(),
                                          ID: USER.CLI_ID,
                                          REST: __GETLocalStorage('ATENDENTE')},
                                    })
                                    .done(function(){
                          
                                            $inputCep.attr('disabled', true);
                                            $inputRua.attr('disabled', true);
                                            $inputBairro.attr('disabled', true);
                                            $inputEstado.attr('disabled', true);
                                            $inputCidade.attr('disabled', true);

                                    })
                                    .fail(function(){})
                                    .always(function(response){
                                       
                                             
                                               var DATA = JSON.parse(response);
                              
                                                   if(DATA){
                                                      
                                                         getAddress(USER.CLI_ID);
                                                         alert('<big><i class="fa fa-thumbs-up"></i>', 'O Endereço foi alterado com sucesso!' );


                                                 
                                                 }
                                    })
        })
}















function updateFinalizaAddress(){
      

      $(document).on('submit', 'form[submit="address-finaliza"]', function(event) {

         var USER = __GETLocalStorage('ACCESS');
         var $controler = true;
         var $form      = $(this);
         var $boxAddress = $('form[submit="address-finaliza"] '); 
         var ID = $boxAddress.find('[name="ID"]').val();
         var $labelAddress = $('form[submit="address-finaliza"] .alert'); 
            
             $inputCep     = $form.find('[name="cep-address"]');
             $inputRua     = $form.find('[name="rua-address"]');
             $inputBairro  = $form.find('[name="bairro-address"]');
             $inputEstado  = $form.find('[name="uf-address"]');
             $inputCidade  = $form.find('[name="localidade-address"]');
             $inputCpfCnpj = $form.find('input[name="cpf-cnpj"]');

                            $inputCep.attr('disabled', false);
                            $inputRua.attr('disabled', false);
                            $inputBairro.attr('disabled', false);
                            $inputEstado.attr('disabled', false);
                            $inputCidade.attr('disabled', false);
                var $cep = $inputCep.val();
                           $inputCep.val($cep.replace("-","")); 


               event.preventDefault(); 

                              $.ajax({
                                      url: __GETLocalStorage('CONFIG').API.SQL,
                                      type: 'POST',
                                      data: {
                                          AJAX: true,
                                          SERVICE: 'ADDRESS',
                                          METHOD: 'PUT',
                                          OPERATION: 'ALTERAR',
                                          DATA: $form.serialize(),
                                          ID: USER.CLI_ID,
                                          REST: __GETLocalStorage('ATENDENTE')},
                                    })
                                    .done(function(){

                                            $inputCep.attr('disabled', true);
                                            $inputRua.attr('disabled', true);
                                            $inputBairro.attr('disabled', true);
                                            $inputEstado.attr('disabled', true);
                                            $inputCidade.attr('disabled', true);
                                    })
                                    .fail(function(){})
                                    .always(function(response){
                                       

                                               var DATA = JSON.parse(response);
                              
                                                 if(DATA){
                                                      
                                                         getAddress(USER.CLI_ID);
                                                         alert('<big><i class="fa fa-thumbs-up"></i>', 'O Endereço foi alterado com sucesso!' );


                                                 
                                                 }
                                    })
        })
}






  /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End responsável pelo gerenciamento de endereços
     *
     **/
          function setAddressFinaliza() {

            
              $(document).on('submit', 'form[submit="create-address-finaliza"]',function(event) {
            
                      event.preventDefault();
            
                             $form  = $(this); 
                             $inputCep     = $form.find('[name="cep-address"]');
                             $inputRua     = $form.find('[name="rua-address"]');
                             $inputBairro  = $form.find('[name="bairro-address"]');
                             $inputEstado  = $form.find('[name="uf-address"]');
                             $inputCidade  = $form.find('[name="localidade-address"]');
                             $inputCpfCnpj = $form.find('input[name="cpf-cnpj"]');

                                            $inputCep.attr('disabled', false);
                                            $inputRua.attr('disabled', false);
                                            $inputBairro.attr('disabled', false);
                                            $inputEstado.attr('disabled', false);
                                            $inputCidade.attr('disabled', false);
                                var $cep = $inputCep.val();
                                           $inputCep.val($cep.replace("-","")); 



                             $.ajax({
                
                                  url: __GETLocalStorage('CONFIG').API.SQL,
                                  type: 'POST',
                                  data: {
                                      AJAX: true,
                                      SERVICE: 'ADDRESS',
                                      METHOD: 'POST',
                                      OPERATION: 'INSERIR',
                                      DATA: $form.serialize(),
                                      REST: __GETLocalStorage('ATENDENTE'),
                                      USER: __GETLocalStorage('ACCESS')},
                                })
                                .done(function(){
                                        
                                            $inputCep.attr('disabled', true);
                                            $inputRua.attr('disabled', true);
                                            $inputBairro.attr('disabled', true);
                                            $inputEstado.attr('disabled', true);
                                            $inputCidade.attr('disabled', true);

                                })
                                .fail(function(){})
                                .always(function(response){
                                    
                                      var DATA = JSON.parse(response);
                                         getUser(__GETLocalStorage('LOJA'));  
                                          
                                           $('[submit="create-address-finaliza"]').addClass('hide')
                                           $('[action="new-cadastro"]').removeClass('active');
                                })
              })
   }








/***
   *   @author Erick Eduardo - Accon Software Corporativo
   *   @access public
   *   @exemple  METHOD DE UPDATE 
   **/
      function renoveUpdateAddress(RESPONSE){

            var getStorage   = __GETLocalStorage('ADDRESS'); 
             for(i = 0; i < getStorage.length; i++){
                          
                   if(getStorage[i].CDA_ID == RESPONSE.CDA_ID){
                      
                          getStorage.splice(i, 1);
                          getStorage.splice(i, 0, RESPONSE);
                                
                    }                           
              }

         __SETLocalStorage('ADDRESS',getStorage);
}






      function getAddressUserPedido(ID){

             var $ADDRESS = __GETLocalStorage('ADDRESS');
             var _RETURN = null;

              $.each($ADDRESS, function(index, getAddress) {
                      
                     if(getAddress.CDA_ID == ID){


                            _RETURN = getAddress;
                      }
              })

              return _RETURN;
}







function getDataAddress(){


                
              $(document).on('click','.address-user-finaliza li', function(){

                      
                          var $labelAddress  = $('form[submit="address-finaliza"] .alert'); 
                          var $formCadastro  = $('form[submit="create-address-finaliza"]');
                          var $form          = $('form[submit="address-finaliza"]');
                          var $boxAddress    = $('form[submit="address-finaliza"]'); 
                          var $inputCep      = $('form[submit="address-finaliza"] [name="cep-address"]');
                          var $inputRua      = $('form[submit="address-finaliza"] [name="rua-address"]');
                          var $inputBairro   = $('form[submit="address-finaliza"] [name="bairro-address"]');
                          var $inputEstado   = $('form[submit="address-finaliza"] [name="uf-address"]');
                          var $inputCidade   = $('form[submit="address-finaliza"] [name="localidade-address"]');
                          var $inputApelido  = $('form[submit="address-finaliza"] [name="apelido-address"]');
                          var $inputNumero   = $('form[submit="address-finaliza"]  [name="numero-address"]');
                          var $inputId       = $('form[submit="address-finaliza"]  [name="ID"]');
                          var $inputComplemento = $('form[submit="address-finaliza"]  [name="complemento-address"]');
                          var $inputRefencia    = $('form[submit="address-finaliza"] [name="referencia-address"]');
                            

                              $formCadastro.addClass('hide');

                                       $('li[action="new-cadastro"]').removeClass('active');
                                       $('.address-user-finaliza li').removeClass('active');
                                       $(this).toggleClass('active');
 

                              var ID = $(this).attr('data-id');
                              var _RETURN = null;
                             
                              $labelAddress.removeClass('alert-info')
                                           .addClass('alert-warning');

                              $address  = __GETLocalStorage('ADDRESS');
                                
                                  
                              $.each($address, function(index, getAddress) {
                                          
                                          if(getAddress.CDA_ID == ID){

                                                _RETURN = getAddress;
                                          }
                              }) 
                              

                             $labelAddress.html(' <i class="flaticon-map103"></i> '+_RETURN.CDA_APELIDO);
                             $inputCep.val(_RETURN.CDA_CEP); 
                             $inputRua.val(_RETURN.CDA_LOGRADOURO);
                             $inputBairro.val(_RETURN.CDA_BAIRRO);
                             $inputEstado.val(_RETURN.CDA_UF);
                             $inputCidade.val(_RETURN.CDA_CIDADE);
                             $inputApelido.val(_RETURN.CDA_APELIDO);
                             $inputNumero.val(_RETURN.CDA_NUMERO);
                             $inputComplemento.val(_RETURN.CDA_COMPLEMENTO);
                             $inputRefencia.val(_RETURN.CDA_REFERENCIA);
                             $inputId.val(ID);
                            
                             $form.removeClass('hide');    
      
                   })


             



                  $(document).on('click','li[action="new-cadastro"]', function(){

                         
                              $('[data-container="Address"]').removeClass('hidden'); 
                          var $formUpdate   = $('form[submit="address-finaliza"]');
                          var $form         = $('form[submit="create-address-finaliza"]');
                          var $labelAddress = $form.find('.alert'); 
                          var $boxAddress   = $('form[submit="create-address-finaliza"]'); 
                          var $inputCep         = $form.find('[name="cep-address"]');
                          var $inputRua         = $form.find('[name="rua-address"]');
                          var $inputBairro      = $form.find('[name="bairro-address"]');
                          var $inputEstado      = $form.find('[name="uf-address"]');
                          var $inputCidade      = $form.find('[name="localidade-address"]');
                          var $inputApelido     = $form.find('[name="apelido-address"]');
                          var $inputNumero      = $form.find('[name="numero-address"]');
                          var $inputId          = $form.find('[name="ID"]');
                          var $inputComplemento = $form.find('[name="complemento-address"]');
                          var $inputRefencia    = $form.find('[name="referencia-address"]');
                        
                                      $formUpdate.addClass('hide');
                                       $('.address-user-finaliza li').removeClass('active');
                                       $(this).addClass('active');


                              var ID = $(this).attr('data-id');
                              var _RETURN = null;
                             
                              $labelAddress.removeClass('alert-info')
                                           .addClass('alert-warning');

                              $address  = __GETLocalStorage('ADDRESS');
                                
                                  
                              $.each($address, function(index, getAddress) {
                                          
                                          if(getAddress.CDA_ID == ID){

                                                _RETURN = getAddress;
                                          }
                              }) 

                              
                             $labelAddress.html(' Preencha o formulário abaixo para adiconar um endereço ');
                             $inputCep.val(''); 
                             $inputRua.val('');
                             $inputBairro.val('');
                             $inputEstado.val('');
                             $inputCidade.val('');
                             $inputApelido.val('');
                             $inputNumero.val('');
                             $inputComplemento.val('');
                             $inputRefencia.val('');
                             $form.removeClass('hide');    
                   })

     

}








function getStatusLoja(ID_LOJA){

    var _LOJA    = getLojaIn(ID_LOJA);
    var statusAM = isAvailable(_LOJA.REST_ECOMMERCE_WEB_HORARIO_INI1, _LOJA.REST_ECOMMERCE_WEB_HORARIO_FIM1);
    var statusPM = isAvailable(_LOJA.REST_ECOMMERCE_WEB_HORARIO_INI2, _LOJA.REST_ECOMMERCE_WEB_HORARIO_FIM2);
    var status   = (statusAM) ? statusAM : statusPM;
    var CHECK    = __GETLocalStorage('CONFIG').STATE.CHECK; 


    return (CHECK) ?  (!status || !_LOJA.STATE.MOVIMENTO) ? false : true :  (statusAM) ? statusAM : statusPM;
}





