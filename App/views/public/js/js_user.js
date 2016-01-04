
/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pelo gerenciamento de Usuários
   *
   **/

      $(function(){
        
              userIsAuth();
              loginUser();
              setUser();
              controllerAccessUser();
              logOffUser();
              checkRouteLogin();
              updateUser();
              updateUserPwd();
              logOff();
              recoverPass();
              utilityUser();
              setToGo();              

                       if(oauth_user.origin == "facebook"){
                          logoutFB();
                      } else if(oauth_user.origin == "Google"){
                         logoutGoogle(oauth_user.access_token);
                      } 
        })



      function getLogUser (DATA) {

          switch(DATA.BASE) {
            
                  case 'GOOGLE':
                       

                                        var DATA_USER    = DATA.DATA;
                                        var BASE_ACCESS  = __GETLocalStorage('BASE_ACCESS');
                                        var $response    = false;

                                          $.each(BASE_ACCESS, function(index, getBase) {
                                                          
                                                          var _BASE = getBase;
                                                          var _ADDRESS = [];
                                                          var iControl = 0;

                                                        
                                                               $.each(_BASE, function(index, getData) {

                                                                        if(getData.CLI_LOGIN == DATA_USER.email){

                                                                                var $DATA = getData;
                                                                                    _ADDRESS.push($DATA);

                                                                                  __SETLocalStorage('ACCESS', $DATA);
                                                                                  __SETLocalStorage('ADDRESS', _ADDRESS);
                                                                                  checkCepLocal($DATA.CDA_CEP); 
                                                                                     
                                                                                     $('[target="name-login"]').addClass('pulse');
                                                                                     $('[target="Pedidos"]').removeClass('hide');
                                                                                     
                                                                                     setTimeout(function() { setFormUser();  }, 3000);

                                                                                     setTimeout(function() {$('[target="name-login"]').removeClass('pulse')}, 5000);
                                                                                     
                                                                                     $('[target="Pedidos"]').removeClass('hidden');

                                                                                     if(iControl == 0){
                                                                                        
                                                                                        listDataUser($DATA);

                                                                                      }
                                                                                     $response = true;
                                                                                     $('[data-origin="login"]').html(' / <i class="icon flaticon-google120"></i>Google');
                                                                                     setCheckStatusLoja();
                                                                                     iControl++;
                                                         
                                                                        }

                                                              })
                                           })
                              
                                                   // if(!$response){ 
                                                   //         setTimeout(function() {
                                                   //                //alert('Você ainda não possui cadastro em nosso sistema. Por favor, cadastre-se para continuar');
                                                   //                $('[target="Login"]').click();
                                                   //            }, 1500);
                                                   //     }


                    break;


                      case 'FACEBOOK':

                                     var DATA_USER    = DATA.DATA;
                                        var BASE_ACCESS  = __GETLocalStorage('BASE_ACCESS');
                                        var $response    = false;

                                                 $.each(BASE_ACCESS, function(index, getBase) {
                                                          
                                                          var _BASE = getBase;
                                                          var _ADDRESS = [];
                                                   
                                                               $.each(_BASE, function(index, getData) {

                                                                        if(getData.CLI_LOGIN == DATA_USER.email){

                                                                                var $DATA = getData;
                                                                                    _ADDRESS.push($DATA);

                                                                                  __SETLocalStorage('ACCESS', $DATA);
                                                                                  __SETLocalStorage('ADDRESS', _ADDRESS);
                                                                                  checkCepLocal($DATA.CDA_CEP); 
                                                                                     
                                                                                     $('[target="name-login"]').addClass('pulse');
                                                                                     $('[target="Pedidos"]').removeClass('hide');
                                                                                     
                                                                                     setTimeout(function() { setFormUser();  }, 3000);

                                                                                     setTimeout(function() {$('[target="name-login"]').removeClass('pulse')}, 5000);
                                                                                     
                                                                                     $('[target="Pedidos"]').removeClass('hidden');
                                                                                     listDataUser($DATA);
                                                                                     $response = true;
                                                                                     $('[data-origin="login"]').html(' / <i class="icon flaticon-facebook56"></i>Facebook');
                                                                        }

                                                              })
                                           })
                              
                                                   // if(!$response){ 
                                                   //         setTimeout(function() {
                                                   //                alert('Você ainda não possui cadastro em nosso sistema. Por favor, cadastre-se para continuar');
                                                   //                $('[target="Login"]').click();
                                                   //            }, 1500);
                                                   //     }
         
                    break;


                    case 'LOCAL':
  

                
                           var $pwd = $('form[submit="cadastro-cliente"] [name="pwd"]');
                           var $buttonCep = $('[submit="check-cep-cadastro"] button');
                               
                               $pwd.val('').addClass('no-validate');
                               $buttonCep.text('Alterar dados');
                              
                              $('[target="name-login"]').html('<i class="icon flaticon-user157"></i> Minha Conta');
                              // $('[data-recept="email-user"]').html(DATA.RETURN.CLI_EMAIL);
                              // $('[data-recept="access-user"]').html('<i class="fa fa-envelope"></i>  '+"  19:08hs");
                              $('[target="name-login"]').addClass('pulse');
                              $('.social.email').addClass('bg-success').html('Acesso efetuado com sucesso!');
                              $('section[role="social"]').addClass('hide');
                              $('[role="logged"]').removeClass('hide');

                              if(!$('form[submit="cadastro-cliente"] ').hasClass('redirect-finaliza')){

                                          $('[target="Cardapio"]').trigger('click');
                               
                              }else{
                                          $('[target="Finaliza"]').trigger('click'); 
                                

                                          $('form[submit="cadastro-cliente"] ').removeClass('redirect-finaliza');
                                          $('form[submit="login-user"] ').removeClass('redirect-finaliza');
                                          $('html, body').animate({scrollTop:0}, '500', 'swing', function() { })  
                              }

                              setTimeout(function() {$('[target="name-login"]').removeClass('pulse')}, 3500);
                               $('[target="Pedidos"]').removeClass('hidden');

                    break;
          }
         
      }



