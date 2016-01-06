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



include_once (PATH_MODELS."dao/DaoProduto.php");
include_once (PATH_MODELS."entities/EntitieProduto.php");


class ControllerProduto extends DaoProduto {

	public function _SET(array $DATA){




								switch ($DATA['POST']['METHOD']):

											case 'POST':
														#CODE...
												break;

											case 'GET':

													$PRODUTO   = new EntitieProduto;
													$SETTINGS  = $DATA['CONFIG']->getCONFIG();
													$PRODUTO->setSERVICE(array( 'NAME'       => $DATA['POST']['SERVICE'],
													                            'OPERATION'  => $DATA['POST']['OPERATION']));

													$PRODUTO->setENTITIE(array('PRO_ID' 	   	    => null,
																			   'PRO_ECF_ID'		    			=> null,
																			   'PRO_FILA_IMPRESSAO'	    => null,
																			   'PRO_APELIDO'  					 => null,
																			   'PRO_APELIDO_ECOMMERCE'   => null,
																			   'PRO_DESCRICAO_ECOMMERCE' => null,
																			   'PRO_RESUMO_ECOMMERCE'    => null,
																			   'PRO_TIPO'          	 	 	 => null,
																			   'PRO_DESCRICAO'         	 => null,
																			   'PRO_DESCRICAO_REDUZIDA'  => null,
																			   'PRO_TAMANHO'  	   		   => null,
																			   'PRO_MENOR_FRACAO'  		   => null,
																			   'PRO_GRUPO'    	 	  		 => null,
																				 'PRO_IMAGEM_ECOMMERCE'		 => null,
																			   'PRO_ECOMMERCE_DEFAULT'	 => null,
																			   'PRO_GRUPO_TOPPING'    	 => null,
																			   'PRO_PRC_VND_DELIVERY' 	 => null));

														return parent::_GET($PRODUTO);
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
