/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pelo gerenciamento de Lojas
   *
   **/
      $(function(){
        
              getLoja();
              listToGo();
              setCheckStatusLoja();
              setLojaMap();
        })


function getLoja(){

       $.getJSON('config-app.json', function(CONFIG) {
              
                    $.ajax({
                        
                        url: CONFIG.API.SQL,
                        type: 'GET',
                        data: {
                            AJAX: true,
                            SERVICE: 'LOJA',
                            METHOD: 'GET',
                            OPERATION: 'ALL'},
                      })
                      .done(function(){})
                      .fail(function(){})
                      .always(function(response){
                    
                      var DATA = JSON.parse(response);
                          __SETLocalStorage('LOJA', DATA);
                               
                              getCep(DATA);
                              getTaxa(DATA);
                              getPgto(DATA);
                              getUser(DATA);
                              listLojas(DATA)
                         })
        })
}



function getLojaIn(DATA){


      var LOJAS = __GETLocalStorage('LOJA');
      var RETURN = [];

          $.each(LOJAS, function(index, getLoja) {
          
              if(getLoja.REST_ID == DATA){
                      RETURN = getLoja;
                }
         })

      return RETURN;
}



function checkStatusLoja(){

  $.ajax({
            
            url: __GETLocalStorage('CONFIG').API.SQL,
            type: 'GET',
            data: {
                AJAX: true,
                SERVICE: 'LOJA',
                METHOD: 'GET',
                OPERATION: 'CHECK',
                ATENDENTE: __GETLocalStorage('ATENDENTE')},
          })
          .done(function(){})
          .fail(function(){})
          .always(function(response){
        
          var STATELoja = JSON.parse(response);

        
                           __SETLocalStorage('STATE', STATELoja);

             })

}



/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pela configuração
   */

    function setCheckStatusLoja(){

  
            $.getJSON('config-app.json', function(CONFIG) {
              
               __SETLocalStorage('CONFIG', CONFIG);

               $('[data-version="app"]').html(CONFIG.VERSION);

                if(CONFIG.STATE.CHECK){
                     
                       getLoja();
                       setTimeout(function() {  getLoja(); checkStatusLoja() }, ((parseInt(CONFIG.STATE.INTERVAL) * 60) *1000));
                }else{ 

                       __SETLocalStorage('STATE', { SOCKET: true, MOVIMENTO: true });
                }

          })
}




