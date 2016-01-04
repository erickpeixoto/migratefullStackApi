$(function(){


/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  METHOD INITIALIZE
   *
   **/

      setView();
      utility();
      resetStyleInput();
      $('#map').addClass('hidden');

             console.warn("checkDevice()", checkDevice());


        })





   /***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple DOCUMENT ROOT
   *
   **/
      function getDominio() {
        
        return __GETLocalStorage('CONFIG').URL; 
      }






   /***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  INTERFACE DE NAVEGAÇÃO - VIEWS
   *
   **/
    
    function setView(){
                                                                                                                    
          
          var VIEWS = [
                        'Cardapio',
                        'Login',
                        'Sobre',
                        'Contato',
                        'Politica',
                        'Lojas',
                        'Finaliza',
                        'Pedidos',
                        'Cadastro',
                        'MeusDados',
                        'Recover',
                        'Email'
                      ];

  


                VIEWS.forEach(function(view, index){

                        $.get("App/views/View"+view+".html", function(data) {
                              
                                 $('section[container="all-content"]').append(data);
                          });

                 })

      

        $(document).on('click', '[action="view"]', function(event) {
         
               var TARGET = $(this).attr('target'); 

                      $('html, body').animate({ scrollTop: 0 }, 1);

                      // $.get("App/views/view"+TARGET+".html", function(data) {
                      //        $('section[container="all-content"]').append(data);
                      // });


                       $('#promocoes').hide();


                               $('[container="all-content"] [view]').addClass('hidden');
                               $('form[submit="create-address-finaliza"]').addClass('hide');
                               $('form[submit="address-finaliza"]').addClass('hide');
                               
                               $('[action="new-cadastro"]').removeClass('active');

                               $('[container="all-content"] [view]').each(function(index, el) {
                  
                                
                                    if($(this).attr('view') == TARGET){
                              
                                            $(this).removeClass('hidden');
                                  }
                            }) 

                            if(TARGET == "Lojas"){

                                $('#map').removeClass('hidden');
                                          openMap(-15.8147201,-47.8897211);
                                // lojas();
                                              
                            }else{

                                 $('#map').addClass('hidden');
                            }
                      

                            if(TARGET == "Cardapio"){

                                $('nav#groups').show();
                                $('#promocoes').show();

                            }else{

                                $('nav#groups').hide();
                            }

                    

                                     event.preventDefault(); 
                        })



  /***
   *   @author Erick Eduardo 
   *   @exemple  CHECAGEM DE ACESSO, VERIFICA ROTAS JÁ ESTABELECIDAS
   *
   **/
        routerRecover({

                      HASH: $(location).attr('hash'),
                      CODE: $(location).attr('search')
            })
           

  }




   


/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  MÉTODO COM RETORNO DE PROCESSAMENTO DE PERSISTÊNCIA
   *
   **/
      function setResponse(STATUS){


            if(STATUS){

                    $('[role="btn-logoff"]').hide();                                                                    
                    $('[role="response-process"]').show();                                                                    

            }else{
                    $('[role="btn-logoff"]').show();                                                                    
                    $('[role="response-process"]').hide();                                                                    
            }


            $(document).on('focus', 'input', function(event) {
                
                $('.alert').hide();
                event.preventDefault();
                /* Act on the event */
            });

};













