
	/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple
   *
   **/


   $(function(){

		// INITIALIZE
		getProduto();
		setSearchProdutos();
		getDetailsProduct();
		getTamanhoProduct();
		setStep();
		changeHtmlDisplay();

	})



 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple
   *
   **/
   function getProduto() {

   		 $.getJSON('config-app.json', function(CONFIG) {
              
					   	$.ajax({

					   		url: CONFIG.API.SQL,
					   		type: 'GET',
					   		data: {
					   			AJAX: true,
					   			SERVICE: 'PRODUTO',
					   			METHOD: 'GET',
					   			OPERATION: 'ALL'},
					   		})
					   	.done(function(){})
					   	.fail(function(){})
					   	.always(function(response){
					   		var DATA = JSON.parse(response);
					   		__SETLocalStorage('PRODUTOS', DATA.PRODUTOS);
					   		__SETLocalStorage('GRUPOS', DATA.GRUPOS);
					   		__SETLocalStorage('TIPOS', DATA.TIPOS);
					   		__SETLocalStorage('TAMANHOS', DATA.TAMANHOS);
					   		listProduto();
					   		listCategory(DATA.GRUPOS);
					   		setTimeout(function() {settingsPedido()}, 800); 
					   		searchProdutos(parseObjectSearch(DATA.PRODUTOS));
							getCombos(__GETLocalStorage('LOJA'));
						

					   	});
   	  })
   }




/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple
   *
   **/
   function listProduto(SEARCH){

		   
		   	var 
			   		 GRUPOS   = __GETLocalStorage('GRUPOS')
			   	, 	 TIPOS    = __GETLocalStorage('TIPOS')
			   	, 	_htmlGrupos    = ''
			   	, 	_htmlProdutos  = ''
			   	, 	_htmlOpcionais = ''
			   	, 	_htmlRetiradas = ''
			   	, 	_htmlTipos = '';


  

				 // ESTRUTURA DE REPETIÇÃO
				 $.each(GRUPOS, function(index, getGrupo) {
								 // ESTRUTURA DE REPETIÇÃO
								 $.each(((SEARCH) ? SEARCH : getListProdutos()), function(index, getProduto) {

								 	getProduto   = getProduto['PRODUTO'];

								 	if(getGrupo.PGR_ID == getProduto['PRO_GRUPO']){

								 		var image = getProduto['PRO_IMAGEM_ECOMMERCE'];


								 		_htmlProdutos +=  '<li  class="product" as="' +getProduto['PRO_APELIDO'] +'" data-id="'+getProduto['PRO_ID']+'" data-gpr="'+getProduto['PRO_GRUPO']+'" data-ecf="'+getProduto['PRO_ECF_ID']+'"  data-FIM="'+getProduto['PRO_FILA_IMPRESSAO']+'">'+
														 		'<div action="details-product" class="cover pointer" style="background-image: url(App/views/public/images/produtos/'+image+')">'+
														 		'<span role="flags-prod"></span>'+
														 		'<div>'+
														 		'<p>Um hambúrguer enorme, 3 deliciosas fatias de queijo, tomate, alface crocante, cebola e molho especial. Tudo isso com um acompanhamento e uma bebida por um preço especial.</p>'+
														 		'</div>'+
														 		'</div>'+
														 		'<h2>R$ '+number_format(getProduto['PRO_PRC_VND_DELIVERY'],2,',','.')+
														 		' <span class="badge pull-right" action="details-product" class="openoptions add">PEDIR <i class="exit flaticon-shopping232"></i></span></h2>'+
														 		'<h4> '+getProduto['PRO_APELIDO_ECOMMERCE']+'  </h4>'+
													 		'</li>';

						  		} // CASE GRUPO

						 	}) //LIST PRODUTOS
	

	if(_htmlProdutos != ""){

		_htmlGrupos += '<h1 class="groupname">  <span>'+getGrupo.PGR_GRUPO+'</span><hr/></h1>'+
		'<ul class="products"  grp="'+getGrupo.PGR_ID+'">'+_htmlProdutos+'</ul>';
		_htmlProdutos  = '';
	}

				  	}) // LIST GRUPOS

	    $('[list="Produtos"]').animate({opacity: 0}, 200, function() {
		$('[list="Produtos"]').html(_htmlGrupos);
		$('[list="Produtos"]').animate({opacity: 1},50);
					     					
					     					// ATRIBUIÇÕES DE ITENS ESCOLHIDOS
					     					setItensCheck(__GETLocalStorage('PEDIDO'));
					     				});
	} // END FUNCTION
	





	 /***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @exemple GET GRUPO
	   *
	   **/

	   function getGrupoProduto(VALUE){
	   	var RESPONSE = null;

	   	$.each(__GETLocalStorage('GRUPOS'), function(index, getGrupo) {

	   		if (getGrupo.PGR_ID == VALUE) {
	   			RESPONSE = getGrupo.PGR_GRUPO;
	   		}
	   	})
	   	return RESPONSE;
	   }



	 /***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @exemple GET LIST PRODUTOS
	   *   @exemple ABSTRAÇÃO REALIZADO PELO ATRIBUTO PRO_APELIDO
	   *
	   **/

	   function getListProdutos(SEARCH){
	   	var PRODUTOS = (SEARCH) ? SEARCH :__GETLocalStorage('PRODUTOS');
	   	var PRODUTOS_LIST  = [];

	   	for (var i = 0; i < PRODUTOS.length; i++) {

	   		if(i > 0){
	   			if(PRODUTOS[i].PRODUTO.PRO_APELIDO_ECOMMERCE != PRODUTOS[(i-1)].PRODUTO.PRO_APELIDO_ECOMMERCE){
	   				PRODUTOS_LIST.push(PRODUTOS[i]);
	   			}
	   		}else{
	   			PRODUTOS_LIST.push(PRODUTOS[i]);
	   		}				
	   	}
	   	return PRODUTOS_LIST;
	   }



	 /***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @exemple GET PRODUTO ID
	   *
	   **/
	   function getInProduto(ID){

		   	var PRODUTOS = __GETLocalStorage('PRODUTOS');
		   	
		   	if(PRODUTOS){
			   	for (var i = 0; i < PRODUTOS.length; i++) {

			   		if(PRODUTOS[i].PRODUTO.PRO_ID == ID){
			   				   		
			   			return PRODUTOS[i];	
			   		}
			   	}
		   	}

	   }	



	 /***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @exemple CATEGORIAS DE PRODUTOS
	   *
	   **/
	   function listCategory(GRUPOS){
	   	var _html = '';

	   	$.each(GRUPOS, function(index, category) {

	   		_html += '<option style="text-transform: capitalize">'+category.PGR_GRUPO+'</option>';
	   	})
	   	$('[name="categorias-produto"]').html(_html);
	   	$('[name="tipo"] option').each(function(index, el) {
	   		$(this).trigger('change');
	   	})
	   }



	 /***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @exemple CATEGORIAS DE PRODUTOS
	   *
	   **/
	   function searchProdutos(PRODUTOS){
	   	$('#search').autocomplete({
	   		source: PRODUTOS,
	   		response: function(event, ui) {
	   			var RESPONSE = parseListSearch(ui.content);
	   			listProduto(getListProdutos(RESPONSE));

	   		}
	   	})    
	   }



	 /***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @exemple CONVERSÃO PARA FORMATO DE OBJETO DE PESQUISA
	   *
	   **/
	   function parseListSearch(PRODUTOS){

	   	var RESPONSE = new Array();

	   	$.each(PRODUTOS, function(index, getProduto) {
	   		var PRODUTO = getProduto.obj;

	   		RESPONSE.push(PRODUTO);
	   	})
	   	return RESPONSE;	
	   }



	 /***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @exemple CONVERSÃO PARA FORMATO DE OBJETO DE PESQUISA
	   *
	   **/
	   function parseObjectSearch(PRODUTOS){

	   	var RESPONSE = new Array();

	   	$.each(PRODUTOS, function(index, getProduto) {
	   		var PRODUTO = getProduto.PRODUTO;
	   		var resp = {
	   			'label': PRODUTO.PRO_APELIDO,
	   			'obj': getProduto
	   		}
	   		RESPONSE.push(resp);
	   	})
	   	return RESPONSE;	
	   }



  /***
	*   @author Erick Eduardo[erick@accon.com.br]
	*   @exemple Checagem de itens pertencentes ao pedido
	*
	**/


	function setItensCheck(PEDIDO){
		if(PEDIDO != null){
			$('article[list="Produtos"] li').each(function(index, li) {
				
				var THIS  = $(this);
				var ID_LI = $(this).attr('as');

				$.each(PEDIDO, function(index, getPedido) {
					if(ID_LI == getPedido.DESCRICAO){
						for (var i = 0; i < getPedido.QUANTIDADE; i++) {
							var _htmlIcon = (parseInt(getPedido.FRACAO) == 1) ? '<i class="flaticon-round51"></i>' : '<i class="flaticon-timelapse"></i>';

							THIS.find('[role="flags-prod"]').append(_htmlIcon);
							THIS.addClass('active');
						}
					}
				})
			})
		}
	}


	
