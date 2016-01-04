    var PK = 0;
    var PKCombo = 0;
    var car = [];
    var controleFracao = false;
       
  
/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pelo gerenciamento de compras
   *
   **/

    $(function(){
  
        // INITIALIZE
        setCar();
        getAdicionais();
        calcQtdProduto();
        calcAdicioaisProduto();
        setComboBox();
        changeValorProdutos();
        setFracaoProdutos();
        removeItem();
        listProdutosFinaliza();
      })


 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   **/
     function setCar() {
         
   
           var $containerDetails = $('.product-container');
           var $productCover = $containerDetails.find('.product .cover');
      
          $(document).on('click','button[action="save"]', function(){
                    

                       getOptionsDetailsProduct('ADD_HALF');
                   var GPR = $(this).closest('li').attr('data-gpr');  
                      
                        setTimeout(function() { 

                                    $productCover.find('i.up,i.down').removeClass('hide'); 
                           
                              
                                       
                              if(controleFracao){ 
                                  
                                       $('.product-container').find('button[action="save"]').text('Pedir').attr('disabled', true);
                                       $('.products li .cover.meia.default div:last-child').css('background-image','url(App/views/public/images/produtos/default_next.jpg)');
                                       $('#morepanel').addClass('no-show');
                                       $('#warning').removeClass('hide');
                               }else{

                                       $('#warning').addClass('hide');

                               }
                                       $('[data-container="integer-display-product"] .text-center').addClass('hide');
                        }, 200);
                        
                                            setDetailsItem(parseInt(GPR));                       
                       
                        $PRODUTO = getDataProduct($containerDetails.attr('value'));

                        var _FRACAO = parseFloat($containerDetails.find(((controleFracao) ? '.size-product-callback .active' : '.size-product .active' )).closest('[data-value]').attr('data-value'));
                        var _QUANTIDADE = $('#qnt').find('big').html();
                        var _TOTAL      = $PRODUTO.PRO_PRC_VND_DELIVERY;
                        var isFirst = null;

              
                        var _UNITARIO = _TOTAL;
                        var _ID          =  $PRODUTO.PRO_ID;
                        var _GRP         =  $PRODUTO.PRO_GRUPO;
                        var _SERIAL_ADICIONAIS  = serialize(getAdicionais());
                        var _ADICIONAIS  =   getAdicionais();
                        var _SERIAL_RETIRADAS   = serialize(getRetiradas());
                        var _RETIRADAS   =   getRetiradas();
                        var _TIPO        =  $containerDetails.find('[list="tipos"] [value]').attr('value');
                        var _TAMANHO     =  $containerDetails.find('[list="tamanho-product"] [value]').attr('value');
                        var _APELIDO     =  $PRODUTO.PRO_APELIDO_ECOMMERCE;
                        var _IMAGEM      =  $containerDetails.find('[recept="img-product"]').css('background-image');
                        var _DESCRICAO   =  $PRODUTO.PRO_DESCRICAO_ECOMMERCE;
                        var _DESCRICAO_REDUZIDA  =  $PRODUTO.PRO_DESCRICAO_REDUZIDA;
                        var _ECF         =  $PRODUTO.PRO_ECF_ID;
                        var _FILA_IMPRESSAO   = $PRODUTO.PRO_FILA_IMPRESSAO;
                        var _VALOR_ADICIONAIS = ((sumAddProduct(_ADICIONAIS) * _FRACAO) * _QUANTIDADE);

               
                        if(controleFracao && _FRACAO == 0.5){

                                isFirst = 'S';
                                controleFracao = false;
                                var _IMAGEM      =  $containerDetails.find('[recept="img-product"] div:last').css('background-image');

               

                        }else if(!controleFracao && _FRACAO == 0.5){

                               isFirst = 'N';
                               controleFracao = true;
                               var _IMAGEM      =  $containerDetails.find('[recept="img-product"] div:first').css('background-image');
                      }
                                  
                        



                        var PRODUTO = {
                                        PK: ++PK,
                                        ID: _ID,
                                        GRP: _GRP,
                                        ADICIONAIS: _ADICIONAIS,
                                        SERIAL_ADD: _SERIAL_ADICIONAIS,
                                        RETIRADAS:  _RETIRADAS,
                                        SERIAL_RET:  _SERIAL_RETIRADAS,
                                        TIPO:    _TIPO,
                                        TAMANHO: _TAMANHO,
                                        FRACAO:  _FRACAO,
                                        ID_FRACAO: (_FRACAO == 0.5) ? "check" : null,
                                        APELIDO_FRACAO: null,
                                        QUANTIDADE: _QUANTIDADE, // PRODUTOS
                                        TOTAL: ((_TOTAL * _FRACAO) * _QUANTIDADE) + _VALOR_ADICIONAIS,
                                        UNITARIO: _UNITARIO,
                                        DESCRICAO: _APELIDO,
                                        DESCRICAO_ECOMMERCE: _DESCRICAO,
                                        DESCRICAO_REDUZIDA: _DESCRICAO_REDUZIDA,
                                        IMAGEM: _IMAGEM,
                                        FIRST: isFirst,
                                        ECF: _ECF,
                                        FIM:_FILA_IMPRESSAO
                                    }
                    
            
                                      var controle = true;
                                 
                                          car.forEach(function(getItem, index) {

                                           if(PRODUTO.FRACAO == 0.5 && getItem.ID_FRACAO == "check"  && getItem.FIRST == "N"){

                                                      car.splice(parseInt(index+1), 0, PRODUTO);
                                                      controle = false;
                                                } 
                                                                                
                                     })
                                    
                                         
                                          if(controle){  car.push(PRODUTO); }   

                                                
                                            __addPedido(car);
                                            listCarBadge((controleFracao) ? false : true );
                                        

              })
  }





 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example PROCESSA ITENS SELECIONADOS
   *   @return {[OBJECT]} [vETOR COM iDS]
   *
   **/
      function getAdicionais(){
        
        var RESPONSE = [];
            $('span[list="adicionais"] .ingr').each(function(index, el) {
                    
                   if($(this).hasClass('active')){
                         RESPONSE.push({   
                                        ID: $(this).attr('value'),
                                        APELIDO:  $(this).attr('apelido'),
                                        VALOR:    $(this).attr('valor') 
                                    })                    
                       }
            })
            return RESPONSE;
} 



 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example PROCESSA ITENS REMOVEIDOS DO PRODUTO
   *   @return {[OBJECT]} [vETOR COM iDS]
   *
   **/
      function getRetiradas(){
        
        var RESPONSE = [];
             $('span[list="retirados"] .ingr').each(function(index, el) {
                    
                   if($(this).hasClass('active')){
                        RESPONSE.push({   
                                        ID: $(this).attr('value'),
                                        APELIDO:  $(this).attr('apelido')
                                    })                   
                  }
            })
            return RESPONSE;
} 




 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example OBTENCAO DA QUANTIDADE DE PRODUTOS
   *   @return {[INTEGER]} 
   *
   **/
      function getQtdProduto(THIS){
        
           return  parseInt(THIS.text());
    } 




 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example CALCULO DA QUANTIDADE DE PRODUTOS
   *   @return {[INTEGER]} 
   *
   **/
      function calcQtdProduto(){
        
              $(document).on('click', '.qntcontainer button', function(event) {
                
                    var TARGET  = $(this).closest('li').find('.qntnumber');
                    var NUM     = TARGET.text();
                    var FRACAO  = $(this).closest('li').find('select[name="fracao"] option:selected').val();
                    var VALOR   = $(this).closest('li').find('strong[name="valor_produto"]').attr('value') * FRACAO;
                    
                   
                          if($(this).attr('action') == "increase"){
                                  NUM++;
                                  TARGET.text((NUM));
                          
                          }else if($(this).attr('action') == "decrease"){
                                  NUM --;
                                  TARGET.text((NUM > 0) ? NUM : 1);
                          }
                           TOTAL  = VALOR * NUM; 
                          //SETANDO VALOR DO PRODUTO
                           $(this).closest('li').find('strong[name="valor_produto"]')
                                                .attr('callback',(NUM > 0) ? (TOTAL) :  VALOR)
                                                .text((NUM > 0) ? "R$ "+number_format((TOTAL), 2, ',', '.') : "R$ "+number_format(VALOR, 2, ',', '.'));
              })
     } 



 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example CALCULO DOS VALORES OPCIONAIS
   *   @return {[INTEGER]} 
   *
   **/
      function calcAdicioaisProduto(){
        
              $(document).on('click', '.products .options.remove input', function(event) {
                    
                    var NUM =  parseInt($(this).closest('li').find('.qntnumber').text());
                    var VALOR  = parseInt($(this).closest('li').find('strong[name="valor_produto"]').attr('value'));
                    var ADICIONAL  = parseInt($(this).attr('valor'));
                    var TOTAL =  ($(this).hasClass('checked')) ? VALOR + ADICIONAL : VALOR - ADICIONAL;
            
                  //SETANDO VALOR DO PRODUTO
                   $(this).closest('li').find('strong[name="valor_produto"]')
                                        .text("R$ "+number_format((TOTAL * NUM), 2, ',', '.'))
                                        .attr('value',TOTAL);
              })
     } 




   /***
     *   @author Erick Eduardo[erickeduardo@accon.com.br]
     *   @exemple COMBOX SELECT PRODUTOS
     *
     **/
      function setComboBox(){
           $(document).on('change', '.products select[name="tipo"]', function(event) {
                var THIS  = $(this).closest('p');
                var GRUPO = $(this).find('option:selected').attr('data-grp');
                var ID    = $(this).find('option:selected').attr('data-id');
                var _html = '';
                
                        $.each(__GETLocalStorage('TAMANHOS'), function(k, TAMANHO) {
                                                
                              if((GRUPO == TAMANHO.PTA_GRUPO) && (ID == TAMANHO.PTA_TIPO)){
                                    _html += '<option data-sgl="'+TAMANHO.PTA_SIGLA+'" data-id="'+TAMANHO.PTA_ID+'" data-grp="'+TAMANHO.PTA_GRUPO+'">'+TAMANHO.PTA_SIGLA+'</option>'; 
                            }
                        })
                                    THIS.find('[name="tamanho"]').html(_html);
          })
  }



   /***
     *   @author Erick Eduardo[erickeduardo@accon.com.br]
     *   @exemple COMBOX SELECT PRODUTOS
     *
     **/
      
          function changeValorProdutos(){
                  $(document).on('change', '.products select[name]', function(event) {
                          
                          var PRODUTOS = __GETLocalStorage('PRODUTOS');
                          var THIS     = $(this).closest('li');
                          var TIPO     = THIS.find('select[name="tipo"] option:selected').attr('data-id');
                          var TAMANHO  = THIS.find('select[name="tamanho"] option:selected').attr('data-id');
                          var APELIDO  = THIS.attr('as');
                            $.each(PRODUTOS, function(index, Produto) {
                                   if((Produto.PRODUTO.PRO_TIPO == TIPO) && (Produto.PRODUTO.PRO_TAMANHO == TAMANHO) && (Produto.PRODUTO.PRO_APELIDO == APELIDO)){
                                           // ATRIBUIÇÕES MODIFICADOS
                                           THIS.attr('as',Produto.PRODUTO.PRO_APELIDO); 
                                           THIS.attr('data-id',Produto.PRODUTO.PRO_ID); 
                                           THIS.find('[name="valor_produto"]').attr('value',Produto.PRODUTO.PRO_PRC_VND_DELIVERY).html("R$ "+number_format(Produto.PRODUTO.PRO_PRC_VND_DELIVERY, 2, ',', '.'));
                                   }
                             })
                  })
    }




  /***
     *   @author Erick Eduardo[erickeduardo@accon.com.br]
     *   @exemple COMBOX SELECT PRODUTOS
     *
     **/
      
          function setFracaoProdutos(){
                  $(document).on('change', '.products select[name="fracao"]', function(event) {
                       
                          var THIS    = $(this).closest('li');
                          var FRACAO  = parseFloat($(this).val());
                          var VALOR   = THIS.find('[name="valor_produto"]').attr('callback');
                             THIS.find('[name="valor_produto"]').html("R$ "+number_format((VALOR * FRACAO), 2, ',', '.'));
                            if(FRACAO == "0.5"){
                                 
                                   THIS.find('.qntnumber').text('1');
                                   THIS.find('[name="valor_produto"]').attr('callback', THIS.find('[name="valor_produto"]').attr('value'))
                                                                      .attr('value', THIS.find('[name="valor_produto"]').attr('value') * FRACAO)
                                                                      .text("R$ "+number_format(THIS.find('[name="valor_produto"]').attr('value'), 2, ',', '.'));
              
                            }
                  })
    }




  /***
     *   @author Erick Eduardo[erickeduardo@accon.com.br]
     *   @exemple RENOVANDO A INTERFACE
     *
     **/
          function renewCar(THIS) {
              $('.products li').find('select[name="fracao"]').val(1);
              THIS.find('.qntnumber').text('1');
       
     }







  /***
     *   @author Erick Eduardo[erickeduardo@accon.com.br]
     *   @exemple LISTAGEM DOS ITENS 
     *
     **/
    function listCarBadge(hide){
                    
                     var PEDIDOS = (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];
                     var _html   = '';
                
                          if(hide){
                              $('#exit').click(); 
                              $('#cart').click(); 
                           }; 
                          
       if(PEDIDOS.length > 0){

                    $.each(PEDIDOS, function(index, PEDIDO) {

                                                         var QUANTIDADE = (PEDIDO.FRACAO == 0.5) ? '1/2' : PEDIDO.QUANTIDADE+'X';

                                                     
                                                    /***
                                                       *   @author Erick Eduardo[erickeduardo@accon.com.br]
                                                       *   @exemple LISTAGEM DOS ITENS DO COMBO
                                                       *
                                                       **/
                                                          if(PEDIDO.IS_COMBO){

                                                                
                                                                  if(PEDIDO.FIRST == "S") {

                                                                       _html += (((PEDIDO.COMBO_FIRST) ? '<span class="label-item-combo"><i class="fa fa-star"></i> '+ PEDIDO.COMBO_DESC +' </span>' : '' ))+ 
                                                                                ' <a href="javascript: void(0)" data-cmb="'+PEDIDO.IS_COMBO+'" data-pk="'+PEDIDO.PK+'" class="meio item-combo '+((PEDIDO.COMBO_FIRST) ? 'item-combo-first' : '' )+'">'+
                                                                                '<div class="cover" style="background-image:'+PEDIDO.IMAGEM+'"></div>'+
                                                                                '<i action="remove"  onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-left delete '+((!PEDIDO.COMBO_FIRST) ? 'hide' : '' )+'"></i>'+
                                                                                 ((PEDIDO.FIRST == "S") ? PEDIDO.DESCRICAO : PEDIDO.DESCRICAO_ECOMMERCE)+'<br/>'+
                                                                                '<strong>R$ '+number_format(PEDIDO.TOTAL, 2, ',', '.') +'</strong>'+
                                                                            '</a>';
                                 
                                                                  }else{

                                                                    _html += (((PEDIDO.COMBO_FIRST) ? '<span class="label-item-combo"><i class="fa fa-star"></i> '+ PEDIDO.COMBO_DESC +' </span>' : '' ))+ 
                                                                               '<a href="javascript: void(0)" data-cmb="'+PEDIDO.IS_COMBO+'" data-pk="'+PEDIDO.PK+'"  class="item-combo '+((PEDIDO.FRACAO == 0.5) ? 'meio border-badge' : '' )+'  '+((PEDIDO.COMBO_FIRST) ? 'item-combo-first' : '' )+'"  >'+
                                                                                '<div class="cover" style="background-image:'+PEDIDO.IMAGEM+'"></div>'+
                                                                                '<i  action="remove" onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-left delete '+((!PEDIDO.COMBO_FIRST) ? 'hide' : '' )+'"></i>'+
                                                                                '<br><span>'+QUANTIDADE+'</span>  '+ PEDIDO.DESCRICAO_ECOMMERCE+'<br/>'+
                                                                                '<strong>R$ '+number_format(PEDIDO.TOTAL, 2, ',', '.') +'</strong>'+
                                                                            '</a>';

                                                                  }
                                                   
                                                    /***
                                                       *   @author Erick Eduardo[erickeduardo@accon.com.br]
                                                       *   @exemple LISTAGEM DOS ITENS DO PEDIDO EXCETO COMBOS
                                                       *
                                                       **/
                                                          }else{

                                                              if(PEDIDO.FIRST == "S") {

                                                                   _html +=' <a href="javascript: void(0)" data-pk="'+PEDIDO.PK+'" class="meio">'+
                                                                            '<div class="cover" style="background-image:'+PEDIDO.IMAGEM+'"></div>'+
                                                                            '<i action="remove"  onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-left delete"></i>'+
                                                                             ((PEDIDO.FIRST == "S") ? PEDIDO.DESCRICAO : PEDIDO.DESCRICAO_ECOMMERCE)+'<br/>'+
                                                                            '<strong>R$ '+number_format(PEDIDO.TOTAL, 2, ',', '.') +'</strong>'+
                                                                        '</a>';
                             
                                                              }else{

                                                                _html +=' <a href="javascript: void(0)" data-pk="'+PEDIDO.PK+'"  '+((PEDIDO.FRACAO == 0.5) ? 'class="meio border-badge"' : '' )+'  >'+
                                                                            '<div class="cover" style="background-image:'+PEDIDO.IMAGEM+'"></div>'+
                                                                            '<i  action="remove" onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-left delete"></i>'+
                                                                            '<br><span>'+QUANTIDADE+'</span>  '+ PEDIDO.DESCRICAO_ECOMMERCE+'<br/>'+
                                                                            '<strong>R$ '+number_format(PEDIDO.TOTAL, 2, ',', '.') +'</strong>'+
                                                                        '</a>';

                                                              }
                                                          }

                                                     
                                                   })
                                                                            
                                                                        

                                              $('div[list="itens-pedido"]').html(_html);

          }
                        
                   
    }







  /***
     *   @author Erick Eduardo[erickeduardo@accon.com.br]
     *   @exemple LISTAGEM DOS ITENS NA FINALIZAÇÃO
     *
     **/
    function listProdutosFinaliza(){
                  

                  $(document).on('click', 'a[target="Finaliza"]', function(event) {
                    

                    event.preventDefault();

                    var PEDIDOS =  (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];
                    var TAXA   = getTaxaPedido();
                    var TOTAL_PEDIDO = getTotalPedido();
                    var _html  = '';
                    var _htmlhALF  = '';
                    var _htmlcombo  = '';

                          
                          if(PEDIDOS.length == 0){ $('[target="Cardapio"]').click(); };

                           $.each(PEDIDOS, function(index, PEDIDO) {


                              var $ADICIONAIS = unserialize(PEDIDO.SERIAL_ADD);
                              var $RETIRADAS  = unserialize(PEDIDO.SERIAL_RET);
                              var valorAdd = 0;
                              var $htmlAdd = '';
                              var $htmlRemove = '';
                     


                                  if($ADICIONAIS.length > 0){
                                        $ADICIONAIS.forEach(function(add) {

                                             $htmlAdd += '<cite> + R$ '+number_format(add.VALOR * PEDIDO.FRACAO, 2, ',', '.')+' ('+add.APELIDO+')</cite><br/>';
                                             valorAdd += parseFloat(add.VALOR * PEDIDO.FRACAO);
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
                                      if(PEDIDO.IS_COMBO){
                                        
                                          var _COMBO = getInCombo(PEDIDO.IS_COMBO);
                                          var QUANTIDADE = (PEDIDO.FRACAO == 0.5) ? '1/2' : PEDIDO.QUANTIDADE+'X';

                                          
                                                                   


                                              _htmlcombo +=   (((PEDIDO.COMBO_FIRST) ? '<p><span class="label-item-combo"><i class="fa fa-star"></i> '+ PEDIDO.COMBO_DESC +' </span><img style="margin-right: 25px;" src="/App/views/public/images/promocoes/'+(_COMBO.CMB_IMAGEM_ECOMMERCE)+'" width="120px" class="pull-right"></p><br><br><br><br>' : '' ))+ 
                                                                 '<p>  <span> '+ (QUANTIDADE) + '</span>   '+ ((PEDIDO.FIRST == "S") ? PEDIDO.DESCRICAO : PEDIDO.DESCRICAO_ECOMMERCE)+'  </p>'+
                                                                        '<p class="text-right">'+
                                                                        '<p class="text-right"><a data-pk="'+PEDIDO.PK+'"><i action="remove"  onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-right delete '+((!PEDIDO.COMBO_FIRST) ? 'hide' : '' )+'"></i></a></p>'+
                                                                        '</p><br>'+
                                                                        '<p class="text-right">'+
                                                                            $htmlRemove+
                                                                        '</p><br>'+
                                                                        '<p class="text-right">'+
                                                                            $htmlAdd+
                                                                        '</p>'+
                                                                        '<p class="text-right">'+
                                                                            //'<strong class="no-border">'+((PEDIDO.FRACAO == 0.5) ? 'MEIA PIZZA' : 'UND')+': R$ '+number_format(PEDIDO.UNITARIO * PEDIDO.FRACAO, 2, ',', '.')+'</strong>'+ 
                                                                            //'<strong class="no-border '+(($ADICIONAIS.length == 0) ? 'hide' : '' )+'">ACRÉSC: R$ '+number_format(valorAdd, 2, ',', '.')+'</strong>'+ 
                                                                            '<strong>R$ '+number_format((parseFloat(PEDIDO.TOTAL)), 2, ',', '.')+'</strong>'+
                                                                        '</p>';


                                

                                  /***
                                   *   @author Erick Eduardo[erickeduardo@accon.com.br]
                                   *   @exemple LISTAGEM DOS ITENS   
                                   *
                                   **/
                                    }else{

                                  
                                               
                                            var QUANTIDADE = (PEDIDO.FRACAO == 0.5) ? '1/2' : PEDIDO.QUANTIDADE+'X';

                                                   if(PEDIDO.FRACAO == 1){

                                                                      _html += '<div class="item">'+
                                                                                '<p><span>'+QUANTIDADE+'</span>   '+ PEDIDO.DESCRICAO_ECOMMERCE+'  </p>'+
                                                                                '<p class="text-right">'+
                                                                                '<p class="text-right"><a data-pk="'+PEDIDO.PK+'"><i action="remove"  onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-right delete no-cmb"></i></a></p>'+
                                                                                '</p><br>'+
                                                                                '<p class="text-right">'+
                                                                                    $htmlRemove+
                                                                                '</p><br>'+
                                                                                '<p class="text-right">'+
                                                                                    $htmlAdd+
                                                                                '</p>'+
                                                                                '<p class="text-right">'+
                                                                                    //'<strong class="no-border">'+((PEDIDO.FRACAO == 0.5) ? 'MEIA PIZZA' : 'UND')+': R$ '+number_format(PEDIDO.UNITARIO * PEDIDO.FRACAO, 2, ',', '.')+'</strong>'+ 
                                                                                    //'<strong class="no-border '+(($ADICIONAIS.length == 0) ? 'hide' : '' )+'">ACRÉSC: R$ '+number_format(valorAdd, 2, ',', '.')+'</strong>'+ 
                                                                                    '<strong>R$ '+number_format((parseFloat(PEDIDO.TOTAL)), 2, ',', '.')+'</strong>'+
                                                                                '</p>'+
                                                                            '</div>';
                                                            }
                                         
                                                      if(PEDIDO.FRACAO == 0.5){
                                                        
                                                                       _htmlhALF += '<p><span>'+QUANTIDADE+'</span>   '+ ((PEDIDO.FIRST == "S") ? PEDIDO.DESCRICAO : PEDIDO.DESCRICAO_ECOMMERCE)+'  </p>'+
                                                                                   '<p class="text-right">'+
                                                                                    '<p class="text-right"><a data-pk="'+PEDIDO.PK+'"><i action="remove"  onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-right delete no-cmb"></i></a></p>'+
                                                                                    '</p><br>'+
                                                                                    '<p class="text-right">'+
                                                                                        $htmlRemove+
                                                                                    '</p><br>'+
                                                                                    '<p class="text-right">'+
                                                                                        $htmlAdd+
                                                                                    '</p>'+
                                                                                    '<p class="text-right">'+
                                                                                        //'<strong class="no-border">'+((PEDIDO.FRACAO == 0.5) ? 'MEIA PIZZA' : 'UND')+': R$ '+number_format(PEDIDO.UNITARIO * PEDIDO.FRACAO, 2, ',', '.')+'</strong>'+ 
                                                                                        //'<strong class="no-border '+(($ADICIONAIS.length == 0) ? 'hide' : '' )+'">ACRÉSC: R$ '+number_format(valorAdd, 2, ',', '.')+'</strong>'+ 
                                                                                        '<strong>R$ '+number_format((parseFloat(PEDIDO.TOTAL)), 2, ',', '.')+'</strong>'+
                                                                                    '</p>';

                                                                if( PEDIDO.FIRST == 'S' ) { _html += '<div class="item">'+ _htmlhALF +'</div>';  _htmlhALF = ''; }
                                                       }
                                      
                                    }
                                                      

                                                      if(_htmlcombo != '' && PEDIDO.COMBO_LAST){  
                                                                                               _html += '<div class="item">'+ _htmlcombo +'</div>';
                                                                                               _htmlcombo  = ''; }                                
                                 })
                                
                                    /***
                                       *   @author Erick Eduardo[erickeduardo@accon.com.br]
                                       *   @exemple CONSUMO FRONT-END - MONTANDO HTML NA INTERFACE
                                       *
                                       **/
                                                             
                                                               _html +=' <p class="taxa-entrega"> <i class="flaticon-man459" style="font-size: 40px;"> </i><small class="valor-taxa-finaliza"><span class="noborder" style="font-size: 13px">TAXA DE ENTREGA</span> <strong>R$ '+number_format(TAXA, 2, ',', '.') +'</strong></small></p>';
                          
                            
                                            $('div[list="produtos-finaliza"]').html((_html != '') ? _html : '<center>Nenhum Item no Pedido</center>' );
                             
                                            getPedido(PEDIDOS); //LISTAGEM DE PRODUTOS
                                            listPgto(PEDIDOS);
                                            $('.valor-total-finaliza').html('R$ '+number_format(getTotalPedido(), 2, ',', '.'));
                    })

                       
         
   }








  /***
     *   @author Erick Eduardo[erickeduardo@accon.com.br]
     *   @exemple LISTAGEM DOS ITENS NA FINALIZAÇÃO, EXECUÇÃO NA INSTÂNCIA
     *
     **/
    function listProdutosFinalizacaoPedido(){
                  
                    var PEDIDOS =  (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];
                    var TAXA   = getTaxaPedido();
                    var TOTAL_PEDIDO = getTotalPedido();
                    var _html  = '';
                    var _htmlhALF  = '';
                    var _htmlcombo  = '';

                       if(PEDIDOS){


                              if(PEDIDOS.length == 0){  $('[target="Cardapio"]').click(); };

                             $.each(PEDIDOS, function(index, PEDIDO) {
                              
                                  var $ADICIONAIS = unserialize(PEDIDO.SERIAL_ADD);
                                  var $RETIRADAS  = unserialize(PEDIDO.SERIAL_RET);
                                  var valorAdd = 0;
                                  var $htmlAdd = '';
                                  var $htmlRemove = '';
                         


                                  /***
                                     *   @author Erick Eduardo[erickeduardo@accon.com.br]
                                     *   @exemple LISTAGEM DOS ITENS PERTENCENTES AO COMBOS  
                                     *
                                     **/
                                          if(PEDIDO.IS_COMBO){

                                              var _COMBO     = getInCombo(PEDIDO.IS_COMBO);
                                              var QUANTIDADE = (PEDIDO.FRACAO == 0.5) ? '1/2' : PEDIDO.QUANTIDADE+'X';


                                                  _htmlcombo +=    (((PEDIDO.COMBO_FIRST) ? '<p><span class="label-item-combo"><i class="fa fa-star"></i> '+ PEDIDO.COMBO_DESC +' </span><img  style="margin-right: 25px;"  src="/App/views/public/images/promocoes/'+(_COMBO.CMB_IMAGEM_ECOMMERCE)+'" width="120px" class="pull-right"></p><br><br><br><br>' : '' ))+ 
                                                                     '<p><span>'+QUANTIDADE+'</span>   '+ ((PEDIDO.FIRST == "S") ? PEDIDO.DESCRICAO : PEDIDO.DESCRICAO_ECOMMERCE)+'  </p>'+
                                                                          '<p class="text-right"><a data-pk="'+PEDIDO.PK+'"><i action="remove"  onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-right delete '+((!PEDIDO.COMBO_FIRST) ? 'hide' : '' )+'"></i></a></p>'+
                                                                            '<p class="text-right">'+
                                                                                $htmlRemove+
                                                                            '</p><br>'+
                                                                            '<p class="text-right">'+
                                                                                $htmlAdd+
                                                                            '</p>'+
                                                                            '<p class="text-right">'+
                                                                                //'<strong class="no-border">'+((PEDIDO.FRACAO == 0.5) ? 'MEIA PIZZA' : 'UND')+': R$ '+number_format(PEDIDO.UNITARIO * PEDIDO.FRACAO, 2, ',', '.')+'</strong>'+ 
                                                                                //'<strong class="no-border '+(($ADICIONAIS.length == 0) ? 'hide' : '' )+'">ACRÉSC: R$ '+number_format(valorAdd, 2, ',', '.')+'</strong>'+ 
                                                                                '<strong>R$ '+number_format((parseFloat(PEDIDO.TOTAL)), 2, ',', '.')+'</strong>'+
                                                                            '</p>';

                                  /***
                                     *   @author Erick Eduardo[erickeduardo@accon.com.br]
                                     *   @exemple LISTAGEM DOS ITENS   
                                     *
                                     **/
                                            }else{


                                                        if($ADICIONAIS.length > 0){
                                                              $ADICIONAIS.forEach(function(add) {

                                                                   $htmlAdd += '<cite> + R$ '+number_format(add.VALOR * PEDIDO.FRACAO, 2, ',', '.')+' ('+add.APELIDO+')</cite><br/>';
                                                                   valorAdd += parseFloat(add.VALOR * PEDIDO.FRACAO);
                                                              })
                                                          }
                                                 
                                                          if($RETIRADAS.length > 0){
                                                              $RETIRADAS.forEach(function(remove) {

                                                                   $htmlRemove += '<cite> s/ ('+remove.APELIDO+')</cite><br/>';
                                              
                                                              })
                                                          }

                                                       
                                                    var QUANTIDADE = (PEDIDO.FRACAO == 0.5) ? '1/2' : PEDIDO.QUANTIDADE+'X';

                                                           if(PEDIDO.FRACAO == 1){

                                                                              _html += '<div class="item">'+
                                                                                        '<p><span>'+QUANTIDADE+'</span>   '+ PEDIDO.DESCRICAO_ECOMMERCE+'  </p>'+
                                                                                           '<p class="text-right">'+
                                                                                          '<p class="text-right"><a data-pk="'+PEDIDO.PK+'"><i action="remove"  onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-right delete no-cmb"></i></a></p>'+
                                                                                          '</p><br>'+
                                                                                        '<p class="text-right">'+
                                                                                            $htmlRemove+
                                                                                        '</p><br>'+
                                                                                        '<p class="text-right">'+
                                                                                            $htmlAdd+
                                                                                        '</p>'+
                                                                                        '<p class="text-right">'+
                                                                                            //'<strong class="no-border">'+((PEDIDO.FRACAO == 0.5) ? 'MEIA PIZZA' : 'UND')+': R$ '+number_format(PEDIDO.UNITARIO * PEDIDO.FRACAO, 2, ',', '.')+'</strong>'+ 
                                                                                            //'<strong class="no-border '+(($ADICIONAIS.length == 0) ? 'hide' : '' )+'">ACRÉSC: R$ '+number_format(valorAdd, 2, ',', '.')+'</strong>'+ 
                                                                                            '<strong>R$ '+number_format((parseFloat(PEDIDO.TOTAL)), 2, ',', '.')+'</strong>'+
                                                                                        '</p>'+
                                                                                    '</div>';
                                                                    }
                                                 
                                                              if(PEDIDO.FRACAO == 0.5){
                                                                
                                                                               _htmlhALF += '<p><span>'+QUANTIDADE+'</span>   '+ ((PEDIDO.FIRST == "S") ? PEDIDO.DESCRICAO : PEDIDO.DESCRICAO_ECOMMERCE)+'  </p>'+
                                                                                            '<p class="text-right">'+
                                                                                            '<p class="text-right"><a data-pk="'+PEDIDO.PK+'"><i action="remove"  onClick="javascript: deleteBasketItem($(this))" class="flaticon-close47 pull-right delete no-cmb"></i></a></p>'+
                                                                                            '</p><br>'+
                                                                                            '<p class="text-right">'+
                                                                                                $htmlRemove+
                                                                                            '</p><br>'+
                                                                                            '<p class="text-right">'+
                                                                                                $htmlAdd+
                                                                                            '</p>'+
                                                                                            '<p class="text-right">'+
                                                                                                //'<strong class="no-border">'+((PEDIDO.FRACAO == 0.5) ? 'MEIA PIZZA' : 'UND')+': R$ '+number_format(PEDIDO.UNITARIO * PEDIDO.FRACAO, 2, ',', '.')+'</strong>'+ 
                                                                                                //'<strong class="no-border '+(($ADICIONAIS.length == 0) ? 'hide' : '' )+'">ACRÉSC: R$ '+number_format(valorAdd, 2, ',', '.')+'</strong>'+ 
                                                                                                '<strong>R$ '+number_format((parseFloat(PEDIDO.TOTAL)), 2, ',', '.')+'</strong>'+
                                                                                            '</p>';

                                                                        if( PEDIDO.FIRST == 'S' ) { _html += '<div class="item">'+ _htmlhALF +'</div>';  _htmlhALF = ''; }
                                                               }
                                        
                                                    }                                  
                                                                      if(_htmlcombo != '' && PEDIDO.COMBO_LAST){  
                                                                                             _html += '<div class="item">'+ _htmlcombo +'</div>';
                                                                                             _htmlcombo  = ''; }      
                                                                               
                                   })

                                
                                 /***
                                     *   @author Erick Eduardo[erickeduardo@accon.com.br]
                                     *   @exemple CONSUMO FRONT-END - MONTANDO HTML NA INTERFACE
                                     *
                                     **/
                                        if(_htmlcombo != ''){ _html += '<div class="item">'+ _htmlcombo +'</div>'; }
                                        _html +=' <p '+ ((TAXA == 0) ? 'class="hide"' : '' ) +'> <i class="flaticon-man459" style="font-size: 40px;"> </i><small class="valor-taxa-finaliza"><span class="noborder" style="font-size: 13px;">TAXA DE ENTREGA</span> <strong>R$ '+number_format(TAXA, 2, ',', '.') +'</strong></small></p>';
                                  
                              
                                       $('div[list="produtos-finaliza"]').html((_html != '') ? _html : '<center>Nenhum Item no Pedido</center>' );

                                
                                      getPedido(PEDIDOS); //LISTAGEM DE PRODUTOS
                                      listPgto(PEDIDOS);
                                      $('.valor-total-finaliza').html('R$ '+number_format(getTotalPedido(), 2, ',', '.'));

                        
                       }

                  
                       
         
   }























 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example REMOVE ITEM
   *   @return {[INTEGER]} 
   *
   **/
         function removeItem(badge) {
              
                $(document).on('click', '[action="remove"]', function(event) {

      
                  var PEDIDOS  =  (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];
                  var ID       = $(this).closest('a').attr('data-pk');
                  var REMOVE   = null;
         
                      $.each(PEDIDOS, function(index, ITEM) {
                            
                          if(ITEM.PK == ID){
                                  REMOVE = ITEM;
                          }
                     }) 

                             
                
                    if(REMOVE.IS_COMBO){

                  
                  /***
                     *   @author Erick Eduardo
                     *   @Eespecific EXCLUSÃO DE ITENS DO COMBO
                     *
                     **/
                        
                         
                              $.each(PEDIDOS, function(index, ITEM) {


                                    if(ITEM.PK == ID){
                                          
                                        __RemoveLocalStorage(ITEM.PK,'PEDIDO');
                                         getPedido(__GETLocalStorage('PEDIDO'));
                                        
                                        car = __GETLocalStorage('PEDIDO');
                                   
                                             if(car.length == 0){

                                                 $('html').click();
                                                 $('[list="itens-pedido"]').html('<h4 class="white nomargin text-center">Cesta de itens</h4><p class="empty"><small>Nenhum item selecionado</small> </p>');
                                             
                                            };

                                          if(parseInt(PEDIDOS.length)-1 == 0){

                                                localStorage.removeItem('PEDIDO');
                                                $('[target="Cardapio"]').trigger('click'); 
                                                $('.pizzametade').addClass('hide');
                                                controleFracao = false;

                                          }  
                                           listCarBadge(false);

                                    }
                              }) 


                 /***
                     *   @author Erick Eduardo
                     *   @Eespecific EXCLUSÃO DE ITENS DO COMBO
                     *
                     **/
                    
                    }else{


                                if(removeIsValid() || REMOVE.ID_FRACAO == "check" &&  __GETLocalStorage('PEDIDO')){

                                        var PEDIDOS  = __GETLocalStorage('PEDIDO');
                                        var ID       = $(this).closest('a').attr('data-pk');
                                        var ID_REMOVE  = null;
                                        
                                            $.each(PEDIDOS, function(index, ITEM) {
                                                  
                                                if(ITEM.PK == ID){

                                                          ID_REMOVE = ITEM.PK;


                                                         setFisrtHalfRemove(ITEM);

                                                        if(itHasHalf(ITEM)){ 
                                                             
                                                                  controleFracao = !controleFracao;
                                                                  $('[target="Cardapio"]').trigger('click'); 

                                                                    // VERIFICAÇÃO DE METADE DE PIZZA
                                                                       checkRemoveFirstHalf(ITEM);
                                                              }
                                                }
                                           }) 

                                         

                                        __RemoveLocalStorage(ID_REMOVE,'PEDIDO');
                                         getPedido(__GETLocalStorage('PEDIDO'));
                                        
                                        car = __GETLocalStorage('PEDIDO');
                                   



                         
                                         if(car.length == 0){

                                             $('html').click();
                                             $('[list="itens-pedido"]').html('<h4 class="white nomargin text-center">Cesta de itens</h4><p class="empty"><small>Nenhum item selecionado</small> </p>');
                                         
                                        };

                                          if(parseInt(PEDIDOS.length)-1 == 0){

                                                localStorage.removeItem('PEDIDO');
                                                $('[target="Cardapio"]').trigger('click'); 
                                                $('.pizzametade').addClass('hide');
                                                controleFracao = false;

                                          }  
                                           listCarBadge(false);

                              
                               }else{
                                        addClassErroRemove();
                                   alert('<big><i class="flaticon-warning37"></i></big>', 'Opss... Item não removido. Você deve escolher a outra metade para compor sua Pizza.');
                              }

                    }

            

              
                  /***
                     *   @author Erick Eduardo
                     *   @Eespecific Verifica se existe uma metade a ser escolhida
                     *
                     **/
                         checkControleFracao();

                   /***
                     *   @author Erick Eduardo
                     *   @Eespecific Atualiza a listagem de Produtos na Finalização.
                     *
                     **/  listProdutosFinalizacaoPedido();

                      $('.product-container').find('div[list="callback-tamanho"]').attr('list', 'tamanho-product');
                      $('.product-container').find('div[list="callback-tipo"]').attr('list', 'tipos');
                      $('.product-container').find('.size-product-callback').addClass('size-product');
                      $('.product-container').find('.size-product').removeClass('size-product-callback');
                      $('#morepanel').removeClass('no-show');

            })
                

           }








function sumAddProduct(DATA){

  var $total = 0;
  

       DATA.forEach(function(addValue) {
              
            $total += parseFloat(addValue.VALOR);
      })
         
         return $total;
}






function checkRemoveFirstHalf(ITEM){

      var PEDIDO  =  (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];

          if(ITEM.FIRST == "N" && ITEM.ID_FRACAO != "check"){

                var FIRST = ITEM;
                var SECOND = null;
          
           if(PEDIDO.length > 0){

              PEDIDO.forEach(function(getItem) {

                      if(getItem.ID == ITEM.ID_FRACAO){

                          SECOND = getItem;

                      }
              })


                               
                     SECOND.PK = FIRST.PK;
                     SECOND.ID_FRACAO = "check";
                     SECOND.FIRST     = "N";
                
                    __SyncLocalStorage(SECOND,'PEDIDO');
           
               setTimeout(function() {

                     listCarBadge(true);

                   }, 100); 

        }
    }
}





 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   *   @example VERIFICAÇÃO SE O ITEM ESCOLHIDO PARA EXCLUSÃO, POSSUI UM METADE.
   *   @return {[BOOL]} 
   *
   **/
        function itHasHalf(ITEM){

              var PEDIDO  =  (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];
              var RESPONSE = false;
                  
                   if(PEDIDO.length > 0){

                        PEDIDO.forEach(function(getItem) {

                              if(getItem.ID == ITEM.ID_FRACAO){

                                  RESPONSE = true;

                              }
                        })
                  }


                  return RESPONSE;


        }






      function setFisrtHalfRemove(ITEM){

               var PEDIDO  =  (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];
               var SECOND  = null;
    
      

                     PEDIDO.forEach(function(getItem) {

                            if(getItem.ID == ITEM.ID_FRACAO){

                                SECOND = getItem;

                            }
                    })

                        if(SECOND != null){
                  
                                SECOND.ID_FRACAO = "check";
                                __SyncLocalStorage(SECOND,'PEDIDO');
                         }
                             
        }



        function removeIsValid(){

                          var PEDIDO  =  (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];
                          var i = 0;

                             PEDIDO.forEach(function(getItem) {

                                    if(getItem.FRACAO == 0.5){

                                        i++;
                                    }
                            })


                           return ((i == 1) || i % 2 == 0) ? true : false;

        }



          function addClassErroRemove(){

                          var PEDIDO  = (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];
                          var PK = 0;

                            PEDIDO.forEach(function(getItem) {

                                    if(getItem.ID_FRACAO == "check"){

                                        PK = getItem.PK;
                                    }
                            })

                             $('[list="itens-pedido"] a[data-pk="'+PK+'"]').addClass('error-remove'); 
                             $('[list="itens-pedido"] a[data-pk="'+PK+'"]').removeAttr('action'); 

        }   




      function checkControleFracao(){

    
                          var PEDIDO  =  (__GETLocalStorage('PEDIDO')) ? __GETLocalStorage('PEDIDO') : [];
                          var i = 0;

                             PEDIDO.forEach(function(getItem) {

                                    if(getItem.FRACAO == 0.5){

                                        i++;
                                    }
                            })


                           if((i == 0) || i % 2 == 0){

                                 $('.pizzametade').addClass('hide');
                                 controleFracao = false;
                           
                           }else{

                                 $('.pizzametade').removeClass('hide');
                                 controleFracao = true;
                           }





        }








 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   **/
     function setHalfAutoCar() {
         
   
           var $containerDetails = $('.product-container');
           var $productCover = $containerDetails.find('.product .cover');
      
      
                        getOptionsDetailsProduct('ADD_HALF');
                    var GPR = $(this).closest('li').attr('data-gpr');
                      
                        setTimeout(function() { 

                                    $productCover.find('i.up,i.down').removeClass('hide'); 
                              
                                       
                              if(controleFracao){ 
                                  
                                       $('.product-container').find('button[action="save"]').text('Pedir').attr('disabled', true);
                                       $('.products li .cover.meia.default div:last-child').css('background-image','url(App/views/public/images/produtos/default_next.jpg)');
                                       $('#morepanel').addClass('no-show');
                                       $('#warning').removeClass('hide');

                               }

                        }, 200);
                        

                            setDetailsItem(parseInt(GPR)); 

                        $PRODUTO = getDataProduct($containerDetails.attr('value'));

                        var _FRACAO = parseFloat($containerDetails.find(((controleFracao) ? '.size-product-callback .active' : '.size-product .active' )).closest('[data-value]').attr('data-value'));
                        var _QUANTIDADE = $('#qnt').find('big').html();
                        var _TOTAL      = $PRODUTO.PRO_PRC_VND_DELIVERY;
                        var isFirst = null;

              
                        var _UNITARIO = _TOTAL;
                        var _ID          =  $PRODUTO.PRO_ID;
                        var _GRP         =  $PRODUTO.PRO_GRUPO;
                        var _SERIAL_ADICIONAIS  = serialize(getAdicionais());
                        var _ADICIONAIS  =   getAdicionais();
                        var _SERIAL_RETIRADAS   = serialize(getRetiradas());
                        var _RETIRADAS   =   getRetiradas();
                        var _TIPO        =  $containerDetails.find('[list="tipos"] [value]').attr('value');
                        var _TAMANHO     =  $containerDetails.find('[list="tamanho-product"] [value]').attr('value');
                        var _APELIDO     =  $PRODUTO.PRO_APELIDO_ECOMMERCE;
                        var _IMAGEM      =  $containerDetails.find('[recept="img-product"]').css('background-image');
                        var _DESCRICAO   =  $PRODUTO.PRO_DESCRICAO_ECOMMERCE;
                        var _DESCRICAO_REDUZIDA  =  $PRODUTO.PRO_DESCRICAO_REDUZIDA;
                        var _ECF         =  $PRODUTO.PRO_ECF_ID;
                        var _FILA_IMPRESSAO   = $PRODUTO.PRO_FILA_IMPRESSAO;
                        var _VALOR_ADICIONAIS = ((sumAddProduct(_ADICIONAIS) * _FRACAO) * _QUANTIDADE);

               
                        if(controleFracao && _FRACAO == 0.5){

                                isFirst = 'S';
                                controleFracao = false;
                                var _IMAGEM      =  $containerDetails.find('[recept="img-product"] div:last').css('background-image');

               

                        }else if(!controleFracao && _FRACAO == 0.5){

                               isFirst = 'N';
                               controleFracao = true;
                               var _IMAGEM      =  $containerDetails.find('[recept="img-product"] div:first').css('background-image');
                      }
                                  
                        



                        var PRODUTO = {
                                        PK: ++PK,
                                        ID: _ID,
                                        GRP: _GRP,
                                        ADICIONAIS: _ADICIONAIS,
                                        SERIAL_ADD: _SERIAL_ADICIONAIS,
                                        RETIRADAS:  _RETIRADAS,
                                        SERIAL_RET:  _SERIAL_RETIRADAS,
                                        TIPO:    _TIPO,
                                        TAMANHO: _TAMANHO,
                                        FRACAO:  _FRACAO,
                                        ID_FRACAO: (_FRACAO == 0.5) ? "check" : null,
                                        APELIDO_FRACAO: null,
                                        QUANTIDADE: _QUANTIDADE, // PRODUTOS
                                        TOTAL: ((_TOTAL * _FRACAO) * _QUANTIDADE) + _VALOR_ADICIONAIS,
                                        UNITARIO: _UNITARIO,
                                        DESCRICAO: _APELIDO,
                                        DESCRICAO_ECOMMERCE: _DESCRICAO,
                                        DESCRICAO_REDUZIDA: _DESCRICAO_REDUZIDA,
                                        IMAGEM: _IMAGEM,
                                        FIRST: isFirst,
                                        ECF: _ECF,
                                        FIM:_FILA_IMPRESSAO
                                    }
                    
            
                                      var controle = true;
                                 
                                          car.forEach(function(getItem, index) {

                                           if(PRODUTO.FRACAO == 0.5 && getItem.ID_FRACAO == "check"  && getItem.FIRST == "N"){

                                                      car.splice(parseInt(index+1), 0, PRODUTO);
                                                      controle = false;
                                                } 
                                                                                
                                     })
                                    
                                         
                                          if(controle){  car.push(PRODUTO); }   

                                                
                                            __addPedido(car);
                                            listCarBadge((controleFracao) ? false : true );
          
  }



        