function getUser(LOJAS){

  $.ajax({
          url: __GETLocalStorage('CONFIG').API.SQL,
          type: 'GET',
          data: {
            
              AJAX: true,
              SERVICE: 'USUARIO',
              METHOD: 'GET',
              OPERATION: 'ALL',
              REST: LOJAS
            },
        })
        .done(function(){})
        .fail(function(){})
        .always(function(response){
                    
                    __SETLocalStorage('BASE_ACCESS', $.parseJSON(response));
                     listAddress();

          })




}



      function checkAccessUser() {

                    if($.isEmptyObject(oauth_user)){
                          return true;
                    }else{
                          return false;
                    }
       }





function userIsAuth() {

           var $targetPedidos = $('[target="Pedidos"]');
           var $ACCESS = __GETLocalStorage('ACCESS');

            if(!$ACCESS){
                  
                    return false;
            }else{
                                
                                  $('[data-mode]').attr('data-mode','logged');
                                   checkCepLocal($ACCESS.CDA_CEP); 
                           

                                  // TRATANDO VIEW DE CADASTROS
                                   var $boxAddress = $('section[box="address-usuario"]'); 
                                   var $buttonCadasto = $('button[action="cadastro-usuario"]');
                                   var $buttonAlterar = $('button[action="update-usuario"]');
                                       $boxAddress.hide();
                                       $buttonCadasto.hide();
                                       $buttonAlterar.removeClass('hidden'); 
                                       $targetPedidos.removeClass('hidden');
                                        setTimeout(function() { setFormUser(); }, 3000); 
                                        listDataUser($ACCESS);
                                        setCheckStatusLoja();
                                   
                    return true;
                }
       }














      function loginUser(){

            $(document).on('submit', 'form[submit="login-user"]', function(event) {

                        event.preventDefault();
                        var $pwd    =  $(this).find('[name="pwd"]');
                        var $email  =  $(this).find('[name="e-mail"]');
                        var $button = $(this).find('button[type="submit"]');
                        var $buttonCadasto = $('[submit="check-cep-cadastro"] button');
                        var $targetPedidos = $('[target="Pedidos"]');
                        var $this = $(this);
          
                           
                   

                        if(checkAccessUser() && sanitizeEmail($email.val())){


                                 $pwd.val(md5($pwd.val())); 
                                 $.ajax({
                                        url: __GETLocalStorage('CONFIG').API.SQL,
                                        type: 'POST',
                                        data: {
                                            AJAX: true,
                                            SERVICE: 'USUARIO',
                                            METHOD: 'GET',
                                            OPERATION: 'AUTH',
                                            ACCESS: $(this).serialize(),
                                            REST:  __GETLocalStorage('LOJA')},
                                      })
                                      .done(function(){})
                                      .fail(function(){})
                                      .always(function(response){
                                            
                                            $response = $.parseJSON(response);
                                        var $DATA     = $response[0];
                                                
                                      
                                            if($response){
                                                          


                                                         $this.find('.alert').addClass('hide');     
                                                         $('[target="name-login"]').addClass('pulse');

                                                         $button.text('logando Usuário...').attr('disabled',true);
                                                         $('[data-mode]').attr('data-mode','logged');
                                                          __SETLocalStorage('ACCESS', $DATA);
                                                          __SETLocalStorage('ADDRESS', $response);
                                                          checkCepLocal($DATA.CDA_CEP); 

                                                          setUserMixpanel();

                                                          // TRATANDO VIEW DE CADASTROS
                                                           var $boxAddress    = $('section[box="address-usuario"]'); 
                                                           var $buttonCadasto = $('button[action="cadastro-usuario"]');
                                                           var $buttonAlterar = $('button[action="update-usuario"]');
                                                               $boxAddress.hide();
                                                               $buttonCadasto.hide();
                                                               $buttonAlterar.removeClass('hidden'); 
                                                               $targetPedidos.removeClass('hide');
                                                               setTimeout(function() {

                                                                  setFormUser();
                                                                 

                                                                   }, 3000);
                                                               $('[target="Pedidos"]').removeClass('hidden');


                                                       
                                                      }else{

                                                          $this.find('.not-login').removeClass('hide');
                                                      }
                                                    
                                                          listDataUser($DATA);
                                                       
                                            })
                            }else{

                         // console.log('USER LOGGED');
                        }
            })
     }









     function listDataUser(DATA){

          if (DATA) {
                                
                     setTimeout(function() {

                                  // POOLING DE PEDIDO
                                  getPedidoStatusUser();
                                
                               $('[target="name-login"]').html('<i class="icon flaticon-user157"></i> Minha Conta');
                            if($('form[submit="login-user"]').hasClass('redirect-finaliza')){
                                  
                                  $('[target="Finaliza"]').trigger('click');
                                  $('form[submit="login-user"]').removeClass('redirect-finaliza');

                            }else{
                                  $('[target="Cardapio"]').trigger('click');

                            }
                      
                      }, 1000);

                      setTimeout(function() {$('[target="name-login"]').removeClass('pulse')}, 2000);

          }else{

               $('.social.email').addClass('error-log').html('Dados não encontrados');
          }
         
            $('form[submit="login-user"]').find('input').val('');

     }














  /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End cadastramento de usuário
     *
     **/
        function setUser() {
              
              $(document).on('click', 'button[action="check-cep-cadastro"]', function(event) {
                          
                          $cep = $(this).closest('form').find('input[name="CEP"]').val();

                var cepSanitize = $cep.val().replace("-", ""); 
                                  $cep.val(cepSanitize);
                       
                                event.preventDefault();
                    })    




                $(document).on('keyup', 'form[submit="cadastro-cliente"] input[type="email"], form[submit="cadastro-togo"] input[type="email"]', function(event) {
                        
                        formIsValid($(this));
                        emailIsValid();
                        if($(this).val().length > 0){

                               $('form[submit="cadastro-cliente"] .alert-email').addClass('hide');
                               $('form[submit="cadastro-togo"] .alert-email').addClass('hide');
                               $(this).attr('placeholder','E-mail');
                          }
                  });


        
                  $(document).on('submit', 'form[submit="cadastro-cliente"]',function(event) {

                           event.preventDefault();


                           var $controler = true;
                           var $form  = $(this);
                           var $boxAddress = $('section[box="address-usuario"]'); 
                           var $alertUsuario  = $(this).find('.alert');
                           var $buttonCadasto = $(this).find('button[action="cadastro-usuario"]');
                           var $buttonAlterar = $(this).find('button[action="update-usuario"]');
                           var $pwd   = $(this).find('[name="pwd"]');
                           var $email = $(this).find('[name="email"]');
                                              
                               $inputCep     = $(this).find('[name="cep-address"]');
                               $inputRua     = $(this).find('[name="rua-address"]');
                               $inputBairro  = $(this).find('[name="bairro-address"]');
                               $inputEstado  = $(this).find('[name="uf-address"]');
                               $inputCidade  = $(this).find('[name="localidade-address"]');
                               $inputCpfCnpj = $(this).find('input[name="cpf-cnpj"]');

                           var callbackCpf = $inputCpfCnpj.val();
                               $pwd.val(md5($pwd.val()));
                               $('input[mask="CPF-CNPJ"]').val($(this).find('input[mask="CPF-CNPJ"]').cleanVal());
                               $('input[mask="PHONE"]').val($(this).find('input[mask="PHONE"]').cleanVal());

                                      var $cep = $inputCep.val();
                                       $inputCep.val($cep.replace("-",""));
                                                                     
                                         $.ajax({
                            
                                              url: __GETLocalStorage('CONFIG').API.SQL,
                                              type: 'POST',
                                              data: {
                                                  AJAX: true,
                                                  SERVICE: 'USUARIO',
                                                  METHOD: 'POST',
                                                  OPERATION: 'INSERIR',
                                                  DATA: $form.serialize(),
                                                  REST: __GETLocalStorage('ATENDENTE')},
                                            })
                                            .done(function(){})
                                            .fail(function(){})
                                            .always(function(response){

                                                   var $response = $.parseJSON(response);

                                                     __SETLocalStorage('ACCESS', $response);
                                                      getLogUser({
                                                                     BASE: 'LOCAL',
                                                                     RETURN: $response
                                                                  })
                                                
                                                    if($response){
                                                                    $inputCep.attr('disabled', false);
                                                                    $inputRua.attr('disabled', false);
                                                                    $inputBairro.attr('disabled', false);
                                                                    $inputEstado.attr('disabled', false);
                                                                    $inputCidade.attr('disabled', false);
         
                                                                  $.ajax({
                                                      
                                                                        url: __GETLocalStorage('CONFIG').API.SQL,
                                                                        type: 'POST',
                                                                        data: {
                                                                            AJAX: true,
                                                                            SERVICE: 'ADDRESS',
                                                                            METHOD: 'POST',
                                                                            OPERATION: 'INSERIR',
                                                                            DATA: $form.serialize(),
                                                                            ID: $response.CLI_ID,
                                                                            REST: __GETLocalStorage('ATENDENTE')},
                                                                      })
                                                                      .done(function(){})
                                                                      .fail(function(){})
                                                                      .always(function(response){
                                                                        
                                                                               var $responseAddress = $.parseJSON(response);
                                                    
                                                                                   if($responseAddress){
                                                                                        $('input[name="cpf-cnpj"]').val(callbackCpf);
                                                                                      
                                                                                          __SETLocalStorage('ADDRESS', $responseAddress);
                                                                                         getAddress($response.CLI_ID);
                                                                                         $boxAddress.hide();
                                                                                         $buttonCadasto.hide();
                                                                                         $buttonAlterar.removeClass('hidden');
                                                                                        setTimeout(function() {  setFormUser(); }, 3000);
                                                                                         

                                                                                   }
                                                                      })
                                                    }
                                            })
                    })
        }






















  /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End cadastramento de usuário
     *
     **/
        function setToGo() {
              
             
                  $(document).on('submit', 'form[submit="cadastro-togo"]',function(event) {

                           event.preventDefault();

                                       var $form  = $(this);
                                          

                                          if(sanitizeEmail($form.find('input[name="email"]').val())){
                                                               
                                                              $form.find('button').text('Processando...'); 
                                                          var $pwd   = $(this).find('[name="pwd"]');
                                                              $pwd.val(md5($pwd.val()));
                                                              $('input[mask="PHONE"]').val($(this).find('input[mask="PHONE"]').cleanVal());

                                                              $.ajax({
                                                                    url: __GETLocalStorage('CONFIG').API.SQL,
                                                                    type: 'POST',
                                                                    data: {
                                                                        AJAX: true,
                                                                        SERVICE: 'USUARIO',
                                                                        METHOD: 'POST',
                                                                        OPERATION: 'INSERIR_TOGO',
                                                                        DATA: $form.serialize(),
                                                                        REST:   { 
                                                                                  REST_BAIRRO: "Bairro", 
                                                                                  REST_CEP: "70200695",
                                                                                  REST_CIDADE_NOME: "BRASILIA",
                                                                                  REST_DATABASE: "porphut_bd405sul", 
                                                                                  REST_ID: "5", 
                                                                                  REST_LOGRADOURO: "Rua",
                                                                                  REST_NOME: "DF 405 SUL",
                                                                                  REST_TELEFONE: "99999999",
                                                                                  REST_UF: "DF" }
                                                                             },
                                                                  })
                                                                  .done(function(){})
                                                                  .fail(function(){})
                                                                  .always(function(response){

                                                                         var $response = $.parseJSON(response);

                                                                           __SETLocalStorage('ACCESS', $response);
                                                                              var ATENDENTE = [{ 
                                                                                                      LOJA: { 
                                                                                                              REST_BAIRRO: "Bairro", 
                                                                                                              REST_CEP: "70200695",
                                                                                                              REST_CIDADE_NOME: "BRASILIA",
                                                                                                              REST_DATABASE: "porphut_bd405sul", 
                                                                                                              REST_ID: "5", 
                                                                                                              REST_LOGRADOURO: "Rua",
                                                                                                              REST_NOME: "DF 405 SUL",
                                                                                                              REST_TELEFONE: "99999999",
                                                                                                              REST_UF: "DF" },
                                                                                                              TOGO: true
                                                                                                    }]

                                                                           __SETLocalStorage('ATENDENTE', ATENDENTE);


                                                                             getLogUser({
                                                                                           BASE: 'LOCAL',
                                                                                           RETURN: $response
                                                                                        })
                                                                      
                                                                          if($response){
                                                                                           __SETLocalStorage('ADDRESS', []);
                                                                                           getAddress($response.CLI_ID);
                                                                                        
                                                                                          setTimeout(function() {  setFormUser(); }, 3000);
                                                                                          $form.find('button').text('Processando...'); 
                                                                                         }
                                                                  })



                                          }else{
                                                   alert('<big><i class="flaticon-warning37"></i></big>', 'Atenção, o e-mail fornecido é inválido');          
                                          }
                    
                                         
                                                   
    
                      
                       
                           
                    })
        }









