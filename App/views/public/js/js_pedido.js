/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pelo gerenciamento de compras
   *
   **/

$(function(){
  
      // INITIALIZE
      finalizaPedido();   
      dropListBadge();
      setFinalizaPedido();
      checkFinalizaPedido();
      listOptionsDetails();
      halfProduct();
      localStorage.removeItem('PEDIDO');
      setLojaToGo();
      selectFistItem();
      validateForms();



  })


function __addPedido(ITEM){


          checkFracaoItens(ITEM);
         __SETLocalStorage('PEDIDO', ITEM);
         getPedido(ITEM);
         clearCardapio();
         checkHalfProduct(__GETLocalStorage('PEDIDO'));
}




function getPedidoUser(){


    var DATA_USER =  __GETLocalStorage('ACCESS');


       $.ajax({
                url: __GETLocalStorage('CONFIG').API.SQL,
                type: 'GET',
                data: {
                        AJAX: true,
                        SERVICE: 'PEDIDO',
                        METHOD: 'GET',
                        OPERATION: 'ALL',
                        CLIE: DATA_USER.CLI_LOGIN,
                        ATENDENTE: __GETLocalStorage('ATENDENTE'),
                        REST: __GETLocalStorage('LOJA')
                         },
              })
              .done(function(){})
              .fail(function(){})
              .always(function(response){
                  
                    var DATA = JSON.parse(response);

                         __SETLocalStorage('PEDIDOS-USER', DATA);
                         listPedidos(true);
                      
             
              })
                
  }



function checkPedidoUser(){


    var DATA_USER =  __GETLocalStorage('ACCESS');

         if(DATA_USER){

               $.ajax({
                        url: __GETLocalStorage('CONFIG').API.SQL,
                        type: 'GET',
                        data: {
                                AJAX: true,
                                SERVICE: 'PEDIDO',
                                METHOD: 'GET',
                                OPERATION: 'ALL',
                                CLIE: DATA_USER.CLI_LOGIN,
                                ATENDENTE: __GETLocalStorage('ATENDENTE'),
                                REST: __GETLocalStorage('LOJA')
                                 },
                      })
                      .done(function(){})
                      .fail(function(){})
                      .always(function(response){
                       
                              var DATA = JSON.parse(response);

                                    

                                      var ID_SELECTED = $('[list="PedidosUser"] .pedido.active').attr('data-id');
                                         __SETLocalStorage('PEDIDOS-USER', DATA);
                                         listPedidos(false);
                                          checkStatusPedido(DATA);
                                        
                                      if(ID_SELECTED){
                                          
                                          $('[list="PedidosUser"] [data-id="'+ID_SELECTED+'"]').addClass('active');
                                          $('[list="PedidosUser"] [data-id="'+ID_SELECTED+'"]').find('.row').css({'display':'block'}) 

                                        }
                      })
            }
                
  }




    
function getPedido(PEDIDOS){

      var NUM_PRODUTOS  =  $('.num-produtos');
      var VALOR_TOTAL   =  $('[role="total-pedido"]');
      var TOTA_FINALIZA =  $('.valor-total-finaliza');
      var ITENS = [];
      var VALORES = [];

            $.each(PEDIDOS, function(index, val) {
                        ITENS.push(val.QUANTIDADE);
                        VALORES.push(val.TOTAL);
              })
                        NUM_PRODUTOS.text(array_sum(ITENS));
                        VALOR_TOTAL.html('R$ '+number_format(array_sum(VALORES), 2, ',', '.'));
                        
}





function settingsPedido(){
         
         $('select[name="tipo"] option').each(function(index, el) {
               
              if($(this).attr('data-id') == 18){
                       $(this).trigger('change');
              }   
         })
   
       $('select[name="tamanho"] option').each(function(index, el) {
               
              if($(this).attr('data-sgl') == "GRD"){
                  $(this).attr('selected', true).trigger('change');
              }   
         })
}





function checkFracaoItens(PEDIDO){

    var RESPONSE = [];
              
              $.each(PEDIDO, function(index, ITEM) {
                      
                      if (ITEM.ID_FRACAO == "check") {
                        
                             RESPONSE.push(ITEM);
                         }
              })
                      
    
            if(RESPONSE.length >= 2){
                 
                  RESPONSE[0].ID_FRACAO = RESPONSE[1].ID;
                  RESPONSE[0].APELIDO_FRACAO = RESPONSE[1].DESCRICAO;
                  RESPONSE[1].ID_FRACAO = RESPONSE[0].ID;
                  RESPONSE[1].APELIDO_FRACAO = RESPONSE[0].DESCRICAO;
            }
           
}





function dropListBadge() {
      
      $(document).on('click', '#cart, [action="list-edit-pedido"]', function(event) {
              
                  $('#basket').css('right', '0px');
                  $('body').addClass('overflow');
                  $('body > *').css('right', $('#basket').width() + 'px').css('left', 'auto');
                                 
 
        })
}





function setFinalizaPedido() {
     

      $(document).on('click', '[target="Finaliza"]',function(event) {

            if(__GETLocalStorage('ATENDENTE')){
                
                getTimeProduction();
                $dataAtendente = __GETLocalStorage('ATENDENTE');
                $dataAtendente = $dataAtendente[0]; 
              
                $containerAddress = $('[container="address"]');
                $inputCep    = $('[name="cep-address"]');
                $inputRua    = $('[name="rua-address"]');
                $inputBairro = $('[name="bairro-address"]');
                $inputEstado = $('[name="estado-address"]');
                $inputCidade = $('[name="cidade-address"]');
                
                if($dataAtendente.CEP){
                
                      $inputCep    = $('[name="cep-address"]').val($dataAtendente.CEP.cep);
                      $inputRua    = $('[name="rua-address"]').val($dataAtendente.CEP.logradouro);
                      $inputBairro = $('[name="bairro-address"]').val($dataAtendente.CEP.bairro);
                      $inputEstado = $('[name="uf-address"]').val($dataAtendente.CEP.uf);
                      $inputCidade = $('[name="localidade-address"]').val($dataAtendente.CEP.localidade);

                }
                 
                 $('form#addressedit input').each(function(index, el) {
                          
                          if(($(this).val() == '')){
      
                                $(this).addClass('warning');
                          };
                 }); 

          }

                 event.preventDefault();

      })

  }