/***
*   @author Erick Eduardo[erick@accon.com.br]
*   @exemple Pesquisa de Produtos
*
**/
function setSearchProdutos(){
	$('#search').keyup(function(event) {
	
		if($(this).val() == " " || $(this).val() == ""){
			listProduto();
			setTimeout(function() {settingsPedido()}, 800); 
		}
	})
}







/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple OPTIONS
   *
   **/
   function getOptionsProduct(ARGUMENT){

   		
   	var _RESPONSE = null;
   	var _htmlOpcionais = '';
   	var _htmlRetiradas = '';

   	$.each(__GETLocalStorage('PRODUTOS'), function(index, getProduto) {


   		getOPCIONAIS = getProduto['OPCIONAIS'];
   		getRETIRADAS = getProduto['RETIRADAS'];
   		getProduto   = getProduto['PRODUTO'];


   		if (getProduto.PRO_ID == ARGUMENT) {


											/***
											   *   @author Erick Eduardo[erick@accon.com.br]
											   *   @exemple MONTAGEM DOS INGREDIENTES OPCIONAIS
											   **/
											   $.each(getOPCIONAIS, function(i, OPCIONAIS) {

											   	_APELIDO = OPCIONAIS['PTO_APELIDO_ECOMMERCE'];		
											   	_htmlOpcionais	+= '<span class="ingr"  value="'+OPCIONAIS['PTO_ID']+'" apelido="'+OPCIONAIS['PTO_APELIDO_ECOMMERCE']+'" valor="'+OPCIONAIS['PTO_VALOR_VENDA']+'">'+(_APELIDO.substr(0,9))+' <strong>R$ '+number_format(OPCIONAIS['PTO_VALOR_VENDA'],2,'.',',')+'</strong></span>';


											   })
									   		/***
											   *   @author Erick Eduardo[erick@accon.com.br]
											   *   @exemple MONTAGEM DOS INGREDIENTES DE RETIRADAS
											   **/
											   $.each(getRETIRADAS, function(k, RETIRAR) {

											   	_RETIRADAS = RETIRAR['PRE_APELIDO'];	

											   	_htmlRetiradas	+= '<span class="ingr" value="'+RETIRAR['PRE_ID']+'" apelido="'+RETIRAR['PRE_APELIDO']+'" valor="'+RETIRAR['PRE_VALOR_VENDA']+'">'+(_RETIRADAS.substr(0,20))+'</span>';
											   })


											   _RESPONSE =  {
											   	PRODUTO: getProduto,
											   	ADICIONAIS: _htmlOpcionais,
											   	RETIRADAS:  _htmlRetiradas
											   }
											}	

					 	}) //LIST PRODUTOS

	return _RESPONSE;

}










/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple OPTIONS
   *
   **/
   function getTiposProduct(ARGUMENT){



   	var TAMANHOS  = __GETLocalStorage('TAMANHOS');
   	var TIPOS     = __GETLocalStorage('TIPOS'); 
   	var $containerTtipos = $('#product div[list="tipos"]');
    var $containerDetails = $('.product-container');
   	var _APELIDO   = $containerDetails.attr('as');
   	var _htmlTipos = '';

 

					/***
					   *   @author Erick Eduardo[erick@accon.com.br]
					   *   @exemple MONTAGEM DOS TIPOS DE PIZZA
					   **/
					   $.each(TIPOS, function(i, getTipo) {

							   	
							   	if(getTipo.PTI_PGR_ID == ARGUMENT){


							   	//se exitir o tipo na base de produtos, where pro_apelido
							   		if(checkInProduct({
							   								ACTION: "TIPO",
							   								APELIDO: _APELIDO,
							   								ID: getTipo.PTI_ID	
							   								})){


								   				_htmlTipos	+= '<div class="col-xs-4" value="'+getTipo.PTI_ID+'" isDefault='+getTipo.PTI_ECOMMERCE_DEFAULT+'>'+
												   			'<div class="col type '+((getTipo.PTI_ECOMMERCE_DEFAULT == "S") ? 'active' : '')+'" style="background-image: url(App/views/public/images/'+getTipo.PTI_ECOMMERCE_IMG+')">'+
												   			'<input type="checkbox"/>'+
												   			'</div>'+ 
												   			'<small>'+getTipo.PTI_TIPO+'</small>'+
												   		'</div>';


							   		}

							   	
							   	}
					   })

					   $containerTtipos.html(_htmlTipos);

					}