function controllerAccessUser(){

          $(document).on('click', '[target="Finaliza"]',function(event) {

                var $ACCESS = __GETLocalStorage('ACCESS');

                      if(!$ACCESS){

                        //    console.log('lOGAR!');
                      
                      }else{
                          //  console.log('LOGADO');
                      }
          })
}





function sanitizeEmail(emailAddress) {

    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);

}











/***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End, listagem de elementos
     *
     **/
   
        function setFormUser(){

              $form             = $('[submit="update-cliente"]');
              $inputName        = $('[submit="update-cliente"] input[name="nome"]');
              $inputEmail       = $('[submit="update-cliente"] input[name="email"]');
              $inputCpfCnpj     = $('[submit="update-cliente"] input[name="cpf-cnpj"]');
              $inputFone        = $('[submit="update-cliente"] input[name="fone"]');
              $inputId          = $('[submit="update-cliente"] input[name="id"]');


              $Address  = __GETLocalStorage('ADDRESS');
              $ACCESS   = __GETLocalStorage('ACCESS');

                   listAddress();

              if($ACCESS){
                
                 //POPULANDO CAMPOS
                 $inputName.val($ACCESS.CLI_NOME); 
                 $inputEmail.val($ACCESS.CLI_LOGIN); 
                 $inputCpfCnpj.val($ACCESS.CLI_CPF_CGC); 
                 $inputFone.val($ACCESS.CLI_FONE); 
                 $inputId.val($ACCESS.CLI_ID);  
              }


        }


















  /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End cadastramento de usuário
     *
     **/
        function updateUser() {
              
           

                 $(document).on('submit', 'form[submit="update-cliente"]',function(event) {

                           event.preventDefault();


                           var $form  = $(this);
                           var $pwd   = $(this).find('[name="pwd"]');
                           var $labelAddress =$(this).find('.alert'); 
                        

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
                                            
                                           
                                          if((typeof $cep !== "undefined")){

                                              $inputCep.val($cep.replace("-","")); 
                                          }




                                   $pwd.val(md5($pwd.val()));
                                   $(this).find('input[mask="CPF-CNPJ"]').val($(this).find('input[mask="CPF-CNPJ"]').cleanVal());

                             
                                         $.ajax({
                            
                                              url: __GETLocalStorage('CONFIG').API.SQL,
                                              type: 'POST',
                                              data: {
                                                  AJAX: true,
                                                  SERVICE: 'USUARIO',
                                                  METHOD: 'PUT',
                                                  OPERATION: 'ALTERAR',
                                                  DATA: $form.serialize(),
                                                  REST: __GETLocalStorage('ATENDENTE')},
                                            })
                                            .done(function(){

                                                $inputCep.attr('disabled', false);
                                                $inputRua.attr('disabled', false);
                                                $inputBairro.attr('disabled', false);
                                                $inputEstado.attr('disabled', false);
                                                $inputCidade.attr('disabled', false);
                                            })
                                            .fail(function(){})
                                            .always(function(response){


                                                   var $response = $.parseJSON(response);

                                                     __SETLocalStorage('ACCESS', $response);
                                                     $pwd.val('');
                                                      
                                                        $labelAddress.removeClass('alert-warning').addClass('alert-success');
                                                        $labelAddress.html('<p>Registro alterado com sucesso.</p>');

                                                        setTimeout(function() { 

                                                                $labelAddress.removeClass('alert-success').addClass('alert-warning');
                                                                $labelAddress.html('<p>Preencha o formulário abaixo para efetuar a edição.</p>');

                                                        }, 2000);
                                                  
                                            })

                                         
                    })

        }






