
/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple Controlador Front-End responsável pelo gerenciamento de taxas de Produtos
   *
   **/

    $(function(){
	
      	// INITIALIZE
   
      })





  
/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @exemple Controlador Front-End responsável pelo seleção de taxas
   *
   **/
		function getTaxa(LOJAS){
		     
		        $.ajax({
		            
		            url: __GETLocalStorage('CONFIG').API.SQL,
		            type: 'GET',
		            data: {
		                AJAX: true,
		                SERVICE: 'TAXA',
		                METHOD: 'GET',
		                OPERATION: 'ALL',
		                DATA: LOJAS},
		          })
		          .done(function(){})
		          .fail(function(){})
		          .always(function(response){
		          var DATA = JSON.parse(response);

		                  __SETLocalStorage('TAXAS', DATA);
		         
		          })
		}