function finalizaPedido(){

      $(document).on('click', 'a[action="finaliza-pedido"]', function(event) {
                            
                            event.preventDefault();
                           
                            var $obsPedido       = $('[name="obs-finaliza-pedido"]');
                            var $cpfNotaNominal  = $('input[name="cpf-nota-nominal"]');
                            var _pgto = getPgtoPedido();
                 
                            var _tipoPedido =   ( ($('[list="lojas-togo"] li.active').size() || ( $('[list="address-usuario"] li.active').size() && !$('[list="address-usuario"] li.active').hasClass('closedStore') )  ? true : false));  
                            var isValid = true;

                            if((_pgto.ID == undefined) || (!_tipoPedido) || (__GETLocalStorage('NO-ATENDENTE'))){

                                isValid = false;
                            
                            }

                            var $PEDIDO = __GETLocalStorage('PEDIDO');
                            var _VOUCHER  = __GETLocalStorage('VOUCHER');
                                _VOUCHER  = (_VOUCHER) ? _VOUCHER[0] : null;
   

                            var $DATA = {
                                           PEDIDO: __GETLocalStorage('PEDIDO'),
                                           ACCESS: __GETLocalStorage('ACCESS'),
                                           ATENDENTE: __GETLocalStorage('ATENDENTE'),
                                           ADDRESS: $('[view="Finaliza"] .address-user-finaliza li.active').attr('data-id'),
                                           PGTO:  _pgto.ID,
                                           PGTO_SGL:  _pgto.SGLA,
                                           PED_QTD_ITENS: $PEDIDO.length,
                                           PED_QTD_PRODUTOS: getQtdPedido('PRODUTOS'),
                                           PED_DATA_MOVIMENTO: getDataMovPedido(),
                                           PED_VLR_PRODUTOS: getValorPedido(),
                                           PED_VLR_ACRESCIMOS: getAdicionaisPedido(),
                                           PED_TAXA_ENTREGA: getTaxaPedido(),
                                           PED_PGTO_DESC: _pgto.NAME,
                                           PED_VLR_PEDIDO: getTotalPedido(),
                                           PED_VLR_PAGO: getTotalPedido(),
                                           PED_VLR_RECEBIDO:  getTransacaoUser('RECEBIDO'),
                                           PED_VLR_TROCO: getTransacaoUser('TROCO'),
                                           PED_DES_ID: (_VOUCHER) ? _VOUCHER.ID_DESCONTO : null,
                                           PED_VLR_DESCONTO: (_VOUCHER) ? _VOUCHER.VALOR_DESCONTO : null,
                                           PED_OBS: (_VOUCHER) ? _VOUCHER.CODIGO +'-'+_VOUCHER.DESCRICAO_DESCONTO +'-'+_VOUCHER.VALOR_DESCONTO : null,
                                           PED_DES_ID_CODIGO:(_VOUCHER) ? _VOUCHER.ID_CODIGO : null,
                                           PED_TEM_BEBIDA: checkGroup('BEBIDAS'),
                                           PED_ORIGEM: (($('li[action="set-togo"]').hasClass('active')) ? 'TGO' : 'WEB' ),
                                           PED_TEM_SOBREMESA: checkGroup('SOBREMESAS'),
                                           CPF_NOMINAL: ( ($('input[type="checkbox"][name="cpf-nota-nominal"]').is(':checked')) ? $cpfNotaNominal.val() : null )
                                        }

                                   if(isValid){

                                          $.ajax({
                          
                                            url: __GETLocalStorage('CONFIG').API.SQL,
                                            type: 'POST',
                                            data: {
                                                    AJAX: true,
                                                    SERVICE: 'PEDIDO',
                                                    METHOD: 'POST',
                                                    OPERATION: 'INSERIR',
                                                    DATA: $DATA
                                              },
                                          })
                                          .done(function(){})
                                          .fail(function(){})
                                          .always(function(response){
                                              
                                                var DATA = JSON.parse(response);

                                                    var idPedido = DATA.PEDIDO.PED_ID;
                                                                                                 
                                                        getPedidoUser();
                                                        $('[target="Pedidos"]').trigger('click');

                                                        setTimeout(function() {

                                                              $('[view="Pedidos"] [list="PedidosUser"]').find('.pedido[data-id="'+idPedido+'"] h3:first').trigger('click');



                                                        }, 2000);
                                                        
                                                        clearPedido();
                                                        clearCupom();
                                                        listAddress();
                                                        sendEmail({
                                                                   ACTION: 'PEDIDO',
                                                                   POST:  DATA
                                                        })

                                              })
                                        }else{

                                             alert('<big><i class="flaticon-warning37"></i></big>', 'Por gentileza, escolha '+((_pgto.ID == undefined) ? 'a forma de pagamento' : 'o canal de entrega' ));

                                        }
                 
      })
}




function getAddressPedido(){

  var _idAddress = $('[list="address-usuario"] li.active').attr('data-id');
      
      return _idAddress;
}




function getPgtoPedido(){

  var _idPgto = $('[list="formas-ptgo"] input[name="pagamento"]:checked').val();
  var _desPgto = $('[list="formas-ptgo"] input[name="pagamento"]:checked').attr('as');
  var _sglPgto = $('[list="formas-ptgo"] input[name="pagamento"]:checked').attr('sgl');
      
      return {
                ID:   _idPgto,
                NAME: _desPgto,
                SGLA: _sglPgto
              };
}




function getQtdPedido(TYPE){

      var PEDIDO =  __GETLocalStorage('PEDIDO');
      var _quatidadeItens = null;

        switch(TYPE) {
            
            case 'ITENS':
          
                 $.each(PEDIDO, function(index, getPedido) {
                        _quatidadeItens += parseInt(getPedido.QUANTIDADE);
                 });
            break;
            
            case 'PRODUTOS':
                
                $.each(PEDIDO, function(index, getPedido) {
                      _quatidadeItens += parseInt(getPedido.QUANTIDADE);
                });
            break;
        }

      return _quatidadeItens
}





function getDataMovPedido(){

        var ATENDENTE =  __GETLocalStorage('ATENDENTE');
        var LOJA      =  getLojaIn(ATENDENTE[0].LOJA.REST_ID);

         return LOJA.STATE.DAYMOV;
    }