/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple GET TAMANHO
   *
   **/
   function getTamanhoProduct(){


					/***
					   *   @author Erick Eduardo[erick@accon.com.br]
					   *   @exemple MONTAGEM DOS TAMANHO DE PIZZA
					   **/



					   $(document).on('click', 'div[list="tipos"] [value]', function(event) {

					   			if(!__GETLocalStorage('CTRL_PROMO')){
										
											   	var TAMANHOS  		   = __GETLocalStorage('TAMANHOS');
											   	var $containerTtamanho = $('#product div[list="tamanho-product"]');
											   	var _htmlTamanhos 	   = '';
											   	var $containerDetails  = $('.product-container');
						   						var _APELIDO   = $containerDetails.attr('as');
											   	var _argument  = $(this).attr('value');

											   	
													   	$.each(TAMANHOS, function(i, getTamanho) {
													   		

													   		if(getTamanho.PTA_TIPO == _argument){

														 		//se exitir o tipo na base de produtos, where pro_apelido

														   		if(checkInProduct({
												   					
												   								ACTION: "TAMANHO",
												   								APELIDO: _APELIDO,
												   								ID: getTamanho.PTA_ID	
												   							
												   									})){
														   									if(getTamanho.PTA_SIGLA == "GRD"){

																   									_htmlTamanhos	+= '<div class="col-xs-4" value="'+getTamanho.PTA_ID+'"  isDefault="'+(getTamanho.PTA_ECOMMERCE_DEFAULT)+'">'+
																						   			'<small>'+getTamanho.PTA_TAMANHO+'</small>'+
																						   			'<div class="col type '+((getTamanho.PTA_ECOMMERCE_DEFAULT == "S" || ($('#product div[list="tamanho-product"]').find('div[value].active').size() == 0)) ? 'active' : '')+'" style="background-image: url(App/views/public/images/'+getTamanho.PTA_ECOMMERCE_IMG+')">'+
																						   			'<input type="checkbox"/>'+
																						   			'</div>'+ 
																						   			'<big>'+((getTamanho.PTA_ECOMMERCE_FATIAS) ? getTamanho.PTA_ECOMMERCE_FATIAS : '')+'</big>'+
																						   			'</div>';
														   									}else{

														   											_htmlTamanhos	+= '<div class="col-xs-4" value="'+getTamanho.PTA_ID+'"  isDefault="'+(getTamanho.PTA_ECOMMERCE_DEFAULT)+'">'+
																						   			'<small>'+getTamanho.PTA_TAMANHO+'</small>'+
																						   			'<div class="col type '+((getTamanho.PTA_ECOMMERCE_DEFAULT == "S" || ($('#product div[list="tamanho-product"]').find('div[value].active').size() == 0)) ? 'active' : '')+'" style="background-image: url(App/views/public/images/'+getTamanho.PTA_ECOMMERCE_IMG+')">'+
																						   			'<input type="checkbox"/>'+
																						   			'</div>'+ 
																						   			'<big>'+((getTamanho.PTA_ECOMMERCE_FATIAS) ? getTamanho.PTA_ECOMMERCE_FATIAS : '')+'</big>'+
																						   			'</div>';
														   									}	

													   							}
													   		}
													   	})

											   	$containerTtamanho.html(_htmlTamanhos);
								}			   	
					   });



}

				   			







