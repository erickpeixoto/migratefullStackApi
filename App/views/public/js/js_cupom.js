	/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple
   *
   **/


   $(function(){
				
				getCupons();
				localStorage.removeItem('VOUCHER');
			
	})




   function getCupons(){


   			$(document).on('submit', 'form[action="voucher"]', function(event) {
   				event.preventDefault();


		   				 $.ajax({
					          url: __GETLocalStorage('CONFIG').API.SQL,
					          type: 'GET',
					          data: {
					            
					              AJAX: true,
					              SERVICE: 'CUPOM',
					              METHOD: 'GET',
					              OPERATION: 'ONE',
					              CODE: $('[name="voucher"]').val()
					            },
					        })
					        .done(function(){})
					        .fail(function(){})
					        .always(function(response){

					        		 listDataCupom($.parseJSON(response));
					        		 __SETLocalStorage('VOUCHER', $.parseJSON(response));
			                  })
   			});
			 
   }




function listDataCupom(CUPOM){


	var 
		  $boxCupom = $('[data-box="cupom"]')
		, $boxValidaCupom = $('#cupom');


		 if(CUPOM){

		     		$boxCupom.removeClass('hide');
		     		$boxValidaCupom.addClass('hide');
		     		_CUPOM  = CUPOM[0];
		     		_PEDIDO = getTotalPedido();
		     	
					$boxCupom.find('[data-value="desconto-cupom"]').html( number_format(parseFloat(_CUPOM.VALOR_DESCONTO),2,',','.'));
					$boxCupom.find('[data-value="codigo-cupom"]').html(_CUPOM.CODIGO);
					$('.valor-total-finaliza').html('R$ '+number_format((getTotalPedido()-parseFloat(_CUPOM.VALOR_DESCONTO)), 2, ',', '.'));

		     }else{
    			 	alert('<big><i class="fa fa-hand-paper-o"></i></big>', 'Opss... O código fornecido não é valido.');
    			  }
}






function clearCupom(){


	 var 
		  $boxCupom = $('[data-box="cupom"]')
		, $boxValidaCupom = $('#cupom');

				$boxCupom.addClass('hide');
	     		$boxValidaCupom.removeClass('hide');
	     		$('[name="voucher"]').val('');
	     		localStorage.removeItem('VOUCHER');
		     		

}