function getTotalPedido(){

      var PEDIDO     =  __GETLocalStorage('PEDIDO');
      var sumPedido = null;
      var _VOUCHER  = __GETLocalStorage('VOUCHER');
      var _CUPOM = (_VOUCHER) ? _VOUCHER[0].VALOR_DESCONTO : 0;

        if(PEDIDO){

                 $.each(PEDIDO, function(index, getPedido) {
                          sumPedido += parseFloat(getPedido.TOTAL);
                   });

                      var _response = parseFloat(sumPedido) + parseFloat(getTaxaPedido()) - _CUPOM;
                                    return parseFloat(_response.toFixed(2));
          
        }
}



function getValorPedido(){

      var PEDIDO =  __GETLocalStorage('PEDIDO');
      var sumPedido = null;

               $.each(PEDIDO, function(index, getPedido) {
                        sumPedido += parseFloat(getPedido.TOTAL);
                 });

      return (parseFloat(sumPedido));
}





function getTransacaoUser(argument){

      var $valorRecebidoPedido = $('[name="valor-recebido"]');
      var _response = null;

        switch(argument) {
          
            case 'TROCO':
                        _response = ( parseFloat($valorRecebidoPedido.val()) -  parseFloat(getTotalPedido()));
              break;

            case 'RECEBIDO':
                        _response = parseFloat($valorRecebidoPedido.val());
              break;
        }
             
          return parseFloat(_response.toFixed(2));

}




function getAdicionaisPedido(){

      var PEDIDO =  __GETLocalStorage('PEDIDO');
      var ADICIONAIS =  [];
      var sumAdd = null;


      $.each(PEDIDO, function(index, getItem) {
                  
           $.each(getItem.ADICIONAIS, function(index, getAdicioanais) {
           
                ADICIONAIS.push(getAdicioanais.VALOR);

            });
      })
    
       return (array_sum(ADICIONAIS) > 0) ? parseFloat(array_sum(ADICIONAIS).toFixed(2)) : 0.00;
}





function getTaxaPedido(){

            if( isValid(__GETLocalStorage('ATENDENTE')) && $('[list="lojas-togo"] li.active').size() == 0){

            var TAXA   =  __GETLocalStorage('TAXAS');
            var ATENDENTE = __GETLocalStorage('ATENDENTE');
            var LOJA_ATENDENTE = (ATENDENTE[0].LOJA) ? ATENDENTE[0].LOJA.REST_ID : ATENDENTE.REST_ID;
            var _taxa = null;

            $.each(TAXA, function(loja, getTaxa) {

              if(loja == LOJA_ATENDENTE){

               _taxa = getTaxa[0].DTA_VAL;
             }
           })

              return _taxa;

          }else{

              return 0;
          }

}




function checkGroup(argument){

        var GRUPOS = __GETLocalStorage('GRUPOS');
        var PEDIDO =  __GETLocalStorage('PEDIDO');
        var _group = null;
        var _response = null;

          $.each(GRUPOS, function(index, getGroup) {  

                if(argument == getGroup.PGR_GRUPO){

                      _group = getGroup.PGR_ID;

                }
          })

        $.each(PEDIDO, function(index, getItem) {
          
               if(getItem.GRP == _group){
                            
                       _response = true;
               }
                  
        })
          return (_response) ? 'S' : 'N'; 
}