/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple GET TAMANHO
   *
   **/
   function getFracaoProduct(ARGUMENT){

   		

					/***
					   *   @author Erick Eduardo[erick@accon.com.br]
					   *   @exemple MONTAGEM DOS TAMANHO DE PIZZA
					   **/
							var _PRODUTOS  = __GETLocalStorage('PRODUTOS');
							var checkSize = false;
			
							   $.each(_PRODUTOS, function(i, getProduto) {
							
										getProduto = getProduto.PRODUTO;


											if(getProduto.PRO_ID == ARGUMENT){

													
														if(getProduto.PRO_MENOR_FRACAO == 0.5){

																$('.half-size').removeClass('hidden');
																checkSize = true;
														}else{

																$('.half-size').removeClass('hidden');
																
														}
											}
								})

							   if(!checkSize){
							 
							   		$('.size-product').find('div:first').addClass('hide');

							   }else{
								  
								   	$('.size-product').find('div:first').removeClass('hide');
							 	   }
							

}

				   			








		/***
		   *   @author Erick Eduardo[erick@accon.com.br]
		   *   @access public
		   *   @exemple OPTIONS
		   *   @action [action="details-product"]
		   *
		   **/
		   function getDetailsProduct(){


		   	$(document).on('click', '[action="details-product"]', function(event) {

					if(!$(this).attr('action-details')){

							localStorage.removeItem('CTRL_PROMO');
					}	

					
					if(controleFracao &&  $(this).closest('li').attr('data-gpr') != 6){

							 alert('<big><i class="flaticon-warning37"></i></big>', 'Por favor, escolha a segunda metade da sua pizza.');


					}else{

					   				$('.product-container').find('button[action="save-combo"]').attr('action','save');
							
									 showDisplay();
									 setBoxDetails($(this).closest('li').attr('data-gpr'));
								

								   		if(controleFracao){
										    
											$('.product-container').find('div[list="callback-tamanho"]').attr('list', 'tamanho-product');
											$('.product-container').find('div[list="callback-tipo"]').attr('list', 'tipos');
											$('.product-container').find('.size-product-callback').addClass('size-product');
											$('.product-container').find('.size-product').removeClass('size-product-callback');
											$('.product-container').find('button[action="save"]').text('Aguarde...').attr('disabled', true).removeClass('no-change');
											
											$('#morepanel').removeClass('no-show');
											$('[data-change="second-half"]').addClass('col-md-6')
											$('#warning').removeClass('hide');

										}else{
										
											$('.product-container').find('.alert').removeClass('alert-danger').addClass('hide');
											$('.product-container').find('.size-product-callback').addClass('size-product');
											$('.product-container').find('.size-product').removeClass('size-product-callback');
										    $('.product-container').find('button[action="save"]').text('PEDIR');
											$('.product-container').find('button[action="save"]').attr('disabled', false).removeClass('no-change');
											$('[data-change="second-half"]').removeClass('col-md-6');
											$('#warning').addClass('hide');

										}

					 										$('[data-container="massas"]').removeClass('hide');
															$('[data-container="fracao"]').removeClass('hide');
															$('[data-container="options"]').removeClass('hide');
																							
					 										$('.add, .add-half, .remove, .remove-half, [list="options-remove-product"]').html('');
					 										$('.product-container').find('.alert').removeClass('alert-danger').addClass('alert-warning');
					 										$('.product-container').find('.alert').html(' <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">'+
					 																							'<span aria-hidden="true">×</span>'+
					 																					  '</button>'+
					                             																'<strong>Atenção!</strong>  Agora você deve escolher a outra metade da Pizza.');

															$('#more').removeClass('hide');

													   		var ID  = $(this).closest('li').attr('data-id');
													   		var APELIDO  = $(this).closest('li').attr('as');
													   		var GPR = $(this).closest('li').attr('data-gpr');
													   		var $boxAdicionais  = $('span[list="adicionais"]');
													   		var $boxRetirados   = $('span[list="retirados"]');	
													   		var $boxDetails 	   = $('div[container="setting-product"]');		
													   		var $nameProduct    = $('.products h4.nomargin');
													   		var $valueProduct = $('[recept="value-product"]');
													   		var $descProduct  = $('[recept="desc-product"]');
													   		var $imgProduct  = $('[recept="img-product"]');
													   		var $containerDetails = $('.product-container');
													   		var $labelDetails  = $('span[data-text="label-details"]');
													   		var $numItens = $('#qnt').find('big');
													   		var $containerMetade = $('[data-container="half-display-product"]');
													   		

														   		$('#product').fadeIn(400);
														   		$('#morepanel').slideUp(1);
																$('#product #more').text('Mais opções');
														   		$('.product-container .size-product .col').click();

														   		$('#product').delay(400).animate({
														            scrollTop : 0
														        }, 100)
																	
																	$containerDetails.attr('as', APELIDO);
																	$containerDetails.attr('data-gpr', GPR);
														   		var _DETAILS = getOptionsProduct(ID);	
														   		var _TIPOS   = getTiposProduct(GPR); 		


														   		checkProductDefault();
														   		$labelDetails.html(setDetailsItem(GPR));


														   			if(!_DETAILS.ADICIONAIS){$boxAdicionais.closest('div').hide() } else{ $boxAdicionais.closest('div').fadeIn() }
														   			
														   			if(!_DETAILS.RETIRADAS){ $boxRetirados.closest('div').hide() } else{  $boxRetirados.closest('div').fadeIn() }

														   		    if( (!_DETAILS.RETIRADAS) && (!_DETAILS.ADICIONAIS) ){ $('#more').hide() }{ $('#more').fadeIn()}
														   		
														   		 
																			   	   		 
																			   		$boxAdicionais.html(_DETAILS.ADICIONAIS);	
																			   		$boxRetirados.html(_DETAILS.RETIRADAS);	
																			   		$boxDetails.find('*').removeClass('active');
																					getFracaoProduct(ID);
																		   			$containerDetails.find('span[list="options-remove-product"]').html('');
																		   			$containerDetails.find('span[list="options-param-product"]').html('');
																					checkHalfProduct(__GETLocalStorage('PEDIDO'));
																				 




																					 /***
																						*   @author Erick Eduardo[erick@accon.com.br]
																						*   @exemple BUSCA POR UM PRODUTO QUE CORRESPONDA AO TIPO, TAMANHO E DESCRIÇÃO.
																						*   @return OBJETO [PRODUTO]         	
																						**/
	
																							 	var _PRODUCT = checkParamsProduct(APELIDO);
			 																		

			 																				if(_PRODUCT){
							 																					$containerDetails.attr('value', ID);
																												$containerDetails.attr('data-ecf', _PRODUCT.PRO_ECF_ID);
																												$containerDetails.attr('data-FIM', _PRODUCT.PRO_FILA_IMPRESSAO);
																												$numItens.html('1');
																				

																						 	if(!controleFracao){
																						
																						 		
																											// PREENCHER DADOS DA PRIMEIRA METADE
																											
																											$containerMetade.addClass('hide');
																											$nameProduct.text(_PRODUCT.PRO_DESCRICAO_ECOMMERCE);		
																									   		$valueProduct.attr('data-value', _PRODUCT.PRO_PRC_VND_DELIVERY);					
																									   		$descProduct.html(_PRODUCT.PRO_RESUMO_ECOMMERCE);	
																											$('[recept="img-product"]').css('background-image', 'url(App/views/public/images/produtos/'+_PRODUCT.PRO_IMAGEM_ECOMMERCE+')');			
																									   		$('[recept="img-product"] div').css('background-image', 'url(App/views/public/images/produtos/'+_PRODUCT.PRO_IMAGEM_ECOMMERCE+')');	
																											setTimeout(function() { 
																													$('[data-container="integer-display-product"] .text-center').removeClass('hide');	
																													$('[data-container="integer-display-product"] [recept="value-product"]').text('R$ ' + number_format((_PRODUCT.PRO_PRC_VND_DELIVERY),2,',','.')); 

																												},1000);

																									   	
																									}else{
																						 				
																						 				
																										
																											// PREENCHER DADOS DA SEGUNDA METADE
																											$containerMetade.removeClass('hide');
																											$productCover  = $containerDetails.find('.product .cover');
																					                        $productCover.find('div:last').css('background-image', 'url(App/views/public/images/produtos/'+_PRODUCT.PRO_IMAGEM_ECOMMERCE+')');	

																					                       		var $nameProduct      = $containerMetade.find('h4.nomargin');
																										   		var $valueProduct  	  = $containerMetade.find('[recept="value-product"]');
																										   		var $descProduct	  = $containerMetade.find('[recept="desc-product"]');
																									
																											    var _PRODUTO = _PRODUCT;
																															 $nameProduct.text("1/2 "+_PRODUTO.PRO_DESCRICAO_ECOMMERCE);		
																													   		 $valueProduct.attr('data-value',_PRODUTO.PRO_PRC_VND_DELIVERY);
																													   		 $descProduct.html(_PRODUTO.PRO_RESUMO_ECOMMERCE);	
																													   	
																													   		 	setTimeout(function() {

																													   		 					 	 $valueProduct.text('R$ ' + number_format((_PRODUTO.PRO_PRC_VND_DELIVERY * 0.5),2,',','.'));
																													   		  					 	 $productCover.find('i.up,i.down').removeClass('hide');

																													   		  							
																													   		  					 }, 500);

									  
																								}  		
																					
																				}									

																		   		
																		   		

																		   			 // BLOQUEANDO A ALTERAÇÃO DO PRODUTO
																	 				
																	 				if(controleFracao){
																	 						
																	 					setTimeout(function() {		
																							
																								$containerDetails.find('div[list="tamanho-product"]').attr('list', 'callback-tamanho');
																								$containerDetails.find('div[list="tipos"]').attr('list', 'callback-tipo');

																								if(!$('.product-container').find('button[action="save"]').hasClass('no-change')){
																									
																	  									$('.product-container').find('button[action="save"]').text('Pedir');
																	  									$('.product-container').find('button[action="save"]').attr('disabled', false);
																	  								
															                                      
																								}else{
																										$('.product-container').find('button[action="save"]').text('Indisponível');
															   											$productCover  = $containerDetails.find('.product .cover');
															 		   		  					 	    $productCover.find('i.up,i.down').addClass('hide');
																								}

																					
																							}, 800);
																					}
																										setFirstProduct();
									}

						 			 							


						 			 							/*  REVERTENDO ALTERAÇÕES DE EXIBIÇÃO DE PREÇO.
						 			 							   EXIBINDO VALOR UNITÁRIO DE PRODUTO  */
						 			 							                                      
					 			 								$('[recept="value-product-final"]').addClass('hide');
																$('[recept="value-product"]').removeClass('hide');
   																$('.size-product .half-size .col').addClass('half-sub');
   																setTimeout(function() { 
   																		$('#product div[list="tipos"] div[isdefault="S"]').find('.col').click(); 
							
   																	}, 200);





					   	});


		}








 /***
	*   @author Erick Eduardo[erick@accon.com.br]
	*   @exemple Checagem de itens pertencentes ao pedido
	*
	**/
	
	function checkProductDefault(){

	

			$('#product div[list="tipos"] div[isdefault="S"]').find('.col').click(); 
			$('#product div[list="tamanho-product"] div[isdefault="S"]').find('.col').click(); 

			




	$(document).on('click', '#product div[list="tamanho-product"] div[value]', function(event) {


						 	
						 	if(!__GETLocalStorage('CTRL_PROMO')){
						 			
						 			filterProductValue();
						 			

									 	if($(this).attr('isdefault') == 'N'){
											 $('#product div[list="tamanho-product"]').find('div[value]').removeClass('active');
										}
									 
									 	if($(this).attr('isdefault') == 'S'){
										
									 		$(this).addClass('active');

									 	}
									 
								}
					

				});


		$(document).on('click', '#product div[list="tipos"] div[value]', function(event) {

							

						 	if(!__GETLocalStorage('CTRL_PROMO')){

									 	
									 	filterProductValue();
									 	$('#product div[list="tamanho-product"] div[isdefault="S"]').find('.col').click(); 
										
									
							}

				});
	}









			function filterProductValue(){

				
				   		var $nameProduct    = $('.products h4.nomargin');
				   		var $valueProduct = $('[recept="value-product"]');
				   		var $descProduct  = $('[recept="desc-product"]');
				   		var $imgProduct  = $('[recept="img-product"]');
				   		var $containerDetails = $('.product-container');
				   		var $labelDetails  = $('span[data-text="label-details"]');


					
							var _ID = $containerDetails.attr('value');				
							var _APELIDO = $containerDetails.attr('as');				
							var _PRODUTOS = __GETLocalStorage('PRODUTOS');

							var _TIPO 	  = $('div[list="tipos"]').find('.active').closest('[value]').attr('value'); 
							var _TAMANHO  = $('div[list="tamanho-product"]').find('.active').closest('[value]').attr('value'); 
							
						
							$.each(_PRODUTOS, function(index,  produto) {

											var _PRODUTO = produto.PRODUTO;

											
											if((_PRODUTO.PRO_TIPO == _TIPO) && (_PRODUTO.PRO_TAMANHO == _TAMANHO) && (_PRODUTO.PRO_APELIDO == _APELIDO)){


														$nameProduct.text(((controleFracao) ? '1/2 ' : '') + _PRODUTO.PRO_DESCRICAO_ECOMMERCE);		
												   		$valueProduct.text('R$ ' + number_format(_PRODUTO.PRO_PRC_VND_DELIVERY,2,',','.'));					
												   		$valueProduct.attr('data-value',_PRODUTO.PRO_PRC_VND_DELIVERY);
												   		$descProduct.html(_PRODUTO.PRO_RESUMO_ECOMMERCE);	
												   		$('[recept="img-product"]').css('background-image', 'url(App/views/public/images/produtos/'+_PRODUTO.PRO_IMAGEM_ECOMMERCE+')');			
												   		$containerDetails.attr('value', _PRODUTO.PRO_ID);
												   		getFracaoProduct(_PRODUTO.PRO_ID);
														

											}

										 })

			
			}





 /***
	*   @author Erick Eduardo[erick@accon.com.br]
	*   @exemple Verificar de rótulos para Grupos
	*
	**/
			function setDetailsItem(ARGUMENT){


				var $containerTamanho = $('span[data-container="tamanho"]');
				var $containerMassas  = $('span[data-container="massas"]');
				var $containerFracao  = $('span[data-container="fracao"]');
				var $containerOptions = $('span[data-container="options"]');
				var $containerFirstChange = $('[data-change="first-half"]');
				var $containerSecondChange = $('[data-change="second-half"]');
				var $containerDescription = $('#product .container .productinfo [recept="desc-product"]');

				switch(parseInt(ARGUMENT)) {

						case 6:
							$containerTamanho.removeClass('hidden');
							$containerMassas.removeClass('hidden');
							$containerFracao.removeClass('hidden');
							$containerOptions.removeClass('hidden');
							$containerFirstChange.removeClass('col-md-12 col-md-5').addClass('col-md-6');
							$containerSecondChange.removeClass('col-md-12').addClass('col-md-6');
							$containerDescription.css('min-height','115px');

							if(controleFracao){
									$('[data-container="integer-display-product"]').removeClass('col-md-12').addClass('col-md-6 col-xs-6');
									
							}else{
									$('[data-container="integer-display-product"]').removeClass('col-md-6 col-xs-6').addClass('col-md-12');


							}
							

						
							return "Personalize sua Pizza";
						break;

						case 1:
							$containerTamanho.removeClass('hidden');
							$containerMassas.addClass('hidden');
							$containerFracao.addClass('hidden');
							$containerOptions.addClass('hidden');
							$containerFirstChange.removeClass('col-md-5').addClass('col-md-12');
							$containerSecondChange.removeClass('col-md-7').addClass('col-md-12');
							$containerDescription.css('min-height','75px');


							return "Aqui você pode escolher o tamanho de sua Bebida.";
						break;


						case 3:
							$containerTamanho.removeClass('hidden');
							$containerMassas.addClass('hidden');
							$containerFracao.addClass('hidden');
							$containerOptions.addClass('hidden');
							$containerFirstChange.removeClass('col-md-5').addClass('col-md-12');
							$containerSecondChange.removeClass('col-md-7').addClass('col-md-12');
							$containerDescription.css('min-height','75px');


							return "Aqui você pode escolher o tamanho de sua Entrada.";
						break;

						case 8:
							$containerTamanho.removeClass('hidden');
							$containerMassas.addClass('hidden');
							$containerFracao.addClass('hidden');
							$containerOptions.addClass('hidden');
							$containerFirstChange.removeClass('col-md-5').addClass('col-md-12');
							$containerSecondChange.removeClass('col-md-7').addClass('col-md-12');
							$containerDescription.css('min-height','75px');


							return "Aqui você pode escolher o tamanho de sua Sobremesa.";
						break;

						case 5:
							$containerTamanho.removeClass('hidden');
							$containerMassas.addClass('hidden');
							$containerFracao.addClass('hidden');
							$containerOptions.addClass('hidden');
							$containerFirstChange.removeClass('col-md-5').addClass('col-md-12');
							$containerSecondChange.removeClass('col-md-7').addClass('col-md-12');
							$containerDescription.css('min-height','75px');


							return "Massa pra quantas pessoas?";
						break;

						case 100:
							return "Itens da promoção";
						break;

						default:
							$containerTamanho.removeClass('hidden');
							$containerMassas.removeClass('hidden');
							$containerFracao.removeClass('hidden');
							$containerOptions.removeClass('hidden');
							return "Personalize";
						break;
				}
	}







 /***
	*   @author Erick Eduardo[erick@accon.com.br]
	*   @exemple Verificação de disponibilidade de Tipos e Tamanhos.
	*            Checagem de estoque disponível	
	*
	**/

				function checkInProduct(DATA){


						var _RETURN    = false; 
								
								switch(DATA.ACTION) {

									case 'TIPO':
												var _PRODUTOS  = __GETLocalStorage('PRODUTOS');
									
													   $.each(_PRODUTOS, function(i, getProduto) {
													
																getProduto = getProduto.PRODUTO;

																	if(getProduto.PRO_APELIDO == DATA.APELIDO && getProduto.PRO_TIPO == DATA.ID){
																				_RETURN = true;
																	}
														})
																	
										break;
									
									case 'TAMANHO':
													var _PRODUTOS  = __GETLocalStorage('PRODUTOS');
									
													  $.each(_PRODUTOS, function(i, getProduto) {
													
																getProduto = getProduto.PRODUTO;

																  if(getProduto.PRO_APELIDO == DATA.APELIDO && getProduto.PRO_TAMANHO == DATA.ID){
																				_RETURN = true;
																   }
														})
								
										break;
								}
										return _RETURN;
				}