function logOffUser() {
  
        // console.log('LOGGED');

}



function checkRouteLogin(){

    $(document).on('click', '[target="login-check"]', function(event) {
            
             if(__GETLocalStorage('ACCESS')){
                                                           
                  setTimeout(function() {
                       
                        setFormUser();               
                        $('[target="MeusDados"]').trigger('click');

                  }, 20);
                  
                  
                     
             }else{

                 setTimeout(function() {


                        $('[target="Login"]').trigger('click'); 
                    
                      }, 20);
                  
                  
            } 

                 event.preventDefault();

    })

}



















/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Validador de Formulário 
   *
   **/

        function formIsValid(FORM){

              var RESPONSE = true;

                  $('form[submit="cadastro-cliente"] input[required]').each(function(index, val) {
                                if($(this).val() == ''){
                                       RESPONSE = false;
                                }
                  })

                  if(RESPONSE){
        
                         $('form[submit="cadastro-cliente"] button').attr('disabled', false).text('Cadastrar');
        
                      }else{
              
                          $('form[submit="cadastro-cliente"] button').attr('disabled', true);
                  }
             
      }













/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  LOGOFF SYSTEM, EEXECUÇÃO DE ENCERRAMENTO
   *
   **/

    function logOff() {
          
          $(document).on('click', '[role="btn-logoff"]', function(event) {

              
                      localStorage.clear();
                      if(oauth_user.origin == "facebook"){
                        logoutFB();
                      } else if(oauth_user.origin == "Google"){
                        logoutGoogle(oauth_user.access_token);
                      } 

                      $('.logOff-user i').removeClass('fa-power-off');
                      $('.logOff-user i').addClass('flaticon-refresh55 rotating').attr('title', 'Saindo... Por favor, aguarde.');;
                      setTimeout(function() {  window.location.reload(); }, 3000);

            event.preventDefault();
            /* Act on the event */
          });


    }






