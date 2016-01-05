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


include_once (PATH_MODELS."dao/DaoTaxa.php");
include_once (PATH_MODELS."entities/EntitieTaxa.php");


class ControllerTaxa extends DaoTaxa {



	public function _SET(array $DATA){
								

					switch ($DATA['POST']['METHOD']):
								
								case 'POST':
											#CODE...
									break;
								
								case 'GET':
									
										$TAXA = new EntitieTaxa;
										$TAXA->setSERVICE(array( 'NAME'       => $DATA['POST']['SERVICE'],
										                        'OPERATION'  => $DATA['POST']['OPERATION'],
										                        'POST'       => $DATA['POST']['DATA']));

												$TAXA->setENTITIE(array('DTA_ID'   => null,
																	   'DTA_VAL'  => null));
												
													return parent::_GET($TAXA);				
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