function getDataProduct(ID){

	var _PRODUTOS  = __GETLocalStorage('PRODUTOS');
	var RESPONSE = '';
					
		   $.each(_PRODUTOS, function(i, getProduto) {
					
					getProduto = getProduto.PRODUTO;

					 if(getProduto.PRO_ID == ID){
								
								RESPONSE = getProduto;
							
						}
			})

		   	return RESPONSE;

}








function sumValuesProduct(DATA){


		// setTimeout(function() {

		// 		var $Product = $('[recept="value-product"]');
		// 		var $multiply = ($('[recept="value-product"]').hasClass('half') ? 0.5 : 1 );
		// 		var $ProductValue = ( (parseFloat($Product.attr('data-value')) * $multiply) * parseInt($('#product #qnt big').text()) );
						
		// 			     DATA.DATA.forEach(function(addValue) {
			       	 			
		// 	      			$ProductValue += parseFloat(addValue.value);
		//  		        })
			     			
		// 			     	if(DATA.ELEMENT != "REMOVE"){

		// 		     			$Product.html('R$ '+ number_format($ProductValue, 2, ',', '.')); 
		// 			     	}

		// 	     		}, 150 );
}





function sumValuesProductFinal(DATA){


		// setTimeout(function() {

		// 						if(DATA.FINAL){

									
		// 								var $Product =  (DATA.FINAL == "SECOND") ? $('[data-container="half-display-product"] [recept="value-product"]') : $('[data-container="integer-display-product"] [recept="value-product"]');
		// 								var $ProductFinal = (DATA.FINAL == "SECOND") ? $('[recept="value-product"]') : $('[recept="value-product-final"]');
		// 								var $multiply = ($('[recept="value-product"]').hasClass('half') ? 0.5 : 1 );
		// 								var $ProductValue = ( (parseFloat($Product.attr('data-value')) * $multiply) * parseInt($('#product #qnt big').text()) );
												
		// 									     DATA.DATA.forEach(function(addValue) {
									       	 			
		// 							      			$ProductValue += parseFloat(addValue.value);
		// 						 		        })
									     		
									     							
		// 							     				setTimeout(function() {
																	

		// 															$ProductFinal.removeClass('hide');
		// 											     			$Product.addClass('hide') ;
									     		
		// 							     						if( (DATA.FINAL == "SECOND") ){

		// 																	 $('[data-container="integer-display-product"] [recept="value-product"]:visible').addClass('hide'); 
		// 																	 $('[data-container="half-display-product"] [recept="value-product"]').not(':visible').removeClass('hide'); 

		// 															}	
		// 							     				}, 200);
		// 							     				$ProductFinal.html('R$ '+ number_format($ProductValue, 2, ',', '.')); 
							    

		// 						}

								

		// 		 		}, 150 );
}











 /***
	*   @author Erick Eduardo[erick@accon.com.br]
	*   @exemple Multiplicador de valores, Multipla o valor dos adicionais usando como base de operação
	*            a quantidade definida pelo usuário	
	*    @param  Quantidade definida pelo usuário        
	*
	**/
		function multiplyValuesProduct(DATA){

			var $Product 	  = $('[recept="value-product"]');
			var $ProductValue = parseFloat($Product.attr('data-value'));

			var $adicionais = 0;

					$('.products [list="options-param-product"] p[value]').each(function(index, el) {
								
						 $adicionais += parseFloat($(this).attr('value'));
					});

				if($adicionais){		

			    		$ProductValue += $adicionais;
				}

			var $ProductTotal = ( $ProductValue * DATA ); 
				$Product.html('R$ '+ number_format($ProductTotal, 2, ',', '.'));
				 getOptionsDetailsProduct('ADD');
		}








 /***
	*   @author Erick Eduardo[erick@accon.com.br]
	*   @exemple Método responsável pelo obtenção dos dados da 1º Metade
	*    @param  PEDIDOS      
	*
	**/