/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  VERIFICAÇÃO DE E-MAILS DISPONÍVEIS
   *
   **/

      function emailIsValid(){
              
                  var  _LOJAS     =  __GETLocalStorage('LOJA');
                  var  _USUARIOS  =  __GETLocalStorage('BASE_ACCESS');
                  var  _RESPONSE  = false;
                  var  $this      = ($('form[submit="cadastro-cliente"] input[name="email"]').val()) ? $('form[submit="cadastro-cliente"] input[name="email"]').val() : $('form[submit="cadastro-togo"] input[name="email"]').val();
               
             
                      _LOJAS.forEach(function(getLoja, index) {

                                  _USUARIOS[getLoja.REST_ID].forEach(function(getUsuario, loja) {

                                                    if(getUsuario.CLI_LOGIN == $this){

                                                                     _RESPONSE = true;
                                                      }
                                  })
                      })

                      if(_RESPONSE){

                            $('form[submit="cadastro-cliente"] .alert-email').removeClass('hide');
                            $('form[submit="cadastro-togo"] .alert-email').removeClass('hide');
                            $('form[submit="cadastro-cliente"] button').attr('disabled', true);
                            $('form[submit="cadastro-togo"] button').attr('disabled', true);
                            $('input[name="email"]').attr('placeholder',$this).val('');

                      }else{
                            $('form[submit="cadastro-cliente"] button').attr('disabled', false);
                            $('form[submit="cadastro-togo"] button').attr('disabled', false);
                      }
      }