/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  LOGOFF SYSTEM, EEXECUÇÃO DE ENCERRAMENTO
   *
   **/

      function utility(){

            $('[mask="CEP"]').mask('00000-000');
            $('[mask="NUMBER"]').mask('000000000000000000000000000000000000000');

      

           // var behavior = function(val){
           //        return val.replace(/\D/g, '').length === 11 ? '000.000.000-00' : '00.000.000/0000-00';
           //  };
         
           //  $('[mask="CPF-CNPJ"]').mask(behavior, {
           //      onKeyPress: function(val, e, field, options){
           //          field.mask(behavior.apply({}, arguments), options);
           //      }
           //  });
       

           var SPMaskBehavior = function (val) {
                return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
              },
              spOptions = {
                onKeyPress: function(val, e, field, options) {
                    field.mask(SPMaskBehavior.apply({}, arguments), options);
                  }
              };
              
              $('[mask="CPF-CNPJ"]').mask('000.000.000-00');

              $('[mask="PHONE"]').mask(SPMaskBehavior, spOptions);

              $('[mask="MONEY"]').mask('#.##0,00', {reverse: true});



              $(document).on('focusout', 'form [name="pwd"]', function(event) {
                          
                            /***
                             *  @exemple  Validação de senha
                             *  @required integer+, uppercase+, lowecase+, maior que 6 
                             **/
                             var st = /[a-zA-Z]{1}/;
                             var nu = /[0-9]{1}/;
                             var $argument = $(this).val();

                            
                          if(st.test($argument) && nu.test($argument) && $argument.length > 5){
                             
                                         var $alertUsuario = $(this).closest('form').find('.alert:first');
                                             $alertUsuario.removeClass('alert-danger').addClass('alert-warning hide');
                                             $alertUsuario.find('p').html('Preencha o formulário abaixo para efetuar o processo');
                                             $(this).closest('form').find('button').attr('disabled', false);
                                             $(this).closest('p').find('.required').html('*').removeClass('invalid-label');


                           }else{

                            
                                  if($argument.length > 0){

                                       var $alertUsuario = $(this).closest('form').find('.alert:first');

                                       $alertUsuario.removeClass('alert-warning hide')
                                       $alertUsuario.removeClass('alert-warning').addClass('alert-danger');
                                       $alertUsuario.find('p').html('<strong>Atenção!</strong> A senha deve ter no mínimo 6 caracteres, contendo letras e números.');
                                       
                                       $(this).val('').focus();
                                       $(this).closest('form').find('button').attr('disabled', true);
                                       $(this).closest('p').find('.required').html('valor inválido *').addClass('invalid-label');

                                    
                                  }
                              }


                       })






            $(document).on('focusout', 'form input[name="re-pwd"]', function(event) {

                       var $argument    = $(this).val();
                       var $argumentPwd = $(this).closest('form').find('input[name="pwd"]').val();
                                
                                    if(($argument.length > 0) && $argument == $argumentPwd ){
           
                                         var $alertUsuario = $(this).closest('form').find('.alert:first');
                                             $alertUsuario.removeClass('alert-danger').addClass('alert-warning hide');
                                             $alertUsuario.find('p').html('Preencha o formulário abaixo para efetuar o processo');
                                             $(this).closest('form').find('button').attr('disabled', false);
                                             $(this).closest('p').find('.required').html('*').removeClass('invalid-label');
                                  }else{

                            
                                      if($argument.length > 0){

                                           var $alertUsuario = $(this).closest('form').find('.alert:first');

                                           $alertUsuario.removeClass('alert-warning hide')
                                           $alertUsuario.removeClass('alert-warning').addClass('alert-danger');
                                           $alertUsuario.find('p').html('<strong>Atenção!</strong> A senha não corresponde com a senha digitada anteriormente.');
                                           
                                            $(this).closest('form').find('button').attr('disabled', true);
                                           $(this).closest('p').find('.required').html('valor inválido *').addClass('invalid-label');

                                        
                                      }
                              }




            })
      

        $(document).on('click', '.alert .close', function(event) {
                
                $(this).closest('.alert').addClass('hide');          

        });                           


        $(document).on('click', 'button', function(event) {
                
                $('[list="itens-pedido"] a').removeClass('error-remove');   
     
        });         


        $(document).on('click', 'input[type="checkbox"][name="check-cpf-nota-nominal"]', function(event) {

            $('input[type="text"][name="cpf-nota-nominal"]').toggleClass('opacityinput');
    })

     


}