function checkHalfProduct(PEDIDO){

			var $boxDetails  = $('.product-container');	
			var $PEDIDO      = PEDIDO;
			var _HALFisrt = [];
			var _RESPONSE = false;
			var _RESPONSE_SIZE = false;
			var _PRODUTO; 

			if($PEDIDO){

				$PEDIDO.forEach(function(produto) {

							if(produto.FRACAO == 0.5){

									_HALFisrt.push(produto);
							}
				})

					if(_HALFisrt.length % 2 != 0){



				   		   var _PRODUTOHalf;

								_HALFisrt.forEach(function(getHalfProduct) {

										if(getHalfProduct.ID_FRACAO == "check"){	

											_PRODUTOHalf = getHalfProduct;
									}
								})

				   		       _PRODUTO  = 	getInProduto(_PRODUTOHalf.ID);
				   		   	   _PRODUTO  =  _PRODUTO.PRODUTO;

							   	 
				   		   	
				   		      $('.product-container').find('div[list="tipos"] div[value]').each(function(index, el) {
				   		   	   			
				   		   	   		   if(parseInt($(this).attr('value')) == parseInt(_PRODUTO.PRO_TIPO)){
														
													       $(this).find('div.col').click();
			   		   	   			 					  _RESPONSE = true;
				   		   	  	 		}
				   		   	   })


				   		        $('.product-container').find('div[list="tamanho-product"] div[value]').each(function(index, el) {
				   		   	   			
				   		   	   			if(parseInt($(this).attr('value')) == parseInt(_PRODUTO.PRO_TAMANHO)){
													
													 	  $(this).find('div.col').click();
			   		   	   			 					  _RESPONSE_SIZE = true;
				   		   	  	 		}
				   		   	   })

				   		          
				   		 
				   		      if(!_RESPONSE || !_RESPONSE_SIZE){
 										
 										$('.product-container').find('div[list="tamanho-product"] div.col').removeClass('active');
 										$('.product-container').find('div[list="tipos"] div.col').removeClass('active');
 										$('.product-container').find('div[list="callback-tipo"] div.col').removeClass('active');
 										$('.product-container').find('button[action="save"]').attr('disabled', true).addClass('no-change');
 										$('.product-container').find('.alert').removeClass('alert-warning').addClass('alert-danger');
 										$('.product-container').find('.alert').html(' <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">'+
 																							'<span aria-hidden="true">×</span>'+
 																					  '</button>'+
                             																'<strong>Importante!</strong> Este produto não está disponível para compor a outra metade escolhida.');
 										$('#more').addClass('hide');
 										setTimeout(function() {  $('.product-container').find('.size-product-callback div.col').removeClass('active'); }, 500);
				   		       }


					}

							 // BLOQUEANDO A ALTERAÇÃO DO PRODUTO
			 				if(controleFracao){
			 						
			 						$boxDetails.find('.alert').removeClass('hide');
									$('.pizzametade').removeClass('hide');
									$('.size-product div.col:first').click();
									
									$boxDetails.find('.size-product').addClass('size-product-callback');
									$boxDetails.find('.size-product').removeClass('size-product');
									$boxDetails.find('div[list="tamanho-product"]').attr('list', 'callback-tamanho');
									$boxDetails.find('div[list="tipos"]').attr('list', 'callback-tipo');
									
								   $productCover  = $boxDetails.find('.product .cover');
                         		   $productCover.find('div:first').css('background-image', 'url(App/views/public/images/produtos/'+_PRODUTO.PRO_IMAGEM_ECOMMERCE+')');
							   		

							   		var $nameProduct  = $('[data-container="integer-display-product"]  h4.nomargin');
							   		var $valueProduct = $('[data-container="integer-display-product"] [recept="value-product"]');
							    	var $descProduct  = $('[data-container="integer-display-product"] [recept="desc-product"]');

							   	
							   	
														$nameProduct.text('1/2 ' + _PRODUTO.PRO_DESCRICAO_ECOMMERCE);		
														$valueProduct.attr('data-value', _PRODUTO.PRO_PRC_VND_DELIVERY);					
														$descProduct.html(_PRODUTO.PRO_RESUMO_ECOMMERCE);	

									
                         			}else{

									$boxDetails.find('.alert').addClass('hide');
									$('.pizzametade').addClass('hide');
									$boxDetails.find('div[list="callback-tamanho"]').attr('list', 'tamanho-product');
									$boxDetails.find('div[list="callback-tipo"]').attr('list', 'tipos');
									$boxDetails.find('.size-product-callback').addClass('size-product');
									$boxDetails.find('.size-product').removeClass('size-product-callback');
									
							}	

					
			}
		
}









