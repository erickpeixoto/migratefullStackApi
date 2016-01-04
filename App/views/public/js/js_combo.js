	/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple
   *
   **/


   $(function(){
				
				setComboCar();
				getDetailsCombo();	
				getTamanhoCombo();
				setScroollingProductCombo();
				halfProductCombo();
				setStepCombo();
				renewInterfaceProduct();
				setComboBanner();
				localStorage.removeItem('SETTING_COMB');
				localStorage.removeItem('COMBO_CAR');

	})




   function getCombos(LOJAS){


			  $.ajax({
			          url: __GETLocalStorage('CONFIG').API.SQL,
			          type: 'GET',
			          data: {
			            
			              AJAX: true,
			              SERVICE: 'COMBO',
			              METHOD: 'GET',
			              OPERATION: 'ALL',
			              REST: LOJAS
			            },
			        })
			        .done(function(){})
			        .fail(function(){})
			        .always(function(response){

			        			      __SETLocalStorage('PROMO', $.parseJSON(response));
			                     		listPromo(__GETLocalStorage('PROMO'));
			          })
   }






   function listPromo( PROMO ){

   		
					var 
						   _htmlPromocoes = ''
						,  _htmlSlides 	  = ''
						,  _htmlItens 	  = ''
						,  _htmlStatic    = $('[list="banner-promo"]').html();

						 // ESTRUTURA DE REPETIÇÃO
						 $.each(PROMO, function(index, getPromo) {

						 	
						 		var 
						 			  _ITENS   = getPromo.ITENS
						 			, _PROMO   = getPromo
						 			, _PRODUTO = getInProduto(_ITENS[0][0].CPR_PRO_ID).PRODUTO;	

										if(checkDayPromo(getPromo.CMB_DIAS_ECOMMERCE.split('|'))){

											_htmlItens += '<li class="product" as="'+_PRODUTO.PRO_APELIDO+'"  data-id="'+_PRODUTO.PRO_ID+'" data-gpr="6" data-cmb="'+_PROMO.CMB_ID+'"><div action="details-product" action-details="combo" class="cover pointer" style="background-image: url(App/views/public/images/promocoes/'+_PROMO.CMB_IMAGEM_ECOMMERCE+')"><span role="flags-prod"></span></div><h2 ><p style="margin-bottom: 7px !important;"></p><span class="badge pull-right" action="details-product"  action-details="combo" >PEDIR <i class="exit flaticon-shopping232"></i></span></h2><h4 style="text-align: center;"> '+_PROMO.CMB_DESCRICAO_ECOMMERCE+'  </h4><p style="margin-bottom: 11px !important;"></p></li>';

											_htmlSlides += '<article  data-cmb="'+_PROMO.CMB_ID+'" class="pointer slide glide__slide" style="background-image: url(http://pizzahutbrasilia.com.br/App/views/public/images/promocoes/'+_PROMO.CMB_SLIDE_ECOMMERCE+')" onClick=""></article>';

										}

						}) 
										
										$('[list="banner-promo"]').html(_htmlSlides + _htmlStatic);

								_htmlPromocoes += '<div id="cardapiocontainer">'+
									                '<h1 class="groupname"><span>PROMOÇÕES</span><hr></h1>'+
									                '<ul class="products">'+ _htmlItens + '</ul>'+
									            '</div>';

										    $('[list="Combos"]').animate({opacity: 0}, 200, function() {
											$('[list="Combos"]').html((_htmlPromocoes ));
											$('[list="Combos"]').animate({opacity: 1},50);

									   })
										
										slideValues();
										slidePromo();
}






	function checkDayPromo(DATA){

		var RESULT = DATA.map(function (x) { 
		    return parseInt(x, 10); 
		});

		var DAY = parseInt(new Date().getDay());
			
			return ($.inArray(DAY, RESULT) !== -1);
		}







	/***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @access public
	   *   @exemple OPTIONS
	   *   @action [action="details-product"]
	   *
	   **/
		   function getDetailsCombo(){


			   	$(document).on('click', '[action-details="combo"]', function(event) {
						
						__SETLocalStorage('CTRL_PROMO', true);

					if(controleFracao){
							
							 	$('#product #exit').click();

								 alert('<big><i class="flaticon-warning37"></i></big>', 'Por favor, escolha a segunda metade da sua pizza.');

					}else{
											showDisplayCombo();		        	
									var
										    $containerView   = $('.product-container')
										 ,  _idCOMBO 		 = $(this).closest('li').attr('data-cmb')  
										 ,  _TIPOS 		  	 = getTiposCombo(_idCOMBO)
										 ,  $labelDetails    = $('span[data-text="label-details"]')
										 , _COMBO 			 = getInCombo(_idCOMBO);

									    $.getJSON('config-app.json', function(CONFIG) {
			          								   GRP = CONFIG.GROUPS_DEFAULT;
												 });


										 $containerView.find('[data-type="combo"]').removeClass('hide');
										 $containerView.attr('data-combo', _idCOMBO);
			        			   		 $labelDetails.html(setDetailsItem(100));
  													
			        			   		  if(! __GETLocalStorage('COMBO_CAR')){

												__SETLocalStorage('COMBO_CAR', {
  		  				 														 COMBO: _COMBO,
   		  				 									 	 				 PRODUTOS:  []
   		  				 									 				})
											}

										 if(! __GETLocalStorage('SETTING_COMB')){
										 	
						        			      __SETLocalStorage('SETTING_COMB', {

						        			      			ITEM: 1,
						        			      			COMBO: _COMBO
						        			      });
										 }
								
								    	
			        			   		 setDataCombo(_idCOMBO);

			        			   		 /***
										   *   @author Erick Eduardo[erick@accon.com.br]
										   *   @access public
										   *   @exemple INICIALIZA O SCROOLING DOS PRODUTOS DO ITEM
										   *
										   **/
		   		   		  					setTimeout(function() { $('[data-action="next-product-combo"]').click(); }, 500);	
		   		   		  						 
												

			        			   		           
   		   		  										    	
											 	 $('#product div[list="tipos"]').find('[isdefault="S"]').click();
											if(!$('#product div[list="tipos"]').find('[isdefault="S"]').size()){

								    			$('#product div[list="tipos"] [value]:first .col').click();
								    		}

									

								    		 setTimeout(function() {

								    		 	 /***
													   *   @author Erick Eduardo[erick@accon.com.br]
													   *   @exemple VERIFICA PRODUTO DEFAULT E SETA CASO O RETORNE SEJA FALSE
													   *
													   **/
											    		 	if($('#product div[list="tipos"] div[isdefault="S"] .col').size() == 0){  
	 										
		 															$('#product div[list="tipos"] div[isdefault="N"] .col:first').click();
		 									
		 										 					}
								    		 }, 1500);
									}
			   				})





						$(document).on('click', '.active-cmb', function(event) {

										var THIS = $(this);								 			
								 	

								 	setTimeout(function() {

								 		 	filterComboValue();

										 	if(THIS.attr('isdefault') == 'N'){
												 $('#product div[list="tamanho-product"]').find('div[value]').removeClass('active');
											}
										 
										 	if(THIS.attr('isdefault') == 'S'){
											
										 		THIS.addClass('active');

										 	}
										
								 	}, 200);
				
								
							
							})
		
		}








 function showDisplayCombo(){

		
 	if(!controleFracao){

		var
			   $View 		  = $('[view="Combo"]')
			 , $cotnainerView = $('[container="Combo-Product"]');


    		$View.removeClass('hidden');
    		$cotnainerView.addClass('show');
		            $('#product').addClass('show');
				                $('#morepanel').slideUp(1);
				                $('#product #more').text('Mais opções');
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









	 /***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @exemple GET COMBO ID
	   *
	   **/
	   function getInCombo(ID){

		   	var COMBOS = __GETLocalStorage('PROMO');
		   	for (var i = 0; i < COMBOS.length; i++) {

		   		if(COMBOS[i].CMB_ID == ID){
		   				   		
		   			return COMBOS[i];	
		   		}
		   	}

	   }	






/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple OPTIONS
   *
   **/
   function getTiposCombo(ARGUMENT){

   			setTimeout(function() {
					var 
						
						   $containerTtipos = $('#product div[list="tipos"]')
						,  $containerDetails = $('.product-container')
						,  _APELIDO   = $containerDetails.attr('as')
						,  _ARGUMENT  = $containerDetails.attr('data-combo')
						,  COMBO 	  = getInCombo( _ARGUMENT )
						,  TAMANHOS   = COMBO.TAMANHOS
						,  TIPOS      = COMBO.TIPOS
						,  _htmlTipos = '';

						var _PRODUTOS = createProductCombo(COMBO.CMB_ID);


								/***
								   *   @author Erick Eduardo[erick@accon.com.br]
								   *   @exemple MONTAGEM DOS TIPOS DE PIZZA
								   **/
									   
								
									   $.each(filterRecursive( TIPOS ), function(i, getTipo) {
												
									   				var
					   									  $containerDetails = $('.product-container')
														, _RETURN  			= false;
												
																   $.each(_PRODUTOS, function(i, getProduto) {
																
																			getProduto = getProduto.PRODUTO;

																				if(getProduto.PRO_APELIDO == _APELIDO && getProduto.PRO_TIPO == getTipo.PTI_ID){

																		  			   	$.each(filterTamRecursive( TAMANHOS ), function(i, getTamanho) {
																						
																							if(getTamanho.PTA_TIPO == getTipo.COP_TIPO){

																										_RETURN = true;
																										
																					   			}
																					   	})
																				}
																	})
																
															
											   		if(_RETURN){

										   					_htmlTipos	+= '<div class="active-cmb col-xs-4" value="'+getTipo.PTI_ID+'" isDefault='+getTipo.PTI_ECOMMERCE_DEFAULT+'>'+
															   					'<div class="col type '+((getTipo.PTI_ECOMMERCE_DEFAULT == "S") ? 'active' : '')+'" style="background-image: url(App/views/public/images/'+getTipo.PTI_ECOMMERCE_IMG+')">'+
															   					'<input type="checkbox"/>'+
															   					'</div>'+ 
															   					'<small>'+getTipo.PTI_TIPO+'</small>'+
															   				'</div>';
											   			}
					  					   })

									   $containerTtipos.html(_htmlTipos);

									}, 500);
			}






/***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access public
   *   @exemple GET TAMANHO
   *
   **/
   function getTamanhoCombo(){


					/***
					   *   @author Erick Eduardo[erick@accon.com.br]
					   *   @exemple MONTAGEM DOS TAMANHO DE PIZZA
					   **/
   
   						$(document).on('click', 'div[list="tipos"] [value]', function(event) {
								
								var 
									THIS = $(this);
		   							
   							setTimeout(function() {
									
									 	if(__GETLocalStorage('CTRL_PROMO') && !controleFracao){
								 
										 			var 
														
														   $containerDetails  = $('.product-container')
														,  _ID_COMBO 		  = $containerDetails.attr('data-combo')
														,  COMBO 		  	  = getInCombo( _ID_COMBO )
														,  $containerTtamanho = $('#product div[list="tamanho-product"]')
														,  TAMANHOS  		  = COMBO.TAMANHOS
														,  _APELIDO   		  = $containerDetails.attr('as')
														,  _argument  		  = THIS.attr('value')
														,  _htmlTamanhos 	  = '';
																

											  			   	$.each(filterTamRecursive( TAMANHOS ), function(i, getTamanho) {
																
																
																	if(getTamanho.PTA_TIPO == _argument){

													   									_htmlTamanhos	+= '<div class="col-xs-4" value="'+getTamanho.PTA_ID+'"  isDefault="'+(getTamanho.PTA_ECOMMERCE_DEFAULT)+'">'+
																			   			'<small>'+getTamanho.PTA_TAMANHO+'</small>'+
																			   			'<div class="col type '+((getTamanho.PTA_ECOMMERCE_DEFAULT == "S" || ($('#product div[list="tamanho-product"]').find('div[value].active').size() == 0)) ? 'active' : '')+'" style="background-image: url(App/views/public/images/'+getTamanho.PTA_ECOMMERCE_IMG+')">'+
																			   			'<input type="checkbox"/>'+
																			   			'</div>'+ 
																			   			'<big>'+((getTamanho.PTA_ECOMMERCE_FATIAS) ? getTamanho.PTA_ECOMMERCE_FATIAS : '')+'</big>'+
																			   			'</div>';
												   							}
														   	})

									 		  
									 		  	$containerTtamanho.html(_htmlTamanhos);
											
							 							// $('#product div[list="tamanho-product"] div[value]').each(function(index, li) {

															//  	if($(this).attr('isdefault') == 'S'){
																	
															// 			$(this).find('.col').click();
															
															//  	}
														 // })


												
							 									
							 						 
												 }
									
							}, 100);		

		   							

					})
}







		function filterComboValue(){

				
					   		var 
					   			  $nameProduct      = $('.products h4.nomargin')
					   			, $valueProduct 	= $('[recept="value-product"]')
					   			, $descProduct  	= $('[recept="desc-product"]')
					   			, $imgProduct  		= $('[recept="img-product"]')
					   			, $containerDetails = $('.product-container')
					   			, $labelDetails  	= $('span[data-text="label-details"]')
								, _ID 				= $containerDetails.attr('value')			
								, _COMBO			= $containerDetails.attr('data-combo')			
								, _APELIDO 			= $containerDetails.attr('as')			
								, _PRODUTOS 		= __GETLocalStorage('PRODUTOS')
								, _TIPO 	 		= $('div[list="tipos"]').find('.active').closest('[value]').attr('value') 
								, _TAMANHO  		= $('div[list="tamanho-product"]').find('.active').closest('[value]').attr('value') 
								, _PRODUTOS 		= createProductCombo(_COMBO);


							$.each(_PRODUTOS, function(index,  _PRODUTO) {

									_PRODUTO = _PRODUTO.PRODUTO;
									
											if((_PRODUTO.PRO_TIPO == _TIPO) && (_PRODUTO.PRO_TAMANHO == _TAMANHO) && (_PRODUTO.PRO_APELIDO == _APELIDO)){
													
														$nameProduct.text(((controleFracao) ? '1/2 ' : '') + _PRODUTO.PRO_DESCRICAO_ECOMMERCE);		
												   		$valueProduct.removeClass('hide').text('R$ ' + number_format(_PRODUTO.PRO_PRC_VND_DELIVERY,2,',','.'));					
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
	   *   @exemple RESNPOSÁVEL PELA CRIAÇÃO DO OBJETO DE PRORDUTOS
	   *            CONSIDERANDO O PREÇO UNITÁRIO DEFINIDO NO COMBO.
	   *            SERÁ CONSIDERADO TAMBÉM O ITEM EM QUE SE ESTÁ, DE FORMA OBRIGATÓRIA.	
	   **/
			function createProductCombo(CMB){

						if(__GETLocalStorage('CTRL_PROMO') && !controleFracao){

							var 
								   COMBO 				= getInCombo( CMB )
								,  $containerTtipos 	= $('#product div[list="tipos"]')
								,  $containerDetails	= $('.product-container')
								,  _APELIDO   			= $containerDetails.attr('as')
								,  _SETTING   			= __GETLocalStorage('SETTING_COMB')
								,  _PRODUTOS   			= []
								,  _htmlTipos 			= '';


										if(COMBO.ITENS && _SETTING){

												 COMBO.ITENS.forEach(function(data){

												 		var _itens = data;
												 		
												 			_itens.forEach(function(prod){

												 				if(prod.CPR_ITEM == _SETTING.ITEM ){
												 						
												 					var _PRODUTOCOMBO = getInProduto(prod.CPR_PRO_ID);


												 						if(_PRODUTOCOMBO){

					  							 							_PRODUTOCOMBO.PRODUTO.PRO_PRC_VND_DELIVERY = prod.CPR_PRECO;
												 							_PRODUTOS.push(_PRODUTOCOMBO);
												 							
												 						}
													 			}
												 			})
											 	
												 })
										}

										
									 return _PRODUTOS;

				}			 
			}







function filterRecursive( DATA ){

			var arrows 	 = [];
			var response = [];

		for (var i = 0; i < DATA.length; i++) {
					
					if(i < DATA.length-1){

							if(DATA[i].COP_TIPO == DATA[i++].COP_TIPO)  arrows.push(i);
					}
			}

		DATA.forEach(function(data, index){

				if($.inArray(index, arrows) === -1) response.push(data);
		})	
			return response;
}






function filterTamRecursive( DATA ){

			var arrows 	 = [];
			var response = [];

		for (var i = 0; i < DATA.length; i++) {
					
					if(i < DATA.length-1){

							if(DATA[i].COP_TAMANHO == DATA[i++].COP_TAMANHO)  arrows.push(i);
					}
			}

		DATA.forEach(function(data, index){

				if($.inArray(index, arrows) === -1) response.push(data);
		})	
			return response;
}














	/***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @access public
	   *   @exemple POPULA A INTERFACE COM OS VALOR OBTIDO DO COMBO SETADO @param
	   *   @param ID DO COMBO
	   *
	   **/
		   function setDataCombo(_idCOMBO){

		   		var
		   			   _COMBO 				  = getInCombo(_idCOMBO)
					,  _SETTING 	  		  = __GETLocalStorage('SETTING_COMB')
		   		    ,  $containerDetails 	  = $('.product-container')
		   		    ,  $containerDetailsCombo = $('[data-container="combo-details"]')
		   		    ,  $boxListItens 		  =	$('[list="itens-combo"]')
		   		    ,  GRP					  =	null
		   		    ,  _GRP					  =	$containerDetails.attr('data-gpr') 
		   		    ,  $htmlItens 		      =	'';

		   		   		
		   		   		  $.getJSON('config-app.json', function(CONFIG) {
									          								  GRP = CONFIG.GROUPS_DEFAULT;
																		 });


		   				$containerDetailsCombo.find('[data-combo="img"]').css('background-image', 'url(/App/views/public/images/promocoes/'+_COMBO.CMB_IMAGEM_ECOMMERCE+')');			
		   				$containerDetailsCombo.find('[data-combo="descricao"]').text(_COMBO.CMB_DESCRICAO_ECOMMERCE);			
		   				$containerDetailsCombo.find('[data-combo="regras"]').text(_COMBO.CMB_REGRAS_ECOMMERCE);	
		   				$('#qnt button').attr('disabled', true);
		   				$('.product-container').find('button[action="save"]').attr('action','save-combo');
		   			
		   				
 							_COMBO.ITENS.forEach(function(data, index){

 									$htmlItens += '<big '+(( (index+1) <= _SETTING.ITEM ) ? 'class="active pointer"' : '' )+'>'+(index+1)+'</big>';

 									})
 									
 											$boxListItens.html($htmlItens); 
											
											if((_SETTING.ITEM  < _COMBO.ITENS.length)){

												   $('.product-container').find('button[action]').text('Próximo');
											}else{

												  setTimeout(function() { $('.product-container').find('button[action]').text('Pedir'); }, 1000); 
											}
 											 												$('#select').removeClass('hide');
											if((_COMBO.ITENS.length == 1)){ $('#select').addClass('hide'); }
												



									/***
									   *   @author Erick Eduardo[erick@accon.com.br]
									   *   @exemple TRATAMENTO PARA GRUPOS DIFERENTES DOS DEFAULT
									   *
									   **/
		 									setTimeout(function() {
						    
						      							var _GRP   = $containerDetails.attr('data-gpr');
						      							var _PROD  = $containerDetails.attr('value');
															
																	if(GRP != _GRP){

																			$('[data-container="massas"]').addClass('hide');
																			$('[data-container="fracao"]').addClass('hide');
																			$('[data-container="options"]').addClass('hide');
																	}else{
																
																			$('[data-container="massas"]').removeClass('hide');
																			$('[data-container="fracao"]').removeClass('hide');
																			$('[data-container="options"]').removeClass('hide');
																	}	
													


																	/***
																	   *   @author Erick Eduardo[erick@accon.com.br]
																	   *   @exemple VERIFICAÇÃO DE EXIBIÇÃO  - FRAÇÃO DE PRODUTOS 
																	   *
																	   **/
											 								if(_COMBO.CMB_FRACAO_ECOMMERCE == "N"){

											 										$('[data-container="fracao"]').addClass('hide');
											 								}else{
											 										$('[data-container="fracao"]').removeClass('hide');
	
												 								}	
															     					$('#product div[list="tipos"]').find('[isdefault="S"]').click();

 																				renewOptionsProduct(_PROD);
 																																										

													}, 400);
	

										
									
			}










	/***
	   *   @author Erick Eduardo[erick@accon.com.br]
	   *   @access public
	   *   @exemple POPULA A INTERFACE COM OS VALOR OBTIDO DO COMBO SETADO @param
	   *   @param ID DO COMBO
	   *
	   **/
				

	var iNextCombo = 0;
			
			function setScroollingProductCombo(){

						$(document).on('click','.products [data-action]',function(){
									
								
								 ( $(this).attr('data-action') == "next-product-combo" ? iNextCombo++ : (iNextCombo <= 0) ? null : iNextCombo-- );
								
									scroollingProductCombo();
							})
			}
				   			




	function scroollingProductCombo(){

			
			if(__GETLocalStorage('CTRL_PROMO')){	
				
				   		var 
				   			   $containerDetails = $('.product-container')
				   			, _COMBO			 = $containerDetails.attr('data-combo');

												   $('[data-container="integer-display-product"] [recept="value-product"]').addClass('hide');							
					
							var $PRODUTOS =	createProductCombo(_COMBO);
							var _TIPO 	  = $('div[list="tipos"]').find('.active').closest('[value]').attr('value'); 
							var _TAMANHO  = $('div[list="tamanho-product"]').find('.active').closest('[value]').attr('value'); 
							 				$('#morepanel').removeClass('no-show');
											
											$('.product-container').find('button[action="save"]').attr('disabled',false);
											$('[list="options-remove-product"]').html('');

									
											var _PRODUTOS = [];
											var  RESPONSE, 
											     GRP;
											 var CHECK_GRP = false;   
											
											
											      $.getJSON('config-app.json', function(CONFIG) {
						          								   GRP = CONFIG.GROUPS_DEFAULT;
															 });

														
												  setTimeout(function(){
															
															
															$.each($PRODUTOS, function(index,  produto) {

																		var _PRODUTO = produto.PRODUTO;

																	 				if((_PRODUTO.PRO_TIPO == _TIPO) && (_PRODUTO.PRO_TAMANHO == _TAMANHO) && !!~jQuery.inArray(parseInt(_PRODUTO.PRO_GRUPO), GRP)){

																							 			_PRODUTOS.push(_PRODUTO);  
																							
																						}else if(_PRODUTO.PRO_GRUPO != GRP){

																							_PRODUTOS.push(_PRODUTO);  
																						}
																																

																	 })


														
															
															   	
																								
														 /***
															*   @author Erick Eduardo[erick@accon.com.br]
															*   @exemple Caso chegue ao fim do array filter
															**/
										   						iNextCombo = (_PRODUTOS.length == iNextCombo) ? 0 : iNextCombo;
																
																$.each(_PRODUTOS, function(i, getProduto) {
																		
																			if(i == iNextCombo){

																				RESPONSE = getProduto;
																			}	  	
																	})
										   					
																																											
															 /***
																*   @author Erick Eduardo[erick@accon.com.br]
																*   @exemple Montando Produto selecionado
																**/

														
															if(RESPONSE){

															   		var $containerMetade  = $('[data-container="integer-display-product"]');
															   		var $nameProduct      = $containerMetade.find('h4.nomargin');
															   		var $valueProduct  	  = $containerMetade.find('[recept="value-product"]');
															   		var $descProduct	  = $containerMetade.find('[recept="desc-product"]');
															   		var $imgProduct  	  = $('[recept="img-product"]');
															   		var $containerDetails = $('.product-container');
															   		var $labelDetails     = $containerMetade.find('span[data-text="label-details"]');
																		
																		$containerMetade.removeClass('hide');
																	


																    var _PRODUTO = RESPONSE;

																		
																				 $nameProduct.text(_PRODUTO.PRO_DESCRICAO_ECOMMERCE);		
																		   		 $valueProduct.attr('data-value',_PRODUTO.PRO_PRC_VND_DELIVERY);
																		   		 $descProduct.html(_PRODUTO.PRO_RESUMO_ECOMMERCE);	
																		   		 $productCover  = $containerDetails.find('.product .cover');
						                         							     $productCover.css('background-image', 'url(App/views/public/images/produtos/'+_PRODUTO.PRO_IMAGEM_ECOMMERCE+')');
																		   		 $containerDetails.attr('value', _PRODUTO.PRO_ID);
																		   		  // getFracaoProduct(_PRODUTO.PRO_ID);
																		   		  $containerDetails.attr('data-ecf', _PRODUTO.PRO_ECF_ID);
																				  $containerDetails.attr('data-FIM', _PRODUTO.PRO_FILA_IMPRESSAO);
																				  $containerDetails.attr('as', _PRODUTO.PRO_APELIDO);
																				  $containerDetails.attr('data-gpr', _PRODUTO.PRO_GRUPO);
																		   		  setTimeout(function() {
						
																					   $('[data-container="integer-display-product"] [recept="value-product"]').removeClass('hide');							
																		   		  		 $valueProduct.text('R$ ' + number_format((_PRODUTO.PRO_PRC_VND_DELIVERY),2,',','.'));	
																		   		  		 	}, 1000);
 																				renewOptionsProduct(_PRODUTO.PRO_ID);
																			
															   	}else{

															   		console.error('PRODUTO NÃO ENCONTRADO');
															   	}

																

													}, 200);
						}	
		}












 /***
   *   @author Erick Eduardo[erick@accon.com.br]
   *   @access action[button]
   **/
     function setComboCar() {
         
   		   var	
			        			    
   		   		   $containerDetails = $('.product-container')
   		   		,  $productCover     = $containerDetails.find('.product .cover');
         


		          $(document).on('click','button[action="save-combo"]', function(){
		                    
		   		   		 		
			                        setTimeout(function() { 

					                          $productCover.find('i.up,i.down').removeClass('hide'); 
					                              
						                                     
						                              if(controleFracao){ 
						                                  
						                                       $('.product-container').find('button[action="save-combo"]').text('Pedir').attr('disabled', true).removeClass('no-save').addClass('renew-action-combo');
						                                       $('.products li .cover.meia.default div:last-child').css('background-image','url(App/views/public/images/produtos/default_next.jpg)');
						                                       $('#morepanel').addClass('no-show');
						              
						                               }

				                        }, 200);
		                        

		                         		var GPR = $(this).closest('li').attr('data-gpr');
		                         		var _noChange = $(this).hasClass('no-save');
												
													getTiposCombo(GRP);
							     					$('#product div[list="tipos"]').find('[isdefault="S"]').click();
		                                               		
				                      			 	 
                      			 	 /***
										*   @author Erick Eduardo[erick@accon.com.br]
										*   @exemple TRATAMENTO NO OBJETO DE PRODUTOS, CONVERSÃO PARA OBJETO DE ITENS DO COMBO SELECIONADO
										**/	
                      			  			$PRODUTO = getDataProductCombo($containerDetails.attr('value'));

				                      			 
				                        var _FRACAO 	= parseFloat($containerDetails.find(((controleFracao) ? '.size-product-callback .active' : '.size-product .active' )).closest('[data-value]').attr('data-value'));
				                        var _QUANTIDADE = $('#qnt').find('big').html();
				                        var _TOTAL      = $PRODUTO.PRO_PRC_VND_DELIVERY;
				                        var isFirst 	= null;

				                        var _UNITARIO 	 = _TOTAL;
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
		                    
							            	 var
					                         		 _COMBO_CAR = __GETLocalStorage('COMBO_CAR'),
					                         		 _SETTING 	= __GETLocalStorage('SETTING_COMB');
		                                
		                                    	

   
		                                      var controle = true;
		                                 
				                                   


		                                      	if(_noChange){
						                                      
						                                         _COMBO_CAR.PRODUTOS.forEach(function(getItem, index) {

								                                           if(PRODUTO.FRACAO == 0.5 && getItem.ID_FRACAO == "check"  && getItem.FIRST == "N"){

								                                                      _COMBO_CAR.PRODUTOS.splice(parseInt(index+1), 0, PRODUTO);
								                                                      controle = false;
						                                                } 
						                                            })
				                                 				   


							                                            if(controle){  
							                                            	
								                                            	_COMBO_CAR.PRODUTOS.push(PRODUTO); 
							                                            		__SETLocalStorage('COMBO_CAR',_COMBO_CAR);
							                                            		 __addPedido(car);
							                                            }   
				                                 				   		 
							                                             
							                                          
				                           
		                                      	}else{

						                                     	 
						                                     	  _COMBO_CAR.PRODUTOS.push(PRODUTO);
						                                     	  _SETTING.ITEM++;

						                                     	 		__SETLocalStorage('COMBO_CAR',_COMBO_CAR);
						                                     	 		__SETLocalStorage('SETTING_COMB',_SETTING);

						                                     	 		 setDataCombo(_COMBO_CAR.COMBO.CMB_ID);
						                                         
				   		   		  									$('[data-action="next-product-combo"]').click();

						                                        		if(getInCombo(_COMBO_CAR.COMBO.CMB_ID).ITENS.length == _SETTING.ITEM-1){

						                                        	
						                                        				 if(controle){  
						                                        			 				 _COMBO_CAR.PRODUTOS.forEach(function(data, index){

						                                        			 		 		if(index == 0){ data.COMBO_FIRST = _COMBO_CAR.COMBO.CMB_ID};
						                                        			 				if(_COMBO_CAR.PRODUTOS.length == index+1){  data.COMBO_LAST = true; } 

				                                        			 		 						data.IS_COMBO 	= _COMBO_CAR.COMBO.CMB_ID;
				                                        			 		 						data.COMBO_DESC = _COMBO_CAR.COMBO.CMB_DESCRICAO_ECOMMERCE;
				                                        			 		 						data.PK 	    = PKCombo;
				                                        			 								car.push(data); 
				                                        			 								localStorage.removeItem('SETTING_COMB');
				                                        			 								localStorage.removeItem('COMBO_CAR');
																					   				$('.product-container').find('button[action="save-combo"]').attr('action','save').text('Pedir');

						                                        			 		 })		

						                                        			 			PKCombo++;	 
						                                        			 	 }   




		                                               		  __addPedido(car);
		                                          			  listCarBadge((controleFracao) ? false : true );

		                                        		};	
		                                      		
		                                      	}

													
														 /***
															*   @author Erick Eduardo[erick@accon.com.br]
															*   @exemple CONTADOR DO SCROLLING DE PRODUTOS DO COMBO
															**/
		                                        				iNextCombo = 0;
		                                        				
   														  

		                                         
		                                        

		              })
  }






function getDataProductCombo(ID){

						var  $containerView   = $('.product-container');
						var iCombo 			= $containerView.attr('data-combo');
						var _PRODUTOS  = createProductCombo(iCombo);
						var RESPONSE = '';
					
						   $.each(_PRODUTOS, function(i, getProduto) {
									
									getProduto = getProduto.PRODUTO;

									 if(getProduto.PRO_ID == ID){
												
												RESPONSE = getProduto;
											
										}
							})

						   	return RESPONSE;

}









function halfProductCombo(){


    $(document).on('click', '.product-container .size-product .col', function(event) {
              
           if(__GETLocalStorage('CTRL_PROMO')){
                       
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
                     var textButton 	  = $('.product-container').find('button[action="save-combo"]').text();

					 var _SETTING 	  		  = __GETLocalStorage('SETTING_COMB');

 										 


                            if(HALF){
                                   
                                    $('[data-container="integer-display-product"]').find('h4').html('1/2 '+_DESCRICAO);
                                    $('.product-container').find('button[action="save-combo"]').addClass('no-save').text('Escolher 2º metade');
                                    $productCover.addClass('meia default');
                                    $productCover.find('div').removeClass('hide');
                                    $productCover.find('i.up,i.down').addClass('hide');
                                   
                                    if(!controleFracao){ $productCover.find('div:last').css('background-image', '');}
                                    $PRODUTO.html('R$ '+number_format(VALOR_PRODUTO * 0.5, 2, ',','.')); 
                                    $QUANTIDADE.find('button').attr('disabled', true);
                                    $QUANTIDADE.find('big').html('1');
                                    $PRODUTO.addClass('half');
			                        $('#select').addClass('hide');
			                        

                                   
                            }else{
                             
                                    if(_SETTING){

                                    	$('.product-container').find('button[action]').text('Escolha o '+(_SETTING.ITEM)+'º item').removeClass('no-save');
                                    }
                                   
                                    $productCover.removeClass('meia');
                                    $('[data-container="integer-display-product"]').find('h4').html(_DESCRICAO.substr(3));
                                    $('.product-container').find('button[action="save"]').attr('action','save-combo');
                                    $productCover.find('div:last').css('background-image', backgroundFirst);
                                    $PRODUTO.html('R$ '+number_format(VALOR_PRODUTO, 2, ',','.')); 
                                    $QUANTIDADE.find('button').attr('disabled', false);
                                    $PRODUTO.removeClass('half');
			                        $('#select').removeClass('hide');
			               
                                  
                                 }
                                    getOptionsDetailsProduct('ADD');

             }
        })

}













 /***
	*   @author Erick Eduardo[erick@accon.com.br]
	*   @exemple Percorre array um a um, de forma gradual
	*   @param  ARRAY      
	*   @return object
	**/
			var iStepCombo = 0;
			
			function setStepCombo(){

						$(document).on('click','.products .product .icon',function(){

								 ( $(this).hasClass('down') ? iStepCombo++ : (iStepCombo <= 0) ? null : iStepCombo-- );
								
								    if(__GETLocalStorage('CTRL_PROMO')){ stepByStepCombo(); }
							})
			}
				   			


			function stepByStepCombo(){

								if(__GETLocalStorage('CTRL_PROMO') && !controleFracao){
										
											var 
									   			
									   			  $containerDetails = $('.product-container')
									   			, _COMBO			= $containerDetails.attr('data-combo')			
												, _PRODUTOSCOMBO    = createProductCombo(_COMBO);

								 					$('[data-container="half-display-product"] [list="options-remove-product"]').html('');
										              $('.product-container').find('button[action="save-combo"]').attr('disabled', false);

							
									var $PRODUTOS = createProductCombo(_COMBO);
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
								   						iStepCombo = (_PRODUTOS.length == iStepCombo) ? 0 : iStepCombo;

											   			$.each(_PRODUTOS, function(i, getProduto) {
																
																	if(i == iStepCombo){

																		RESPONSE = getProduto;
																	}	  	
															})
								   					
																						
													 /***
														*   @author Erick Eduardo[erick@accon.com.br]
														*   @exemple Montando Produto selecionado
														**/

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
																		 
																		 

											}, 200);
		   				}

			}





function renewInterfaceProduct(){

				$(document).on('click','.renew-action-combo',function(){

								var $boxDetails  = $('.product-container');	
									$boxDetails.find('.alert').addClass('hide');
									$('.pizzametade').addClass('hide');
									$boxDetails.find('div[list="callback-tamanho"]').attr('list', 'tamanho-product');
									$boxDetails.find('div[list="callback-tipo"]').attr('list', 'tipos');
									$boxDetails.find('.size-product-callback').addClass('size-product');
									$boxDetails.find('.size-product').removeClass('size-product-callback');
			                        $('.size-product div:last.col').click();
									$('[data-container="half-display-product"]').addClass('hide');
									$('[data-container="integer-display-product"]').removeClass('hide');
			                        $('#select').removeClass('hide');
									$boxDetails.find('.product .cover').removeClass('meia');
									$('[data-action="next-product-combo"]').click();
							})


				$('#product #exit').on('click', function(){
    						
    					  localStorage.removeItem('SETTING_COMB');
				          localStorage.removeItem('COMBO_CAR');
				
				});


}









 /***
	*   @author Erick Eduardo[erick@accon.com.br]
	*   @exemple Verificação de disponibilidade de Tipos e Tamanhos.
	*            Checagem de estoque disponível	
	*
	**/

				function checkInProductCombo(DATA){

				
				
					setTimeout(function() {

						var 
					   			  $containerDetails = $('.product-container')
					   			, _COMBO			= $containerDetails.attr('data-combo')			
								, _PRODUTOS   		= createProductCombo(_COMBO)
								, _RETURN  			= false;
						
								
						
												
											   $.each(_PRODUTOS, function(i, getProduto) {
											
														getProduto = getProduto.PRODUTO;

															
															if(getProduto.PRO_APELIDO == DATA.APELIDO && getProduto.PRO_TIPO == DATA.ID){

																		_RETURN = true;
															}
												})
											
														
											
												return _RETURN;						
					
							}, 500);
										
				}




function setComboBanner(){
	
	$(document).on('click','[list="banner-promo"] [data-cmb]',function(){

				var combo = $(this).attr('data-cmb');

				$('[list="Combos"] li[data-cmb="'+combo+'"]').find('[action-details="combo"]').click();
				
	})
}


$(window).resize(function(){
	slideValues()
});

var n = 1;
var max = $('[list="banner-promo"] article').size();
var width = $(document).width() + 0;

function slideValues(){
	n = 1;
	max = $('[list="banner-promo"] article').size();
	width = $(document).width() + 0;
	$('#promocoes .row').css('width', 'calc(115% * ' + $('[list="banner-promo"] article').size() + ')');
	$('#promocoes .row .slide').css('width', $(document).width());
	
}
function slidePromo(){
		$('#promocoes .row .slide').css('opacity', 1);
		
		var slider = window.setInterval(function(){
			if(n >= 1 && n < max){
				$('#promocoes .row').animate({
					left : '-' + width * n + 'px'
				}, 300);
				n++
			} else {
				$('#promocoes .row').animate({
					left : '0px'
				}, 300);
				n = 1
			}
			$('#promocoes .bullets li').removeClass('active');
			$('#promocoes .bullets li[data-dir="' + n + '"]').addClass('active');
		}, 5000);
		
		
		for (var i = 1; i <= max; i++) {
			$('#promocoes .bullets').append('<li class="glide__bullet" data-dir="' + i + '"></li>');
		};
		$('#promocoes .bullets li[data-dir="1"]').addClass('active');

		$('#promocoes .bullets').on('click', 'li', function(){
			var ne = $(this).attr('data-dir') - 1;
			clearInterval(slider);
			$('#promocoes .row').animate({
				left : '-' + width * ne + 'px'
			}, 300);
			$('#promocoes .bullets li').removeClass('active');
			$('#promocoes .bullets li[data-dir="' + $(this).attr('data-dir') + '"]').addClass('active');
		})
		
}






function renewOptionsProduct(PRO_ID){

		var $boxAdicionais  = $('span[list="adicionais"]');
		var $boxRetirados   = $('span[list="retirados"]');	
		var _DETAILS =  getOptionsProduct(PRO_ID);	
	 	if(_DETAILS){

			$boxAdicionais.html(_DETAILS.ADICIONAIS);	
   			$boxRetirados.html(_DETAILS.RETIRADAS);	
													 

	 	}
}