/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @return {object[usuario], object{loja}}
   *   @exemple  VERIFICAÇÃO DE E-MAILS 
   *
   **/

      function checkEmail(){
              
                  var  _LOJAS         =  __GETLocalStorage('LOJA');
                  var  _USUARIOS      =  __GETLocalStorage('BASE_ACCESS');
                  var  _RESPONSE      = false;
                  var  $containerPass =  $('div[data-container="recover-pwd"]');
                  var  $email         = $containerPass.find('input[name="e-mail-recover"]').val();
                  var  $emailIsValid  = ($('form[submit="cadastro-cliente"]').is(':visible')) ? $('form[submit="cadastro-cliente"]').find('input[name="email"]').val() : $('form[submit="cadastro-togo"]').find('input[name="email"]').val(); 
                
                  var __EMAIL = ($email) ? $email : $emailIsValid;
               
                        _LOJAS.forEach(function(getLoja, index) {

                                  _USUARIOS[getLoja.REST_ID].forEach(function(getUsuario, loja) {

                                                 if(getUsuario.CLI_LOGIN ==__EMAIL){

                                                             _RESPONSE = { 
                                                                            USER: getUsuario,
                                                                            LOJA: getLoja
                                                                          };
                                                      }
                                  })
                      })
       
              return _RESPONSE;
      }









