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


include_once (PATH_MODELS."dao/DaoFormaPagamento.php");
include_once (PATH_MODELS."entities/EntitieFormaPagamento.php");


class ControllerFormaPagamento extends DaoFormaPagamento {



	public function _SET(array $DATA){
								


					switch ($DATA['POST']['METHOD']):
								
								case 'POST':
											#CODE...
									break;
								
								case 'GET':
							
										$PGTO = new EntitieFormaPagamento;
										$PGTO->setSERVICE(array( 'NAME'       => $DATA['POST']['SERVICE'],
										                         'OPERATION'  => $DATA['POST']['OPERATION'],
										                         'POST'       => $DATA['POST']['DATA']));

												$PGTO->setENTITIE(array('FPG_ID'  => null,
																	    'FPG_DESCRICAO'   => null,
																	    'FPG_SIGLA'		  => null,
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