/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador de Operações para pedidos ToGo
   */


          function listToGo(){

       
                           $(document).on('click','[action="set-togo"]', function(){
                                    
                                      var _LOJAS  = __GETLocalStorage('LOJA');
                                      var _CONFIG = __GETLocalStorage('CONFIG');    
                                      var _ACCESS = __GETLocalStorage('ACCESS');    
                                      var _ACCESS = __GETLocalStorage('ACCESS');    
                                      var _ATENDENTE = __GETLocalStorage('ATENDENTE');     

                                       $('[data-container="AddressFinaliza"]').addClass('hide');

                                       __SETLocalStorage('NO-ATENDENTE', true);
                                      $('[action="set-togo"]').find('img').attr('src',"App/views/public/images/logo.png"); 
                                      $('[list="lojas-togo"] li').removeClass('active');

                                       
                                 
                                       var $container = $('[data-container="LojasToGo"] [list="lojas-togo"]');
                                       var _html = '';

                                       if(!$(this).hasClass('active')){

                                            _LOJAS.forEach(function(loja) {

                                               var statusAM = isAvailable(loja.REST_ECOMMERCE_TOGO_HORARIO_INI1, loja.REST_ECOMMERCE_TOGO_HORARIO_FIM1);
                                               var statusPM = isAvailable(loja.REST_ECOMMERCE_TOGO_HORARIO_INI2, loja.REST_ECOMMERCE_TOGO_HORARIO_FIM2);
                                               var status   = (statusAM) ? statusAM : statusPM;

                                                    
                                                 _html += '<li data-loja="'+(loja.REST_ID)+'"class="redux ' +((!status) ? ' closedStore ' : '' )  +  (((loja.STATE.MOVIMENTO) && (loja.STATE.SOCKET)) ? '' : ((_CONFIG.STATE.CHECK) ? ' closedStore ' : '' )  )+'">'+
                                                           (((loja.STATE.MOVIMENTO) && (loja.STATE.SOCKET) && (status)) ? '' :((_CONFIG.STATE.CHECK) ? '<strong class="target ">Loja Indisponível</strong>\n' : '' )) +
                                                              '<img width="90" height="auto" src="App/views/public/images/logo-black.png">'+
                                                              '<p><strong>'+loja.REST_ECOMMERCE_NOME+' </strong> <br> <small>  '+loja.REST_LOGRADOURO+', '+loja.REST_BAIRRO+' '+loja.REST_CIDADE_NOME+' - '+loja.REST_UF+' </small></p>'+
                                                              '<p><small><i class="fa fa-phone phone-lojaTogo"></i>'+loja.REST_TELEFONE+' </small> </p>'+
                                                         '</li>';
                                              })
                                       }


                                        $('[data-container="LojasToGo"]').toggleClass('hide');
                                        if(!$(this).hasClass('active')){
                                             
                                              $('[data-container="LojasToGo"] [list="lojas-togo"]').html(_html);
                                            }
                                              $('[action="set-togo"]').addClass('active'); 
                                              $('[action="set-address"]').removeClass('active');
                                              $('[list="lojas-togo"] li').removeClass('active');


                          })

                         

                                              $(document).on('click','[list="lojas-togo"] li', function(){
                                                
                                                   if(!$(this).hasClass('closedStore')){
                                                
                                                        $(this).addClass('active');
                                                        $('[action="set-togo"]').addClass('active');
                                                        $(this).find('img').attr('src',"App/views/public/images/logo.png");  
                                                        $('[action="set-togo"]').find('img').attr('src',"App/views/public/images/logo.png");
                                                     
                                                        listProdutosFinalizacaoPedido();
                                                        getTimeProduction();
                                                         localStorage.removeItem('NO-ATENDENTE');
                                                     }   
                                              })


                                              $(document).on('click','[list="lojas-togo"] li.active', function(){

                                                        $('[action="set-togo"]').removeClass('active');
                                                        $('[action="set-togo"]').find('img').attr('src',"App/views/public/images/logo-black.png");
                                                        $('[data-container="LojasToGo"]').addClass('hide');

                                                        listProdutosFinalizacaoPedido();
                                              })


                                  



                      /***
                         *   @author Erick Eduardo[erick@accon.com.br]
                         *   @access public
                         *   @exemple Controlador de Operações para ADDRESS
                         */

                              $(document).on('click','[action="set-address"]', function(){
                                              
                                              // TRATAMENTOS PARA TOGO
                                              $('[list="lojas-togo"] li.active').click();
                                              $('[list="lojas-togo"] li').removeClass('active');
                                              $('[data-container="LojasToGo"]').addClass('hide');
                                              $('[data-container="AddressFinaliza"]').removeClass('hide');
                                              $(this).addClass('active');
                                              $('[action="set-togo"]').removeClass('active'); 
                                              listAddress(); 
                                              __SETLocalStorage('NO-ATENDENTE', true);
                                              $('[action="set-togo"]').find('img').attr('src',"App/views/public/images/logo-black.png");
                                        

                                                                                  
                             })




                            $(document).on('click','[data-container="AddressFinaliza"] li', function(){
                               
                                      $(this).addClass('active');
                                      $('[action="set-address"]').addClass('active');
                                      $(this).find('img').attr('src',"App/views/public/images/logo.png");  
                                      $('[action="set-address"]').find('img').attr('src',"App/views/public/images/logo.png");
                                   
                                        listProdutosFinalizacaoPedido();
                                        getTimeProduction();
                                        localStorage.removeItem('NO-ATENDENTE');
                                      

                            })
                         

                             $(document).on('click','[data-container="AddressFinaliza"] li.active', function(){

                                var THIS = $(this);                                
                                setTimeout(function() {

                                    THIS.removeClass('active');
                                    $('[action="set-address"]').removeClass('active');
                                    THIS.find('img').attr('src',"App/views/public/images/logo-black.png");  
                                    $('[action="set-address"]').find('img').attr('src',"App/views/public/images/logo-black.png");
                                    listProdutosFinalizacaoPedido();
                                     $('[data-container="Address"]').addClass('hidden');
                                     $('[data-container="AddressFinaliza"]').addClass('hide');
                                      

                                }, 500);

                            })
                          
                       
          }