/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  Função de recuperação de senha
   *
   **/
        
        function recoverPass(){

           

               $(document).on('click', 'button[action="recoverPwd"]', function(event) {

                    var $containerPass =  $('div[data-container="recover-pwd"]');
                        $containerPass.removeClass('hide'); 
                        $(this).attr('action','executeRecover').text('Recuperar');
                        $('.success-email').addClass('hide');


                 event.preventDefault();
                 /* Act on the event */
               });

                $(document).on('click', 'button[action="executeRecover"]', function(event) {
                      
                      var  $containerPass =  $('div[data-container="recover-pwd"]');
                           _CONFIG = __GETLocalStorage('CONFIG');
                           _EMAIL  = checkEmail();
                   

                    if(!_EMAIL){

                        $('.alert-recovery').removeClass('hide');

                    }else{

                        $('.alert-recovery').addClass('hide');

                    
                       /***
                         *   @author Erick Eduardo 
                         *   @exemple  EXECUÇÃO DE PROCEDIMENTO DE ALTERAÇÃO
                         *
                         **/ 
                            setTokenRecover({
                                              CONFIG: _CONFIG,
                                              USER:   _EMAIL,
                                              TOKEN:  _CONFIG.RECOVER.SALT + sha1(getHour()) + md5(_EMAIL.USER.CLI_CPF_CGC)
                                            });


                    }

                        $containerPass.removeClass('hide');
                        $(this).attr('action','executeRecover').text('Recuperar');

                        event.preventDefault();
                        /* Act on the event */
               });


      

                 $(document).on('click', '[data-container="recover-pwd"] .close', function(event) {
                 
                  var  $containerPass =  $('div[data-container="recover-pwd"]');
                       $containerPass.addClass('hide');
                       $('button[action="executeRecover"]').attr('action','recoverPwd').text('Esqueci a senha');
                       $('.success-email').addClass('hide');

                })




                 $(document).on('click', '[action="recover-password-user"]', function(event) {
                   
                           _CONFIG = __GETLocalStorage('CONFIG');
                           _EMAIL  = checkEmail();
                   

                    if(!_EMAIL){

                        $('.alert-recovery').removeClass('hide');

                    }else{

                        $('.alert-recovery').addClass('hide');

                    
                       /***
                         *   @author Erick Eduardo 
                         *   @exemple  EXECUÇÃO DE PROCEDIMENTO DE ALTERAÇÃO
                         *
                         **/ 
                            setTokenRecover({
                                              CONFIG: _CONFIG,
                                              USER:   _EMAIL,
                                              TOKEN:  _CONFIG.RECOVER.SALT + sha1(getHour()) + md5(_EMAIL.USER.CLI_CPF_CGC)
                                            });
                            
                    }

               });


                                    

  }