function listPedidos(check){



    var _PEDIDOS = __GETLocalStorage('PEDIDOS-USER');
    var $containerPedidos = $('[list="PedidosUser"]');
    var   $html = '';


           
                       
      $.each(_PEDIDOS, function(index, getPedidos) {
            
            
              var _LOJA_ATENDENTE = getLojaIn(getPedidos.REST);
               
              $.each(getPedidos.PEDIDOS, function(index, getPedido) {
            
                            var $PEDIDO  = getPedido.PEDIDO;
                            var $ITENS   = getPedido.ITENS;
                            var $TIME    = getPedido.TIME;
                            var $DATA    = parseDate($PEDIDO.PED_DATA); 
                            var $ADDRESS = null;
                            var $FORMA_PAGAMENTO = null;
                            var $htmlItens = '';
                            var iCombo     = 0;
                            var $htmlcombo = '';
                           
                                     
                            $.each(getInPgto(_LOJA_ATENDENTE.REST_ID), function(index, getForma) {
                                
                                      
                                    if(getForma.FPG_ID == $PEDIDO.PED_ID_PGTO){

                                          $FORMA_PAGAMENTO = getForma;
                                    }       

                            })


                              $.each(getPedidos.ADDRESS, function(index, getAddress) {

                                    if(getAddress.CDA_ID == $PEDIDO.PED_ID_ENDERECO){

                                          $ADDRESS = getAddress;
                                    }       

                            })  


                  $.each($ITENS, function(index, getItem) {

                       var $ADICIONAIS = unserialize(getItem.PIT_ITEM_ADCIONAIS_ECOMMERCE);
                       var $RETIRADAS  = unserialize(getItem.PIT_ITEM_RETIRADAS_ECOMMERCE);
                       var valorAdd = 0;
                       var $htmlAdd = '';
                       var $htmlRemove = '';
        
                        
                         var $PRODUTO = getInProduto(getItem.PIT_PROD_ID);
                         var _PRODUTO = $PRODUTO.PRODUTO;

                       
                            if($ADICIONAIS.length > 0){
                                  $ADICIONAIS.forEach(function(add) {

                                       $htmlAdd += '<cite> + R$ '+number_format(add.VALOR * getItem.PIT_FRACAO, 2, ',', '.')+' ('+add.APELIDO+')</cite><br/>';
                                        valorAdd += parseFloat(add.VALOR * getItem.PIT_FRACAO);
                                  })
                            }

                            if($RETIRADAS.length > 0){
                                    $RETIRADAS.forEach(function(remove) {

                                         $htmlRemove += '<cite> s/ ('+remove.APELIDO+')</cite><br/>';
                    
                                    })
                                }



                                /***
                                   *   @author Erick Eduardo[erickeduardo@accon.com.br]
                                   *   @exemple LISTAGEM DOS ITENS PERTENCENTES AO COMBOS  
                                   *
                                   **/
                                          var _COMBO = getInCombo(getItem.PIT_COMBO);
                                      

                                      if(_COMBO){
                                          
                                         
                                                $htmlcombo  +=   (((iCombo == 0) ? '<p><span class="label-item-combo"><i class="fa fa-star"></i> '+ _COMBO.CMB_DESCRICAO_ECOMMERCE +' </span> <img src="/App/views/public/images/promocoes/'+(_COMBO.CMB_IMAGEM_ECOMMERCE)+'" width="120px" style="margin-right: 16px;" class="pull-right"></p><br><br><br>' : '' ))+
                                                                  '<p><span>'+((getItem.PIT_FRACAO == 0.5) ? '1/2' : getItem.PIT_QTD)+' X</span>  '+_PRODUTO.PRO_DESCRICAO_ECOMMERCE+'  </p>'+
                                                                          '<p class="text-right">'+
                                                                              $htmlRemove+
                                                                          '</p><br>'+
                                                                          '<p class="text-right">'+
                                                                              $htmlAdd+
                                                                          '</p>'+
                                                                          '<p class="text-right">'+
                                                                              //'<strong class="no-border">'+((getItem.PIT_FRACAO == 0.5) ? 'MEIA PIZZA' : 'UND')+': R$ '+number_format(getItem.PIT_PRC_UNITARIO * getItem.PIT_FRACAO, 2, ',', '.')+'</strong>'+ 
                                                                              //'<strong class="no-border '+(($ADICIONAIS.length == 0) ? 'hide' : '' )+'">ACRÉSC: R$ '+number_format(valorAdd, 2, ',', '.')+'</strong>'+ 
                                                                              '<strong>R$ '+number_format((parseFloat(getItem.PIT_PRC_TOTAL)), 2, ',', '.')+'</strong>'+
                                                                          '</p>';
                                                                          iCombo++;
                                    }else{

                                               $htmlItens +=  '<div class="item">'+
                                                                  '<p><span>'+((getItem.PIT_FRACAO == 0.5) ? '1/2' : getItem.PIT_QTD)+' X</span>  '+_PRODUTO.PRO_DESCRICAO_ECOMMERCE+'  </p>'+
                                                                  '<p class="text-right">'+
                                                                      $htmlRemove+
                                                                  '</p>'+
                                                                  '<p class="text-right">'+
                                                                      $htmlAdd+
                                                                  '</p>'+
                                                                  '<p class="text-right">'+
                                                                      //'<strong class="no-border">'+((getItem.PIT_FRACAO == 0.5) ? 'MEIA PIZZA' : 'UND')+': R$ '+number_format(getItem.PIT_PRC_UNITARIO * getItem.PIT_FRACAO, 2, ',', '.')+'</strong>'+ 
                                                                      //'<strong class="no-border '+(($ADICIONAIS.length == 0) ? 'hide' : '' )+'">ACRÉSC: R$ '+number_format(valorAdd, 2, ',', '.')+'</strong>'+ 
                                                                      '<strong>R$ '+number_format(getItem.PIT_PRC_TOTAL, 2, ',', '.')+'</strong>'+
                                                                  '</p>'+
                                                              '</div>';

                                    }
               
                  })
                            
                            
                            var _VOUCHER = (($PEDIDO.PED_OBS) ? $PEDIDO.PED_OBS.split('-') : []);
                            if($htmlcombo != ''){ $htmlItens += '<div class="item">'+ $htmlcombo +'</div>'; } 

                             $htmlItens += '<p '+(($PEDIDO.PED_ORIGEM == 'WEB') ?  '' : 'class="hide"' )+'> <i class="flaticon-man459 hidden-xs" style="font-size: 40px;"> </i><span style="font-size: 13px" class="noborder">TAXA DE ENTREGA</span><small class="valor-taxa-finaliza"> <strong>R$ '+number_format($PEDIDO.PED_TAXA_ENTREGA, 2, ',', '.') +'</strong></small></p><p style="clear:both"></p>';
                               if(_VOUCHER.length > 0){

                                  $htmlItens += (($PEDIDO.PED_ID_PGTO) ? '<p class="alert alert-danger"><i class="flaticon-tag71 hidden-xs" style="font-size: 40px;"> </i><small style="padding-left: 14px; top: -14px; position: relative;">Desconto por cupom: <small style="background: #A94442; padding: 4px 6px; border-radius: 5px; color: white;">'+(_VOUCHER[0] )+'</small></small><small class="valor-taxa-finaliza" style="margin-right: -14px;"> <strong>R$ '+number_format(parseFloat(_VOUCHER[2]), 2, ',', '.') +'</strong></small></p><p style="clear:both"></p>' : '');
                            }

                               $html += ' <div class="pedido"  data-id="'+$PEDIDO.PED_ID+'"  >'+
                                                '<h3>#'+$PEDIDO.PED_ID+ '<span class="hidden-xs visible-lg-* label label-default" style="display: inline-block; background: none; border: 1px solid #D1D1D1; color: black; margin-left: 15px; min-width: 100px">'+(($PEDIDO.PED_ORIGEM == 'WEB') ?  'Delivery' : 'To Go' )+' </span>' +
                                                // ' <span class="pull-right label label-default">há '+$TIME+'</span>'+
                                                '</h3><div class="row cursor-auto" style="display:'+
                                                '</h3>'+
                                                '<div class="row cursor-auto">'+
                                                    '<div class="col col-md-6">'+
                                                        '<h3> <i class="icon flaticon-clock100"></i> Acompanhe seu pedido</h3>'+
                                                          '<div class="hide alert alert-warning" role="alert">'+
                                                              '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                                              '<i class="icon flaticon-clock100"></i> Seu pedido mudou de status'+
                                                        '</div>'+
                                                        '<div class="row text-center status '+(($PEDIDO.PED_STATUS == 'C') ? 'hide' : '')+'">'+
                                                            '<p class="text-left">Status atual do seu pedido:</p>'+
                                                             '<div class="col col-sm-4  '+(($PEDIDO.PED_STATUS == 'A') ? 'active' : '')+'">'+
                                                                '<p class="nomargin"><big style="font-size: 3em;"> <i style="font-size: 54px;" class="icon flaticon-clock100"></i> </big></p>'+
                                                                 ' PROCESSANDO'+
                                                              '</div>'+
                                                              '<div class="col col-sm-4 '+(($PEDIDO.PED_STATUS == 'M') ? 'active' : '')+'">'+
                                                                '<p class="nomargin"><big style="font-size: 3em;"> <i style="font-size: 54px;" class="icon flaticon-settings49"></i> </big></p>'+
                                                                  'MONTAGEM'+
                                                              '</div>'+
                                                             ' <div class="col col-sm-4 '+(($PEDIDO.PED_STATUS == 'E' || $PEDIDO.PED_STATUS == 'O' || $PEDIDO.PED_STATUS == 'B') ? 'active' : '')+'">'+
                                                                  (($PEDIDO.PED_ORIGEM == 'WEB') ? '<p class="nomargin"><big style="font-size: 3em;"> <i style="font-size: 54px;" class="icon flaticon-man459"></i> </big></p> SAIU PARA ENTREGA' : '<p class="nomargin"><big style="font-size: 3em;"> <i style="font-size: 54px;" class="icon flaticon-briefcase50"></i>  </big></p><span class="no-border" style="font-size: 12px;">PRONTO PARA BUSCAR</span> ' )+
                                                            '</div>'+
                                                            '<div class="clearfix '+(($PEDIDO.PED_STATUS != 'C') ? 'hide' : '')+'">'+
                                                                '<div class="col col-sm-12 active">'+
                                                                  '<p class="nomargin"><big style="font-size: 3em;"> <i style="font-size: 54px;" class="icon flaticon-report"></i> </big></p>'+
                                                                    'PEDIDO CANCELADO'+
                                                                '</div>'+
                                                            '</div>'+
                                                            '<div style=" margin-top: 10px; margin-bottom: 25px" title="Última atualização" class="text-right"><i class="fa fa-clock-o"></i> '+ $DATA.DATE + ' às ' +$DATA.HOUR+'</p></div>'+
                                                      
                                                            '<h3 class="text-left" style="margin-bottom: 15px"><i class="icon flaticon-map103"></i> Endereço </h3>' +
                                                            '<p class="text-left"><strong>'+(($PEDIDO.PED_ORIGEM == 'WEB') ?  'Loja atendente:' : 'Pedido retirado na loja:' )+'</strong> <a target="Lojas" action="view" targetLoja="'+_LOJA_ATENDENTE.REST_ID+'" style="cursor: pointer;"> '+_LOJA_ATENDENTE.REST_ECOMMERCE_NOME+'  <i class="icon flaticon-map103"></i></a> <br/>  <strong>'+(($PEDIDO.PED_ORIGEM == 'WEB') ?  'Endereço de entrega:' : 'Endereço de retirada:' )+' </strong> '+(($PEDIDO.PED_ORIGEM == 'WEB') ?  $ADDRESS.CDA_LOGRADOURO : _LOJA_ATENDENTE.REST_LOGRADOURO )+'<br>'+
                                                            '<strong>Cep: </strong> '+$ADDRESS.CDA_CEP+'  <br>'+
                                                            '<strong>Cidade: </strong>  '+$ADDRESS.CDA_CIDADE+' -  '+$ADDRESS.CDA_UF+' </p>'+
                                                            '<p '+(($PEDIDO.PED_ORIGEM == 'WEB') ?  'class="hide"' : '' )+' class="text-left"> <i class="fa fa-phone"></i> <span>' +_LOJA_ATENDENTE.REST_TELEFONE+ '</span></p>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="col col-md-6">'+
                                                        '<h3><i class="icon flaticon-list89"></i> Resumo do pedido</h3>'+
                                                        '<div class="itens clearfix">'+$htmlItens+
                                                            '<div class="text-right" style="margin-bottom: 30px"><small class="">  <h5 style="display: inline; background-color: transparent"> TOTAL  </h5> </small>'+
                                                            '<small class=""> <strong> R$ '+number_format($PEDIDO.PED_VLR_PEDIDO, 2, ',', '.')+'</strong> </small></div>'+
                                                        '</div>'+
                                                        '<h3> <i class="icon flaticon-credit98"></i> Forma de pagamento</h3>'+
                                                        '<div class="row container-frm-pgto-pedido">'+
                                                                '<div class="col-md-4">'+
                                                                   '<label class="text-center"><img src="App/views/public/images/checkout/'+$FORMA_PAGAMENTO.FPG_IMG_ECOMMERCE+'"/><br/>'+$FORMA_PAGAMENTO.FPG_DESCRICAO+'</label>'+
                                                                '</div>'+
                                                                '<div class="col-md-8 text-right '+((parseInt($PEDIDO.PED_VLR_TROCO) == 0) ?  'hide' : '' )+'">'+
                                                                        '<p><h6> TROCO PARA? : <strong  style="font-size: 14px;"> R$ '+number_format($PEDIDO.PED_VLR_RECEBIDO, 2, ',', '.')+'</strong></h6></p>'+
                                                                        '<p><h6> VALOR DO TROCO: <strong  style="font-size: 14px;"> R$ '+number_format($PEDIDO.PED_VLR_TROCO, 2, ',', '.')+'</strong></h6></p>'+
                                                                 '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>';
                      })  
                    })  
                   
                  $containerPedidos.html((($html != '') ? $html : '<center>Você ainda possui nenhum pedido.</center>')); 




}