/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  MÉTODO PARSE DE DATAS
   *
   **/

        function parseDate(DATA){

              var RESPONSE = DATA.split('-');
              var HOUR     = RESPONSE[2].split(' ');
              var RESPONSE_HOUR = HOUR[1].split(':');

              RETURN = {
                          DATE: HOUR[0]+'/'+RESPONSE[1]+'/'+RESPONSE[0],
                          HOUR: RESPONSE_HOUR[0]+':'+RESPONSE_HOUR[1]
                       }
            
                    return RETURN;    
            }





/***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  MÉTODO PARSE DE DATAS
   *
   **/

        function parseData(DATA){

            
              var RESPONSE = DATA.split('-');

              RETURN = {
                          DATE: RESPONSE[2]+'/'+RESPONSE[1]+'/'+RESPONSE[0]
                       }
            
                    return RETURN;    


            }








  /***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  MÉTODO DE RETORNO DE PROCESSAMENTO
   *
   **/
      function responseProcess(status){



            var container = $('[role="container-response-process"]');
            var response = (status) ? true : false;

              
            switch(response){
              
                 case true:

                        container.fadeIn().html('<div class="alert alert-success">'+
                                                    '<button type="button" class="close" data-dismiss="alert">×</button>'+
                                                    '<strong>Muito bem!</strong>. Processado com sucesso.'+
                                                '</div>');
                  break;
                  
                default:
                        container.fadeIn().html('<div class="alert">'+
                                                    '<button type="button" class="close" data-dismiss="alert">×</button>'+
                                                    '<strong>Advertência!</strong> Por gentileza, verifique os dados preechidos.'+
                                                '</div>');
                break;
            }


                container.css({
                                marginTop: '-4px'
                              });


                setTimeout(function(){

                        $('.close').trigger('click');

                }, 10000)
    }












  /***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  SEARCH OBJECT
   *
   **/

        function getObjects(obj, key, val) {
         
            var objects = [];
            for (var i in obj) {

                if (!obj.hasOwnProperty(i)) continue;

                if (typeof obj[i] == 'object') {

                    objects = objects.concat(getObjects(obj[i], key, val));
                
                } else if (i == key && obj[key] == val) {
                  
                    objects.push(obj);
                }
         
            }
         
            return objects;
        }





function parseObjSearch(OBJECT,TYPE){

        var RESPONSE = new Array();

            $.each(OBJECT, function(index, val) {

                  RESPONSE.push(val.TYPE);
             })

            return RESPONSE;
 
}



function resetStyleInput(){

      $(document).on('focus', 'input', function(event) {
    
          event.preventDefault();
    
                     if($(this).val() == ''){

                          $(this).removeClass('warning');
                     }
          })

     $(document).on('focusout', 'form[submit="address"] input', function(event) {
    
               if($(this).val() == ''){

                    $('[target="Finaliza"]').click();
               }
      })
}




function getHour(){

    var now = new Date(Date.now());
    var formatted = now.getHours() + ":" + ( (now.getMinutes() < 10) ?  '0'+now.getMinutes() : now.getMinutes()) + ":" + ( (now.getSeconds() < 10) ?  '0'+now.getSeconds() : now.getSeconds())+'hs' ;
    
    return  formatted;
}




