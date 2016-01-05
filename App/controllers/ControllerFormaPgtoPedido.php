<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon
* @access public
* @package Controller - MVC
* @example Classe de Controle de Taxa
*/


include_once (PATH_MODELS."dao/DaoFormaPgtoPedido.php");
include_once (PATH_MODELS."entities/EntitieFormaPgtoPedido.php");


class ControllerFormaPgtoPedido extends DaoFormaPgtoPedido {



	public function _SET(array $DATA){
								


					switch ($DATA['METHOD']):
								
								case 'POST':

											$PGTO  = new EntitieFormaPgtoPedido;
											$PGTO->setSERVICE($DATA);
											$PGTO->setENTITIE(array('PPG_PED_ID'  => $DATA['ID_PEDIDO'],
																    'PPG_FPG_ID'  => $DATA['POST']['PGTO'],
																    'PPG_VALOR'   => $DATA['POST']['PED_VLR_PEDIDO'],
																    'PPG_VALOR_PAGO'  => $DATA['POST']['PED_VLR_PEDIDO'],
																    'PPG_SIGLA_PGTO'  => $DATA['POST']['PGTO_SGL'],
																    'PPG_DESCRICAO'   => $DATA['POST']['PED_PGTO_DESC']));

											return parent::_POST($PGTO);				
										
		


									break;
								
								case 'GET':
									
										$PGTO = new EntitieFormaPgtoPedido;
										$PGTO->setSERVICE(array( 'NAME'       => $DATA['POST']['SERVICE'],
										                         'OPERATION'  => $DATA['POST']['OPERATION'],
										                         'POST'       => $DATA['POST']['DATA']));

												$PGTO->setENTITIE(array('FPG_ID'  => null,
																	    'FPG_DESCRICAO'  => null,
																	    'FPG_IMG_ECOMMERCE'  => null,
																	    'FPG_FTI_ID' 	 => null));
												
													return parent::_GET($PGTO);				
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