function checkFinalizaPedido(){


      $(document).on('click', '[target="Finaliza-check"]', function(event) {

                _STATE = __GETLocalStorage('STATE');
                _LOJA_ATENDENTE = __GETLocalStorage('ATENDENTE');
               
              
                 /***
                   *   @author Erick Eduardo[erick@accon.com.br]
                   *   @example BACK TO DEFAULT STATE
                   *
                   **/
                      $('[data-container="AddressFinaliza"], [data-container="LojasToGo"]').addClass('hide');
                      $('li').removeClass('active');
                      $('[action="set-togo"]').find('img').attr('src',"App/views/public/images/logo-black.png");
                                       
              
                 if(controleFracao){

                      alert('Por favor, escolha a outra metade da Pizza antes de finalizar');
                      setTimeout(function() { $('[target="Cardapio"]').click(); }, 20);

                 }else{

                       
                                   if(__GETLocalStorage('ATENDENTE') && __GETLocalStorage('ACCESS') && __GETLocalStorage('PEDIDO')){

                                            setTimeout(function() { 
                                            
                                                 $('[target="Finaliza"]').trigger('click'); cartMenu(); 
                                                // $('.address-user-finaliza li:first').click();
                                                //$('.address-user-finaliza li:first').addClass('active');
                                                 $('form[submit="address-finaliza"]').removeClass('hide');

                                            }, 20);
                                            
                                            
                                               
                                       }else if(__GETLocalStorage('PEDIDO')){

                                           setTimeout(function() {

                                                  $('[target="name-login"]').trigger('click'); cartMenu(); 
                                                  $('form[submit="login-user"]').addClass('redirect-finaliza'); 
                                                  $('form[submit="cadastro-cliente"]').addClass('redirect-finaliza'); 

                                                }, 20);
                                            
                                            
                                      }else{

                                           setTimeout(function() {  $('[target="Cardapio"]').trigger('click');  }, 20);
                                      } 

                        

                 }
                

        event.preventDefault();
 
      })

}











 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example REMOVE ITEM
   *   @return {[INTEGER]} 
   *
   **/
         function clearPedido() {
              
                      var PEDIDOS  = __GETLocalStorage('PEDIDO');
                      var ID_REMOVE  = null;
                          
                          $.each(PEDIDOS, function(index, ITEM) {
                           
                                         __RemoveLocalStorage(ITEM.PK,'PEDIDO');
                         })
             
                   
                      getPedido(__GETLocalStorage('PEDIDO'));
                 
                      
                           car = __GETLocalStorage('PEDIDO');
                       if(car.length == 0){ $('html').click()};
                       listCarBadge();

                        var textBadge = '<h4 class="white nomargin text-center">Cesta de itens</h4>'+
                                              '<p class="empty">'+
                                              '<small>Nenhum item selecionado</small> '+
                                        '</p>';

                    $('div[list="itens-pedido"]').html(textBadge);
              
}






