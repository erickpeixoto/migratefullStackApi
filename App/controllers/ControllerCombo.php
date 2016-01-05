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



include_once (PATH_MODELS."dao/DaoCombo.php");
include_once (PATH_MODELS."entities/EntitieCombo.php");




class ControllerCombo extends DaoCombo {

	public function _SET(array $DATA){


								switch ($DATA['POST']['METHOD']):

											case 'POST':
														#CODE...
												break;


											case 'GET':

													$COMBO     = new EntitieCombo;
													$SETTINGS  = $DATA['CONFIG']->getCONFIG();
													$LOJA 	   = $DATA['POST']['ATENDENTE'][0]['LOJA'];
													$REST 	   = $DATA['POST']['REST'];

													$COMBO->setSERVICE(array( 'NAME'        => $DATA['POST']['SERVICE'],
													                           'OPERATION'  => $DATA['POST']['OPERATION'],
													                           'POST' 		=> $DATA['POST']['CLIE'],
													                           'REST'       => $REST));

													$COMBO->setENTITIE(array('CMB_ID'		  		    => null,
																			 'CMB_DESCRICAO'  			=> null,
																			 'CMB_IMAGEM_ECOMMERCE'  	=> null,
																			 'CMB_DESCRICAO_ECOMMERCE'  => null,
																			 'CMB_SLIDE_ECOMMERCE' 		=> null,
																			 'CMB_REGRAS_ECOMMERCE' 	=> null,
																			 'CMB_DIAS_ECOMMERCE' 		=> null,
																			 'CMB_FRACAO_ECOMMERCE' 	=> null,
					  														 'CMB_PRECO'	 			=> null,
					  														 'CMB_DIAS'		  			=> null));

													$COMBO->setENTITIEAUX(array('CPR_CMD_ID'  => null,
																				'CPR_ITEM'    => null,
						  														'CPR_PRECO'	  => null,
						  														'CPR_PRO_ID'  => null));

																				print_r(parent::_GET($COMBO));
																				return parent::_GET($COMBO);
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
