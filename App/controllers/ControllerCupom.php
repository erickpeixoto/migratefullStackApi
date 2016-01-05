<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon
* @access public
* @package Controller - MVC
* @example Classe de Controle de Promoçōes
*/



include_once (PATH_MODELS."dao/DaoCupom.php");
include_once (PATH_MODELS."entities/EntitieCupom.php");




class ControllerCupom extends DaoCupom {

	public function _SET(array $DATA){
								

								switch ($DATA['POST']['METHOD']):
											
											case 'POST':
														#CODE...
												break;
											
									
											case 'GET':
													
													$CUPOM     = new EntitieCupom;
													$SETTINGS  = $DATA['CONFIG']->getCONFIG();
													$LOJA 	   = $DATA['POST']['ATENDENTE'][0]['LOJA'];
												
													$CUPOM->setSERVICE(array( 'NAME'        => $DATA['POST']['SERVICE'],
													                           'OPERATION'  => $DATA['POST']['OPERATION'],
													                           'CODE' 		=> $DATA['POST']['CODE']));
 
													$CUPOM->setENTITIE(array('DESCONTOS.DES_ID AS ID_DESCONTO'	    		  => null,
																			 'DESCONTOS.DES_DESCRICAO AS DESCRICAO_DESCONTO'  => null, 
																			 'CODIGO.VAL_ID AS ID_CODIGO' 				 	  => null, 
																			 'CODIGO.VAL_VALOR_VOUCHER AS VALOR_DESCONTO'     => null, 
																			 'CODIGO.VAL_CODIGO AS CODIGO' 					  => null, 
																			 'CODIGO.VAL_UTILIZADO AS UTILIZADO' 		  	  => null ));
												
															return parent::_GET($CUPOM);				
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