function getPedidoStatusUser(){

    var DATA_USER =  __GETLocalStorage('ACCESS');

        if(DATA_USER){
                  
                  checkPedidoUser();
            setInterval(function(){ 

                  checkPedidoUser();
                   
                      }, 10000);
        }
}



function listOptionsDetails(){

      $(document).on('click', 'span[list="adicionais"] .ingr', function(event) {
             
            if(qtdIsValid()){

                getOptionsDetailsProduct((controleFracao) ? 'ADD_HALF_LABEL' : 'ADD');
            
            }else{
              
                $(this).removeClass('active');
                alert('Olá, você pode adiconar no máximo 3 ingredientes.')
            }

      })


        $(document).on('click', 'span[list="retirados"] .ingr', function(event) {
            
            getOptionsDetailsProduct((controleFracao) ? 'REMOVE_HALF_LABEL' : 'REMOVE');

      })

}





 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example OBTEM OS OPCIONAIS/RETIRADAS
   *   @return {[INTEGER]} 
   *
   **/
          function getOptionsDetailsProduct(TYPE){


                        switch(TYPE) {
                         
                              
                                case 'ADD':
                                          
                                     
                                          var RESPONSE = [];
                                          var $containerAdd = $('[list="options-param-product"]');
                                          var _html = '';
                                          var $containerDetails = $('.product-container');
                                          var _FRACAO = parseFloat($containerDetails.find(((controleFracao) ? '.size-product-callback .active' : '.size-product .active' )).closest('[data-value]').attr('data-value'));

                                        
                                      
                                          $('span[list="adicionais"] .ingr').each(function(index, el) {

                                                if($(this).hasClass('active')){

                                                    RESPONSE.push({
                                                        
                                                           value: (parseFloat($(this).attr('valor')) * _FRACAO) * parseInt($('#product #qnt big').text()),
                                                           name: $(this).attr('apelido')
                                                    })
                                                }
                                          })

                                              RESPONSE.forEach(function(obj) {

                                                _html += '<p value= ' + (obj.value) + '>+ R$ ' + (number_format(obj.value, 2, ',', '.')) + ' ( '+ obj.name +' ) </p>';
                                          })
                

                                
                                                $containerAdd.html(_html);
                                                 sumValuesProduct({
                                                                    DATA: RESPONSE,
                                                                    FINAL: false
                                                                  })
                                                return RESPONSE;
                                break;

                          


                           case 'ADD_HALF':
                                          

                                          var RESPONSE = [];
                                          var $containerAdd = $('span.add');
                                          var _html = '';
                                          var $containerDetails = $('.product-container');
                                          var _FRACAO = parseFloat($containerDetails.find(((controleFracao) ? '.size-product-callback .active' : '.size-product .active' )).closest('[data-value]').attr('data-value'));
                                                                   $('#morepanel').css('display', 'none');
                                      
                                          $('span[list="adicionais"] .ingr').each(function(index, el) {

                                                if($(this).hasClass('active')){

                                                    RESPONSE.push({
                                                        
                                                           value: (parseFloat($(this).attr('valor')) * _FRACAO) * parseInt($('#product #qnt big').text()),
                                                           name: $(this).attr('apelido')
                                                    })
                                                }
                                          })

                                              RESPONSE.forEach(function(obj) {

                                                _html += '<p value= ' + (obj.value) + '>+ R$ ' + (number_format(obj.value, 2, ',', '.')) + ' ( '+ obj.name +' ) </p>';
                                          })
                

                                
                                                $containerAdd.html(_html);
                                                 sumValuesProductFinal({
                                                                  
                                                                    DATA: RESPONSE,
                                                                    FINAL: true
                                                                  })
                                                return RESPONSE;
                                break;
                        
                          


                                  case 'REMOVE':
                                 
                                            var RESPONSE = [];
                                            var $containerRemove = $('[list="options-remove-product"]');
                                            var _html = '';
                                   
                                            $('span[list="retirados"] .ingr').each(function(index, el) {

                                                  if($(this).hasClass('active')){

                                                      RESPONSE.push({ name: $(this).attr('apelido') })
                                                  }
                                            })

                                            RESPONSE.forEach(function(obj) {

                                                  _html += '<p> s/ ( '+ obj.name +' ) </p>';
                                            })
                         
                                 
                                                  $containerRemove.html(_html);
                                                    sumValuesProduct({
                                                                    DATA: RESPONSE,
                                                                    ELEMENT: "REMOVE"
                                                                  })
                                                  return RESPONSE;
                                    break;



                                  case 'REMOVE_HALF':
                                 
                                            var RESPONSE = [];
                                            var $containerRemove = $('span.remove');
                                            var _html = '';
                                   
                                            $('span[list="retirados"] .ingr').each(function(index, el) {

                                                  if($(this).hasClass('active')){

                                                      RESPONSE.push({ name: $(this).attr('apelido') })
                                                  }
                                            })

                                            RESPONSE.forEach(function(obj) {

                                                  _html += '<p> s/ ( '+ obj.name +' ) </p>';
                                            })
                         
                                 
                                                  $containerRemove.html(_html);
                                                    sumValuesProductFinal({
                                                                    DATA: RESPONSE,
                                                                    ELEMENT: "value-product-final"
                                                                  })
                                                  return RESPONSE;
                                    break;





                           case 'ADD_HALF_LABEL':
                                          

                                          var RESPONSE = [];
                                          var $containerAdd = $('span.add-half');
                                          var _html = '';
                                          var $containerDetails = $('.product-container');
                                          var _FRACAO = parseFloat($containerDetails.find(((controleFracao) ? '.size-product-callback .active' : '.size-product .active' )).closest('[data-value]').attr('data-value'));
                                                                   $('#morepanel').css('display', 'none');
                                      
                                          $('span[list="adicionais"] .ingr').each(function(index, el) {

                                                if($(this).hasClass('active')){

                                                    RESPONSE.push({
                                                        
                                                           value: (parseFloat($(this).attr('valor')) * _FRACAO) * parseInt($('#product #qnt big').text()),
                                                           name: $(this).attr('apelido')
                                                    })
                                                }
                                          })

                                              RESPONSE.forEach(function(obj) {

                                                _html += '<p value= ' + (obj.value) + '>+ R$ ' + (number_format(obj.value, 2, ',', '.')) + ' ( '+ obj.name +' ) </p>';
                                          })
                

                                
                                                $containerAdd.html(_html);
                                                 sumValuesProductFinal({
                                                                  
                                                                    DATA: RESPONSE,
                                                                    FINAL: "SECOND"
                                                                  })




                                                return RESPONSE;
                                break;



                           case 'REMOVE_HALF_LABEL':
                                          

                                          var RESPONSE = [];
                                          var $containerRemove = $('span.remove-half');
                                          var _html = '';
                                          var $containerDetails = $('.product-container');
                                          var _FRACAO = parseFloat($containerDetails.find(((controleFracao) ? '.size-product-callback .active' : '.size-product .active' )).closest('[data-value]').attr('data-value'));
                                                                   $('#morepanel').css('display', 'none');
                                      

                                          $('span[list="retirados"] .ingr').each(function(index, el) {

                                                  if($(this).hasClass('active')){

                                                      RESPONSE.push({ name: $(this).attr('apelido') })
                                                  }
                                            })

                                            RESPONSE.forEach(function(obj) {

                                                  _html += '<p> s/ ( '+ obj.name +' ) </p>';
                                            })
                         
                                 
                                                  $containerRemove.html(_html);
                                                    sumValuesProductFinal({
                                                                    DATA: RESPONSE,
                                                                    ELEMENT: "value-product-final"
                                                                  })
                                                  return RESPONSE;
                                break;
                        


                        }
            }





      function qtdIsValid(){

            if($('span[list="adicionais"] .ingr.active').size() > 3){

                return false;
            }else{

                return true;
            }
      }






