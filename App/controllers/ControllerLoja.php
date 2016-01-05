<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon
* @access public
* @package Controller - MVC
* @example Classe de Controle de LOJA
*/

include_once (PATH_MODELS."dao/DaoLoja.php");
include_once (PATH_MODELS."entities/EntitieLoja.php");

class ControllerLoja extends DaoLoja {

	public function _SET(array $DATA){


								switch ($DATA['POST']['METHOD']):
											
											case 'POST':
														#CODE...
												break;
											
											

											case 'GET':
													
												
													$LOJA = new EntitieLoja;
													$LOJA->setSERVICE(array( 'NAME'       => $DATA['POST']['SERVICE'],
													                         'OPERATION'  => $DATA['POST']['OPERATION'],
											                        		 'BASE' 	  => $DATA['POST']['ATENDENTE'][0]['LOJA']['REST_DATABASE']));
 
													$LOJA->setENTITIE(array('REST_ID'     => null,
																		    'REST_NOME'   => null,
																		    'REST_ECOMMERCE_NOME'  		 => null,
																		    'REST_ECOMMERCE_ATIVIDADES'  => null,
																		    'REST_DATABASE'   	   		 => null,
																		    'REST_CEP' 		  	   		 => null,
																		    'REST_LOGRADOURO' 	   		 => null,
																		    'REST_BAIRRO' 	  	   		 => null,
																		    'REST_UF'	 	       	 	 => null,
																		    'REST_TELEFONE'        		 => null,
																		    'REST_ECOMMERCE_LAT'   		 => null,
																		    'REST_ECOMMERCE_LONG'  		 => null,
																		    'REST_CIDADE_NOME'     		 => null,
																			'REST_ECOMMERCE_WEB_HORARIO_INI1'  => null,
																			'REST_ECOMMERCE_WEB_HORARIO_FIM1'  => null,
																			'REST_ECOMMERCE_TOGO_HORARIO_INI1' => null,
																			'REST_ECOMMERCE_TOGO_HORARIO_FIM1' => null,
																			'REST_ECOMMERCE_WEB_HORARIO_INI2'  => null,
																			'REST_ECOMMERCE_WEB_HORARIO_FIM2'  => null,
																			'REST_ECOMMERCE_TOGO_HORARIO_INI2' => null,
																			'REST_ECOMMERCE_TOGO_HORARIO_FIM2' => null,
																			'REST_ECOMMERCE_TEMPO_TOGO' 	   => null,
																			'REST_ECOMMERCE_TEMPO_DELIVERY'    => null
																			));
													
														return parent::_GET($LOJA);				
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