/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  Função de recuperação de senha
   *
   **/
        
        function setTokenRecover(DATA){


                 $.ajax({
                          url: __GETLocalStorage('CONFIG').API.SQL,
                          type: 'POST',
                          data: {
                              AJAX: true,
                              SERVICE: 'USUARIO',
                              METHOD: 'PUT',
                              OPERATION: 'TOKEN',
                              DATA: DATA},
                        })
                        .done(function(){})
                        .fail(function(){})
                        .always(function(response){

                              if($.parseJSON(response)){

                                    sendEmail({ 
                                                ACTION: 'CHANGE_PASS',
                                                DATA: DATA
                                              });
                                }
                        }) 


        }







/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  Verificando TOken de Alteração de Senha.
   *
   **/
        
        function tokenIsValid(ARGUMENT){
           
                  var  _LOJAS     =  __GETLocalStorage('LOJA');
                  var  _USUARIOS  =  __GETLocalStorage('BASE_ACCESS');
                  var  _RESPONSE  = false;
                
                      _LOJAS.forEach(function(getLoja, index) {

                                  _USUARIOS[getLoja.REST_ID].forEach(function(getUsuario, loja) {

                                                 if(getUsuario.CLI_SID == ARGUMENT){

                                                             _RESPONSE  = { 
                                                                            USER: getUsuario,
                                                                            LOJA: getLoja
                                                                          };
                                                      }
                                  })
                      })
       
              return _RESPONSE;

        }













  /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @access public
     *   @exemple Controlador Front-End Alteração de Senha
     *
     **/
        function updateUserPwd() {
              
           

                 $(document).on('submit', 'form[submit="update-pwd"]',function(event) {

                           event.preventDefault();

                           var _DATA = __GETLocalStorage('CHANGE_PASS');
                           var $form  = $(this);
                           var $pwd   = $(this).find('[name="pwd"]');
                           var $labelAddress =$(this).find('.alert'); 
                           var $targetPedidos = $('[target="Pedidos"]');
                                  
                                  $(this).find('[name="re-pwd"]').val('');


                                   $pwd.val(md5($pwd.val()));
                              
                             
                                         $.ajax({
                            
                                              url: __GETLocalStorage('CONFIG').API.SQL,
                                              type: 'POST',
                                              data: {
                                                  AJAX: true,
                                                  SERVICE: 'USUARIO',
                                                  METHOD: 'PUT',
                                                  OPERATION: 'ALTERAR_SENHA',
                                                  DATA: $form.serialize(),
                                                  REST:  _DATA.LOJA,
                                                  USER:  _DATA.USER},
                                            })
                                            .done(function(){ })
                                            .fail(function(){})
                                            .always(function(response){


                                                     $response  = $.parseJSON(response);
                                                      var $DATA = $response[0];
                                                
                                              
                                            if($response){
                                                          
                                                      
                                                         $('[data-mode]').attr('data-mode','logged');
                                                         $('[target="name-login"]').addClass('pulse');

                                                          __SETLocalStorage('ACCESS', $DATA);
                                                          __SETLocalStorage('ADDRESS', $response);
                                                          checkCepLocal($DATA.CDA_CEP); 


                                                          // TRATANDO VIEW DE CADASTROS
                                                           var $boxAddress = $('section[box="address-usuario"]'); 
                                                           var $buttonCadasto = $('button[action="cadastro-usuario"]');
                                                           var $buttonAlterar = $('button[action="update-usuario"]');
                                                               $boxAddress.hide();
                                                               $buttonCadasto.hide();
                                                               $buttonAlterar.removeClass('hidden'); 
                                                               $targetPedidos.removeClass('hide');
                                                               setTimeout(function() {

                                                                    setFormUser();
                                                                    $('[target="name-login"]').removeClass('pulse');

                                                                 }, 3000);
                                                               $('[target="Pedidos"]').removeClass('hidden');


                                                       
                                                      }
                                                          listDataUser($DATA);

                                                  
                                            })

                                         
                    })

        }




function utilityUser(){
                  
         $(document).on('click', 'form[submit="login-user"] input[name="e-mail"]',function(event) {

              $('[data-container="recover-pwd"] .close').click();
         })
}