function isValid(DATA){
  
    return (DATA) ? true : false;

}





  /***
   *   @author Erick Eduardo - _accon Softaware Corporativo
   *   @access public
   *   @exemple  CHECAGEM DE ACESSO, IDENTIFICADOR DE DISPOSITIVO
   *
   **/
        function checkDevice() { 
       
           if( navigator.userAgent.match(/Android/i)
               || navigator.userAgent.match(/webOS/i)
               || navigator.userAgent.match(/iPhone/i)
               || navigator.userAgent.match(/iPad/i)
               || navigator.userAgent.match(/iPod/i)
               || navigator.userAgent.match(/BlackBerry/i)
               || navigator.userAgent.match(/Windows Phone/i)){
                
                return true;
           
            } else {
              
               return false;
            }

      }






  /***
   *   @author Erick Eduardo 
   *   @access public
   *   @exemple  CHECAGEM DE ROTAS
   *
   **/
        function routerRecover(DATA){
         
                  switch(DATA.HASH) {
                
                  case "#recover":

                      setTimeout(function() {
                        var isValid = tokenIsValid(DATA.CODE.slice(6));
                        
                              if(isValid){

                                   $('[target="Recover"]').click();
                                      __SETLocalStorage('CHANGE_PASS', isValid);

                              }else{

                                     alert('<big><i class="flaticon-warning37"></i></big>', 'Token inválido! Para redefinir a senha, refaça o processo.');
                                  }
                          }, 3000);
                    break;
               }


        }





        function getIP() {
                    
                          if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
                          else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                       
                          xmlhttp.open("GET"," http://api.hostip.info/get_html.php ",false);
                          xmlhttp.send();
                       
                          hostipInfo = xmlhttp.responseText.split("n");
                       
                          for (i=0; hostipInfo.length >= i; i++) {
                              ipAddress = hostipInfo[i].split(":");
                              if ( ipAddress[0] == "IP" ) return ipAddress[1];
                          }
                       
                          return false;
                      }
 




function transitionTop(scrollPosition) {

      var $body = $('body');

        var scrollDiff = $body.scrollTop() - scrollPosition;

            $body.css('transition', '.5s');
            $body.css('transform', 'translate3d(0, ' + scrollDiff + 'px, 0)');

            $body.bind('transitionend webkitTransitionEnd', function(event) {
                $body
                .scrollTop(scrollPosition)
                .css({'transition': '', 'transform': ''})
                .unbind(event);
            });
}
















function isAvailable(hora1, hora2)
{
          hora1 = hora1.split(":");
          hora2 = hora2.split(":");

          var d = new Date();
          var data1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora1[0], hora1[1]);
          var data2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora2[0], hora2[1]);
          var status = true; 

                var date    = new Date();
                var minuto  = (date.getMinutes() >= 10) ? date.getMinutes() : '0' + date.getMinutes();
                var hora    = date.getHours();
              
                 if(hora > hora1[0]  && hora < hora2[0]){

                          return true;     
               
                        
                        } else if(hora == hora1[0]){

                                  
                                      if(parseInt(hora1[1]) >= 0){

                                                  status = (minuto >= parseInt(hora1[1])) ? true : false;
                      
                                                       return status;
                                      }else{
                                        return false;
                                    }
                       
                     
                       }else if(hora == hora2[0]){

                               
                                    if(parseInt(hora2[1]) >= 0){

                                                status = (minuto <= parseInt(hora2[1])) ? true : false;
                    
                                                       return status;
                                    }else{
                                        return false;
                                    }

                    
                      }else{    return false;    } 
                       
       

};







function getNow(){


         // OBJECT
          var date = new Date();

          //CONRSAO DE 2 DIGITOS
          var MES  = ((date.getMonth().length+1) === 1)? (date.getMonth()+1) : '0' + (date.getMonth()+1);
          var DIA    = (date.getDate() >= 10) ?    date.getDate() : '0' + date.getDate();
          var minuto  = (date.getMinutes() >= 10) ? date.getMinutes() : '0' + date.getMinutes();
          var segundos = (date.getSeconds() >= 10) ? date.getSeconds() : '0' + date.getSeconds();
          var TIME = date.getHours() + ":" + minuto + ":" + segundos;
          var NOW  =  date.getFullYear() + "-" + MES + "-" + DIA;
          var MES_EXTENSO = null;


          return "Goiânia, " + DIA + " de " +  getMonthExtens(MES) + " de " + date.getFullYear();

}