function setBoxDetails(GROUP){

		var _response = false;
		var $containerProduct = $('.product-container');



	   $.getJSON('config-app.json', function(CONFIG) {
          
    		CONFIG.GROUPS_DEFAULT.forEach(function(getGroup, index) {

    				if(parseInt(getGroup) == parseInt(GROUP)){

						_response = true; 
    				}
    		})
            		
            		if(_response){

							$('[container="options-pizza"]').removeClass('col-md-12');
							$('[container="options-pizza"]').addClass('col-md-6');
							$('.options-single').addClass('hide');
							$containerProduct.removeClass('details-half');
							$containerProduct.find('.data-transform').removeClass('col-md-12');
							$containerProduct.find('.data-transform').addClass('col-md-6');
            		}else{

							$('[container="options-pizza"]').removeClass('col-md-6');
							$('[container="options-pizza"]').addClass('col-md-12');
							$containerProduct.addClass('details-half');
							$containerProduct.find('.data-transform').removeClass('col-md-6');
							$containerProduct.find('.data-transform').addClass('col-md-12');
							$('[data-text="label-details"]').text('');
            		}
          })

}








 /***
	*   @author Erick Eduardo[erick@accon.com.br]
	*   @exemple Percorre array um a um, de forma gradual
	*   @param  ARRAY      
	*   @return object
	**/
			var iItem = 0;
			
			function setStep(){

						$(document).on('click','.products .product .icon',function(){

								 ( $(this).hasClass('down') ? iItem++ : (iItem <= 0) ? null : iItem-- );
								
									if(!__GETLocalStorage('CTRL_PROMO')){  stepByStep(); }
							})
			}
				   			


			function stepByStep(){

				 					$('[data-container="half-display-product"] [list="options-remove-product"]').html('');
				 					$('.remove-half, .add-half').html('');

				 					
			
					var $PRODUTOS = __GETLocalStorage('PRODUTOS');
					var _TIPO 	  = $('div[list="callback-tipo"]').find('.active').closest('[value]').attr('value'); 
					var _TAMANHO  = $('div[list="callback-tamanho"]').find('.active').closest('[value]').attr('value'); 
					 				$('#morepanel').removeClass('no-show');
									
									$('.product-container').find('button[action="save"]').attr('disabled',false);


					var _PRODUTOS = [];
					var  RESPONSE, 
					     GRP;
					
					
					      $.getJSON('config-app.json', function(CONFIG) {
          								   GRP = CONFIG.GROUPS_DEFAULT;
									 });

								
						  setTimeout(function(){

									$.each($PRODUTOS, function(index,  produto) {

												var _PRODUTO = produto.PRODUTO;

												if((_PRODUTO.PRO_TIPO == _TIPO) && (_PRODUTO.PRO_TAMANHO == _TAMANHO) && !!~jQuery.inArray(parseInt(_PRODUTO.PRO_GRUPO), GRP)){

											 			_PRODUTOS.push(_PRODUTO);  
											
												}

											 })


																	
								 /***
									*   @author Erick Eduardo[erick@accon.com.br]
									*   @exemple Caso chegue ao fim do array filter
									**/
				   						iItem = (_PRODUTOS.length == iItem) ? 0 : iItem;

							   			$.each(_PRODUTOS, function(i, getProduto) {
												
													if(i == iItem){

														RESPONSE = getProduto;
													}	  	
											})
				   					
																		
									 /***
										*   @author Erick Eduardo[erick@accon.com.br]
										*   @exemple Montando Produto selecionado
										**/

									   		if(RESPONSE){

									   			   		var $containerMetade  = $('[data-container="half-display-product"]');
												   		var $nameProduct      = $containerMetade.find('h4.nomargin');
												   		var $valueProduct  	  = $containerMetade.find('[recept="value-product"]');
												   		var $descProduct	  = $containerMetade.find('[recept="desc-product"]');
												   		var $imgProduct  	  = $('[recept="img-product"]');
												   		var $containerDetails = $('.product-container');
												   		var $labelDetails     = $containerMetade.find('span[data-text="label-details"]');
															
															$containerMetade.removeClass('hide');
													

													    var _PRODUTO = RESPONSE;
																	 $nameProduct.text("1/2 "+ _PRODUTO.PRO_DESCRICAO_ECOMMERCE);		
															   		 $valueProduct.text('R$ ' + number_format((_PRODUTO.PRO_PRC_VND_DELIVERY * 0.5),2,',','.'));					
															   		 $valueProduct.attr('data-value',_PRODUTO.PRO_PRC_VND_DELIVERY);
															   		 $descProduct.html(_PRODUTO.PRO_RESUMO_ECOMMERCE);	
															   		 $productCover  = $containerDetails.find('.product .cover');
			                         							     $productCover.find('div:last').css('background-image', 'url(App/views/public/images/produtos/'+_PRODUTO.PRO_IMAGEM_ECOMMERCE+')');
															   		 $containerDetails.attr('value', _PRODUTO.PRO_ID);
															   		  getFracaoProduct(_PRODUTO.PRO_ID);
															   		  $containerDetails.attr('data-ecf', _PRODUTO.PRO_ECF_ID);
																	  $containerDetails.attr('data-FIM', _PRODUTO.PRO_FILA_IMPRESSAO);
																	  $containerDetails.attr('as', _PRODUTO.PRO_APELIDO);
																	  $containerDetails.attr('data-gpr', _PRODUTO.PRO_GRUPO);
																	  renewOptionsProduct( _PRODUTO.PRO_ID);
									   		}


							}, 200);
		   		

			}









