  
/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pelo gerenciamento de formas de pagamentos
   *
   **/

    $(function(){
  
        // INITIALIZE
   
      })






function getPgto(LOJAS){
     
        $.ajax({
            
            url: __GETLocalStorage('CONFIG').API.SQL,
            type: 'GET',
            data: {
                AJAX: true,
                SERVICE: 'FORMA_PAGAMENTO',
                METHOD: 'GET',
                OPERATION: 'ALL',
                DATA: LOJAS},
          })
          .done(function(){})
          .fail(function(){})
          .always(function(response){
          var DATA = JSON.parse(response);

                  __SETLocalStorage('FRM', DATA);
          })
}




function listPgto(DATA){
      

            var FRM       = __GETLocalStorage('FRM');
            var ATENDENTE = __GETLocalStorage('ATENDENTE');
            var CLIENTE   = __GETLocalStorage('ACCESS');
            var GRUPOS,
                PGTOS,
                LOJA_ATENDENTE = null;
            var html = '';
            var formCartao = '<div>'+
                                '<p><input type="text" name="name" placeholder="Número no cartão"/></p>'+
                                '<p><input type="text" name="name" placeholder="Nome no cartão"/></p>'+
                                '<p><input type="text" size="15" name="name" placeholder="CVV"/></p>'+
                                '<p><input type="date" size="15" name="name" placeholder="Data de vencimento"/> <input type="date" size="15" name="name" placeholder="Data de vencimento"/></p>'+
                            '</div>';

  
            if(ATENDENTE && DATA && CLIENTE){
            
                        $.each(ATENDENTE, function(index, getLOJA) {

                               LOJA_ATENDENTE = getLOJA.LOJA.REST_ID;
                        })
                        
         
                       
                        $.each(FRM, function(loja, getFORM) {
                                      
                                     if(LOJA_ATENDENTE == loja){
                                        

                                          GRUPOS = getFORM.GPRS;
                                          PGTOS  = getFORM.PGTO; 
                                     }
                        })


                       $.each(GRUPOS, function(index, grupo) {
                              
                                var htmlPgto = '';
                                var inputMoney = '';
                     
                   
                              
                                $.each(PGTOS, function(index, pgto) {
                                    
                             
                                    
                                      if(grupo.FTI_ID == pgto.FPG_FTI_ID){

                                             if(grupo.FTI_ID == 0){

                                                                inputMoney += '<li><input name="valor-recebido" type="text" mask="MONEY" placeholder="Troco para?"></li>';
                                                      }     

                                              

                                            htmlPgto += '<li>'+
                                                          '<label><img src="App/views/public/images/checkout/'+ pgto.FPG_IMG_ECOMMERCE +'"/><br/>'+
                                                          '<input required type="radio" sgl="'+ pgto.FPG_SIGLA +'"  value="'+ pgto.FPG_ID +'" as="'+ pgto.FPG_DESCRICAO +'" name="pagamento"/><br/>'+ pgto.FPG_DESCRICAO +'</label>'+ inputMoney
                                                      '</li>';
                                      }
                                })


                                      if(htmlPgto != ''){

                                                 html += ' <ul class="cards clearfix" data-pgto="'+grupo.FTI_ID+'">'+ 
                                                                  '<h5>'+ grupo.FTI_DESCRICAO +'</h5>'+ htmlPgto +
                                                          '</ul>';      
                                                 
                                                         
                                        }
                           })

                                              



                                        html += '<h3><i class="icon flaticon-new103"></i> Nota fiscal nominal? <input name="check-cpf-nota-nominal" type="checkbox">SIM</span> </h3>'+
                                                    '<p><div>'+
                                                        '<input class="opacityinput" name="cpf-nota-nominal" disabled="disabled"  mask="CPF-CNPJ"  type="text" placeholder="CPF ou CNPJ" value="'+(CLIENTE.CLI_CPF_CGC)+'"/>'+
                                                    '</div></p>'+
                                                   '<div class="alert alert-warning" role="alert">'+
                                                        '<i class="icon flaticon-clock100"></i> <span data-recept="time-production"></span>'+
                                                    '</div>'+
                                                 '<p><br><br></p>'+
                                                 '<p class="text-right"><a href="pedidos.php" action="finaliza-pedido"><button type="button"><i class="flaticon-locked58"></i> Finalizar pedido</button></a></p>';
                   

                       
                       $('form[list="formas-ptgo"]').html(html);

           }
} 





   /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @exemple GET FORMA DE PAGAMENTO ID
     *
     **/
         function getInPgto(LOJA){
      
              var FORMAS = __GETLocalStorage('FRM');
              var ATENDENTE =  __GETLocalStorage('ATENDENTE');
              var RESPONSE = null;


                  $.each(FORMAS, function(loja, getFormas) {
                          
                          if(LOJA == loja){

                                RESPONSE = getFormas.PGTO;
                          }
                  })

                      return RESPONSE;
     }  




   /***
     *   @author Erick Eduardo[erick@accon.com.br]
     *   @exemple GET FORMA DE PAGAMENTO ID /LOJA
     *
     **/
         function getInPgtoLoja(ID, FORMAS){
      
          var RESPONSE = null;
  
              $.each(FORMAS, function(loja, getFormas) {
                      
                      if(ID == getFormas.FPG_ID){

                            RESPONSE = getFormas;
                      }
              })
                  return RESPONSE;
     }  
