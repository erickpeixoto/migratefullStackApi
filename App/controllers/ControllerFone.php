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



include_once (PATH_MODELS."dao/DaoFone.php");
include_once (PATH_MODELS."entities/EntitieFone.php");


class ControllerFone extends DaoFone {

	
	public function _SET(array $DATA){
								


					switch ($DATA['METHOD']):
								
								case 'POST':

											
											$FONE = new EntitieFone;
											$FONE->setSERVICE($DATA);
											$FONE->setENTITIE(array('CFO_CLI_ID' => $DATA['ID_CLIENTE'],
																    'CFO_NUMERO' => $DATA ['POST']['CLI_FONE']));
											return parent::_POST($FONE);				
										
									break;
								
								case 'GET':
									
											#CODE...
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