function halfProduct(){


    $(document).on('click', '.product-container .size-product .col', function(event) {
              
           if(!__GETLocalStorage('CTRL_PROMO')){
                       
                        $('.size-product .col').removeClass('active');
                        $(this).addClass('active');
                        $productContainer = $('.product-container');
                        $productCover     = $productContainer.find('.product .cover');

                     var HALF = ($(this).parent().hasClass('half-size')) ? true : false;  
                     var backgroundFirst  =  $productCover.find('div:first').css('background-image');
                     var $PRODUTO         =  $productContainer.find('[recept="value-product"]:visible');
                     var VALOR_PRODUTO    =  parseFloat($PRODUTO.attr('data-value'));
                     var $QUANTIDADE      =  $('.cart');
                     var _DESCRICAO       =  $('[data-container="integer-display-product"]').find('h4').html();


                            if(HALF){
                                   
                                    $('[data-container="integer-display-product"]').find('h4').html('1/2 '+_DESCRICAO);
                                    $productCover.addClass('meia default');
                                    $productCover.find('div').removeClass('hide');
                                    $productCover.find('i.up,i.down').addClass('hide');
                                   
                                    if(!controleFracao){ $productCover.find('div:last').css('background-image', '');}
                                    $PRODUTO.html('R$ '+number_format(VALOR_PRODUTO * 0.5, 2, ',','.')); 
                                    $QUANTIDADE.find('button').attr('disabled', true);
                                    $QUANTIDADE.find('big').html('1');
                                    $PRODUTO.addClass('half');
                                   
                            }else{
                             
                                    
                                   
                                    $productCover.removeClass('meia');
                                    $('[data-container="integer-display-product"]').find('h4').html(_DESCRICAO.substr(3));
                                    $('.product-container').find('button[action="save"]').text('Pedir').css({fontSize: "18px"});
                                    $productCover.find('div:last').css('background-image', backgroundFirst);
                                    $PRODUTO.html('R$ '+number_format(VALOR_PRODUTO, 2, ',','.')); 
                                    $QUANTIDADE.find('button').attr('disabled', false);
                                    $PRODUTO.removeClass('half');
                                  
                                 }
                                    getOptionsDetailsProduct('ADD');

             }
        })

}