function setFirstProduct(){

					var _PEDIDO =  __GETLocalStorage('PEDIDO');


                      var RESPONSE = [];
                      var $containerAdd = $('[list="options-param-product"]');
                      var _html = '';
                      var _htmlRemove = '';
                      var $containerDetails = $('.product-container');
                      var _FRACAO = parseFloat($containerDetails.find(((controleFracao) ? '.size-product-callback .active' : '.size-product .active' )).closest('[data-value]').attr('data-value'));

						if(_PEDIDO && (controleFracao)){

							  _ADICIONAIS = _PEDIDO[0].ADICIONAIS;
							  _RETIRADAS  = _PEDIDO[0].RETIRADAS;

								_ADICIONAIS.forEach(function(getItem, index){

										
										  RESPONSE.push({
									                                                        
                                               value: (parseFloat(getItem.VALOR) * _FRACAO) * parseInt($('#product #qnt big').text()),
                                               name: getItem.APELIDO
                                        })
                            	})
                
                        	
                        	 RESPONSE.forEach(function(obj) {

                    	        _html += '<p value= ' + (obj.value) + '>+ R$ ' + (number_format(obj.value, 2, ',', '.')) + ' ( '+ obj.name +' ) </p>';
                	      })    
                	  


					  if(_RETIRADAS.length > 0){
                            _RETIRADAS.forEach(function(remove) {
                            
                            
                                 _htmlRemove += '<cite> s/ ('+remove.APELIDO+')</cite><br/>';
            
                            })
                        }


						$('.add').html(_html);    
                	    $('.remove').html(_htmlRemove);    





    
							var $Product = $('[recept="value-product-final"]');
							var $multiply = ($('[recept="value-product"]').hasClass('half') ? 0.5 : 1 );
							var $ProductValue = ( (parseFloat($('[recept="value-product"]').attr('data-value')) * $multiply) * parseInt($('#product #qnt big').text()) );
                          			
								    RESPONSE.forEach(function(addValue) {
						       	 			
						      			$ProductValue += parseFloat(addValue.value);
					 		        })
						     			$Product.html('R$ '+ number_format($ProductValue, 2, ',', '.')); 

						}									  
									                                
                                          

	}







function showDisplay(){


            	if(!__GETLocalStorage('CTRL_PROMO')){

            	    	var 	
                		 $cotnainerView = $('.product-container');

					  if( $('#menu i').hasClass('flaticon-menu55') ){
				                    $('#menu i').removeClass('flaticon-menu55');
				                    $('#menu i').addClass('flaticon-go10');
				                } else {
				                    $('#menu i').addClass('flaticon-menu55');
				                    $('#menu i').removeClass('flaticon-go10');
				                }
				                if( $('#cart i').hasClass('flaticon-close47') ){
				                    cartMenu();
				                    
				                } else if( $('#cart i').hasClass('flaticon-close47') ){
				                    menuMenu();
				                }
				                $('#product').addClass('show');
				                $('#morepanel').slideUp(1);
				                $('#product #more').text('Mais opções');

				                //$('body, html').css('overflow', 'hidden');

										$cotnainerView.find('[data-type="combo"]').addClass('hide');
	}
}






function changeHtmlDisplay(){


			$(document).on('click','.size-product .half-size',function(event){

						setDetailsItem(parseInt(6));

			})
}













/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple OPTIONS
   *
   **/
   function checkParamsProduct(ARGUMENT){


   	var	$TIPO 		 = ($('[list="callback-tipo"]').length > 0) ? $('[list="callback-tipo"]') : $('[list="tipos"]'); 
   	var	$TAMANHO     = ($('[list="callback-tamanho"]').length > 0) ?  $('[list="callback-tamanho"]') : $('[list="tamanho-product"]'); 
   	var	_TIPO 		 =  $TIPO.find('[isdefault] .active').closest('[value]').attr('value');
   	var	_TAMANHO     = $TAMANHO.find('[isdefault] .active').closest('[value]').attr('value'); 
   	var RESPONSE = null;

   	
   	$.each(__GETLocalStorage('PRODUTOS'), function(index, getProduto) {

			getProduto   = getProduto['PRODUTO'];
   		
   			if ((getProduto.PRO_APELIDO  == ARGUMENT) && (parseInt(getProduto.PRO_TIPO) == parseInt(_TIPO)) && (parseInt(getProduto.PRO_TAMANHO) == parseInt(_TAMANHO))) {

											RESPONSE = getProduto;
								
									}	

					 	}) //LIST PRODUTOS
   	return RESPONSE;
}