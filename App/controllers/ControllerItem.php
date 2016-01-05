<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon
* @access public
* @package Controller - MVC
* @example Classe de Controle de Itens
*/



include_once (PATH_MODELS."dao/DaoItem.php");
include_once (PATH_MODELS."entities/EntitieItem.php");


class ControllerItem extends DaoItem {

	public function _SET(array $DATA){
		
				switch ($DATA['METHOD']):
						
						case 'POST':

 								$ITEM  = new EntitieItem;
								$ITEM->setSERVICE($DATA);
								$RESPONSE = array();
						
										foreach ($DATA['PEDIDO'] as $key => $getItem):


											      $ITEM->setENTITIE(array('PIT_PED_ID'	     => $DATA['ID_PEDIDO'],
																		  'PIT_ITEM' 		 => $getItem['PK'], 
																		  'PIT_PROD_ID'		 => $getItem['ID'],
																		  'PIT_DESCRICAO'	 => $getItem['DESCRICAO_REDUZIDA'],
																		  'PIT_QTD'	    	 => ($getItem['FRACAO'] == 0.5) ? $getItem['FRACAO'] : $getItem['QUANTIDADE'],
																		  'PIT_FRACAO'		 => $getItem['FRACAO'],
																		  'PIT_ADICIONADO'	 => parent::setChangeItem($getItem['ADICIONAIS']),
																		  'PIT_RETIRADOS'	 => parent::setChangeItem($getItem['RETIRADAS']),
																		  'PIT_PRC_UNITARIO' => $getItem['UNITARIO'],
																		  'PIT_PRC_FRACAO'	 => $getItem['TOTAL'],
																		  'PIT_PRC_TOTAL'    => ((float) $getItem['TOTAL']),
																		  'PIT_VLR_ADC' 	 => parent::getValorAdd($getItem['ADICIONAIS']),
																		  'PIT_VLR_RET'      => 0,
																		  'PIT_VLR_ICM'	  	 => $getItem['TOTAL'],
																		  'PIT_ECF_IF'	   	 => $getItem['ECF'],
																		  'PIT_CMB_ID'	  	 => 0,
																		  'PIT_DES_ID'  	 => 0,
																		  'fila_impressao' 	 => $getItem['FIM'],
																		  'PIT_CODIGO_DESCONTO'	     => 0,
																		  'PIT_VALOR_DESCONTO'	     => 0,
																		  'PIT_COMBO'	  		     => ($getItem['IS_COMBO']) ? $getItem['IS_COMBO'] : 0,
																		  'PIT_PRODUCAO_FINALIZADO'	 => 'N',
																		  'PIT_ITEM_TEM_COMPLEMENTO' =>  ($getItem['FRACAO'] == 1) ? 'N' : 'S', 
																		  'PIT_ITEM_COMPLEMENTO_ID'  =>  $getItem['ID_FRACAO'],  
																		  'PIT_ITEM_COMPLEMENTO'     =>  $getItem['APELIDO_FRACAO'], 
																		  'PIT_ITEM_COMPLEMENTO_ADICIONADO'  => parent::setChangeItem($getItem['ADICIONAIS']), 
																		  'PIT_ITEM_COMPLEMENTO_RETIRADO'  	 => parent::setChangeItem($getItem['RETIRADAS']), 
																		  'PIT_ITEM_COMPLEMENTO_ID3'  	 	 => 0, 
																		  'PIT_ITEM_COMPLEMENTO3'  			 => 0, 
																		  'PIT_ITEM_COMPLEMENTO_RETIRADO3'   => 0, 
																		  'PIT_ITEM_COMPLEMENTO_ADICIONADO3' => 0, 
																		  'PIT_ITEM_ADCIONAIS_ECOMMERCE'	 => $getItem['SERIAL_ADD'], 
																		  'PIT_ITEM_RETIRADAS_ECOMMERCE' 	 => $getItem['SERIAL_RET'] 
																		  ));
											
													array_push($RESPONSE, parent::_POST($ITEM));	
										endforeach;
					   		
				
						return $RESPONSE;
												

							break;
						
						case 'GET':
							
								$ITEM  = new EntitieItem;
								$ITEM->setSERVICE($DATA);
							
										      $ITEM->setENTITIE(array('PIT_PED_ID'	     => null,
																	  'PIT_ITEM' 		 => null, 
																	  'PIT_PROD_ID'		 => null,
																	  'PIT_PRC_TOTAL'	 => null,
																	  'PIT_COMBO'		 => null,
																	  'PIT_DESCRICAO'	 => null,
																	  'PIT_QTD'	    	 => null,
																	  'PIT_FRACAO'		 => null,
																	  'PIT_ADICIONADO'	 => null,
																	  'PIT_RETIRADOS'	 => null,
																	  'PIT_PRC_UNITARIO' => null,
																	  'PIT_ITEM_ADCIONAIS_ECOMMERCE' => null, 
																	  'PIT_ITEM_RETIRADAS_ECOMMERCE' => null,
																	  'PIT_ITEM_TEM_COMPLEMENTO'     => null  
																	  ));

										     return parent::_GET($ITEM);
											
							break;
						
						case 'PUT':
									#CODE...
							break;
						

						case 'DELETE':
							  	    #CODE...
							break;
						
			endswitch;				
	}



			 
}  // END CLASS