function clearCardapio(){

      $('.product-container').find('.ingr').removeClass('active');    
}







 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example AO SELECIONAR UMA ITEM(LOJA) ToGo, é criado um objeto local com os dados da Loja selecionada
   *            O Objeto será parâmetro para o método de InserÇão de Usuários    
   *   @return {[INTEGER]} 
   *
   **/
    function setLojaToGo(){


        $(document).on('click', '[list="lojas-togo"] .redux', function(){

              if(!$(this).hasClass('closedStore')){
                
                      var TOGOis = ($(this).closest('section').attr('view') == "Finaliza" ? true : false);

                       var ATENDENTE = [{ 
                                        LOJA: getLojaIn($(this).attr('data-loja')),
                                        TOGO: TOGOis
                                      }]

                          __SETLocalStorage('ATENDENTE', ATENDENTE);
                          
                          listPgto(__GETLocalStorage('PEDIDO'));

                        
                      $('.redux').removeClass('active');
                      $(this).toggleClass('active');
                      $('[list="lojas-togo"] .redux').find('img').attr('src',"App/views/public/images/logo-black.png");  
                      if($(this).hasClass('active')){

                              $(this).find('img').attr('src',"App/views/public/images/logo.png");
                         }
              }


        })

 


}


     

function selectFistItem(){

    $(document).on('click','.size-product .half-sub',function(){

              if(!__GETLocalStorage('CTRL_PROMO')){
              
                   $(this).removeClass('half-sub');
                   $('#warning').removeClass('hide');
                    setHalfAutoCar();

                 }
      
    })
    
    $(document).on('click','#exit, a',function(){

              $('.half-sub').removeClass('half-sub');
        
    })

}





function validateForms(){

   


       /***
         *   @author Erick Eduardo[erick@accon.com.br]
         *   @example VALIDAÇÃO DE INPUTS CPF
         *
         **/
              $(document).on('focusout','form input[name="cpf-cnpj"]',function(){

                         var exp   = /[0-9]{11}/;
                         var valor = $(this).cleanVal();
                        
                           if(!exp.test(valor) && valor.length > 0){


                             $(this).closest('p').find('.required').html('valor inválido *').addClass('invalid-label');
                             $(this).closest('form').find('button').attr('disabled', true);
                        }else{

                              $(this).closest('p').find('.required').html('*').removeClass('invalid-label');
                              $(this).closest('form').find('button').attr('disabled', false);

                        }
              })

             $(document).on('focusin','form input[name="cpf-cnpj"], form input[type="password"], form input[type="email"]',function(){

                  $(this).closest('p').find('.required').html('*').removeClass('invalid-label');
             })

          




           /***
             *   @author Erick Eduardo[erick@accon.com.br]
             *   @example VALIDAÇÃO DE INPUTS E-MAIL
             *
             **/
              $(document).on('focusout','form input[type="email"]',function(){

                         var exp   = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/; 
                         var email = $(this).val();
                        
                           if(!exp.test(email) && email.length > 0){

                              $(this).closest('p').find('.required').html('valor inválido *').addClass('invalid-label');
                              $(this).closest('form').find('button').attr('disabled', true);
                           }else{

                              $(this).closest('p').find('.required').html('*').removeClass('invalid-label');
                              if(!$('.alert-email').is(':visible')){ $(this).closest('form').find('button').attr('disabled', false); }

                        }
              })





           /***
             *   @author Erick Eduardo[erick@accon.com.br]
             *   @example VALIDAÇÃO DE INPUTS NOMES
             *
             **/
              $(document).on('focusout','form input[name="nome"]',function(){

                          var nome = $(this).val();
                        
                           if(nome.length < 10 && nome.length > 0){

                              $(this).closest('p').find('.required').html('valor inválido *').addClass('invalid-label');
                              $(this).closest('form').find('button').attr('disabled', true);
                           }else{

                              $(this).closest('p').find('.required').html('*').removeClass('invalid-label');
                              $(this).closest('form').find('button').attr('disabled', false);

                        }
              })


           /***
             *   @author Erick Eduardo[erick@accon.com.br]
             *   @example VALIDAÇÃO DE INPUTS APELIDOS
             *
             **/
              $(document).on('focusout','form input[name="nome"], form input[name="apelido-address"]',function(){

                          var nome = $(this).val();
                        
                           if(nome.length < 4 && nome.length > 0){

                              $(this).closest('p').find('.required').html('valor inválido *').addClass('invalid-label');
                              $(this).closest('form').find('button').attr('disabled', true);
                           }else{

                              $(this).closest('p').find('.required').html('*').removeClass('invalid-label');
                              $(this).closest('form').find('button').attr('disabled', false);

                        }
              })



           /***
             *   @author Erick Eduardo[erick@accon.com.br]
             *   @example VALIDAÇÃO DE TROCO
             *
             **/
              $(document).on('keyup','input[name="valor-recebido"]',function(){

                          var valor = $(this).val();
                          var valorPedido = getTotalPedido();
                          var $alertFinaliza = $('.alert-finaliza');
                              
                              valor = valor.replace(".","");
                              valor = valor.replace(",",".");

                          var isValid = (parseFloat(valor) > valorPedido) ? true : false ;
                     
                           if(isValid){

                                  $('[list="formas-ptgo"]').find('button').attr('disabled', false);
                                  $alertFinaliza.removeClass('alert-danger')
                                  $alertFinaliza.removeClass('alert-danger').addClass('alert-warning');
                                  $alertFinaliza.html('<i class="icon flaticon-warning37"></i> Fique tranquilo, seu pedido será pago somente na entrega ou ao buscar na loja.');
                                  $('[sgl="Dinheiro"]').prop('checked', true);
                           }else{

                                 $('[list="formas-ptgo"]').find('button').attr('disabled', true);
                                 $alertFinaliza.removeClass('alert-warning')
                                 $alertFinaliza.removeClass('alert-warning').addClass('alert-danger');
                                 $alertFinaliza.html('<strong>Atenção!</strong> O Valor em dinheiro deve ser superior ao do Pedido: <strong> R$ ' + (number_format(getTotalPedido(), 2, ',', '.'))+'</strong>');
                                 $('[sgl="Dinheiro"]').prop('checked', false);


                        }
              })

  

}






function checkStatusPedido(DATA){

    var _STATUS = [];

            DATA.forEach(function(getData){

               getData.PEDIDOS.forEach(function(getPedido){

                // console.info(getPedido);

                     var __pedido = getPedido.PEDIDO;

                     //  _STATUS.push({
                     //                  _id: pedido.PED_ID,
                     //                  status: pedido.PED_STATUS
                     //              })
              })
        })

            // console.info(_STATUS);
} 


