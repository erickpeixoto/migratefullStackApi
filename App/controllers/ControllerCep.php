<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon
* @access public
* @package Controller - MVC
* @example Classe de Controle de Produtos
*/


include_once (PATH_MODELS."dao/DaoCep.php");
include_once (PATH_MODELS."entities/EntitieCep.php");


class ControllerCep extends DaoCep {



	public function _SET(array $DATA){
								

					switch ($DATA['POST']['METHOD']):
								
								case 'POST':
											#CODE...
									break;
								
								case 'GET':
									
										$CEP = new EntitieCep;
										$CEP->setSERVICE(array( 'NAME'       => $DATA['POST']['SERVICE'],
										                        'OPERATION'  => $DATA['POST']['OPERATION'],
										                        'POST'       => $DATA['POST']['DATA']));

												$CEP->setENTITIE(array('RCA_CEP'   => null,
																	   'RCA_DTA_ID'  => null));
												
													return parent::_GET($CEP);				
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