function listLojas(DATA){

        var _LOJAS  = DATA;
        var $container = $('section[view="Lojas"] [list="lojasEcommerce"]');
        var _html = '';


            _LOJAS.forEach(function(loja) {

                                             _html += '<li data-id="'+loja.REST_ID+'">'+
                                                          '<a href="tel:4002 4003" class="hidden-lg"><button class="pull-right" style="margin-left: 15px"><i class="icon flaticon-phone370"></i> <span class="hidden-xs">Ligar</span></button></a>'+
                                                          '<h3>'+loja.REST_ECOMMERCE_NOME+'</h3>'+
                                                          '<p><span class="hidden-xs">Endereço: </span>'+loja.REST_LOGRADOURO+' <br/> '+loja.REST_CIDADE_NOME+' - '+loja.REST_UF+' / CEP: '+loja.REST_CEP+'</p>'+
                                                          '<p><strong>'+loja.REST_TELEFONE+'</strong> <strong><i class="icon flaticon-clock100"></i> 18:00 - 23:30</strong></p>'+
                                                          '<p>'+
                                                                getAtividadesLoja(loja.REST_ECOMMERCE_ATIVIDADES)+
                                                              '<span onClick="openMap('+loja.REST_ECOMMERCE_LAT+','+loja.REST_ECOMMERCE_LONG+')" class="map open-map"><i class="icon flaticon-map103"></i> Mapa </span>'+
                                                         ' </p>'+
                                                      '</li>';
                                                       

                                        })
            $container.html(_html);

}



function setLojaMap(){

       $(document).on('click', '.pedido [targetLoja]',function(event){

           var $container = $('section[view="Lojas"] [list="lojasEcommerce"]');
            var _LOJA  = $(this).attr('targetloja');

                         $container.find('[data-id]').find('.open-map').removeClass('active');
                         $container.find('[data-id="'+_LOJA+'"]').find('.open-map').addClass('active').click();

      })
}



function getAtividadesLoja(DATA){

            _html = '';
            
                        DATA.split(',').forEach(function(atividade){

                              switch(atividade) {
                                
                                case 'D':
                                          
                                          _html += '<span class="green feature"><i class="icon flaticon-man459"></i> Delivery </span>';
                                  break;

                                case 'T':
                                          _html += '<span class="green feature"><i class="icon flaticon-man460"></i> To-Go </span>';

                                  break;

                               case 'R':
                                          _html +=  '<span class="green feature"><i class="icon flaticon-front17"></i> Restaurante </span>';

                                  break;
                                };
                        });

            return _html;
}










function getTimeProduction(){

       setTimeout(function() {

              $boxTimeProduction = $('[data-recept="time-production"]');

                  _TIME = (__GETLocalStorage('ATENDENTE')[0].TOGO != undefined) ? 'Tempo estimado para a coleta: ' + __GETLocalStorage('ATENDENTE')[0].LOJA.REST_ECOMMERCE_TEMPO_TOGO + 'min' : 'Tempo estimado para a entrega: ' +__GETLocalStorage('ATENDENTE')[0].LOJA.REST_ECOMMERCE_TEMPO_DELIVERY + 'min';

                        $boxTimeProduction.html(_TIME);

        }, 500);
}







