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



include_once (PATH_MODELS."dao/DaoPedido.php");
include_once (PATH_MODELS."entities/EntitiePedido.php");
include_once (PATH_MODELS."entities/EntitieItem.php");
include_once (PATH_MODELS."entities/EntitieUsuario.php");
include_once (PATH_MODELS."entities/EntitieAddress.php");





class ControllerPedido extends DaoPedido {

	public function _SET(array $DATA){
								

								switch ($DATA['POST']['METHOD']):
											
											case 'POST':

											
															$PEDIDO   = new EntitiePedido;
															$USUARIO  = new EntitieUsuario;
															$ADDRESS  = new EntitieAddress;
															$HELPER   = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerHelper");
															$POST     = $DATA['POST']['DATA'];
															$PEDIDOS  = $POST['PEDIDO'];
															$USER = $POST['ACCESS'];
															$LOJA = $POST['ATENDENTE'][0]['LOJA'];
															$CEP  = $POST['ATENDENTE'][0]['CEP'];
															$TOGO = $POST['ATENDENTE'][0]['TOGO'];
											
															$PEDIDO->setSERVICE(array( 'METHOD'      => $DATA['POST']['METHOD'],
																					   'SERVICE'     => $DATA['POST']['SERVICE'],
																					   'NAME'        => $DATA['POST']['SERVICE'],
																					   'OPERATION'   => $DATA['POST']['OPERATION'],
																					   'BASE' 		 => $LOJA['REST_DATABASE'],
																					   'ID_CUPOM'    => $POST['PED_DES_ID_CODIGO'],
																					   'PEDIDO'		 => $PEDIDOS,
																					   'DATA'  		 => $DATA,
																					   'TOGO'        => $TOGO,
																					   'LOJA'        => $LOJA));

							   
															$PEDIDO->setENTITIE(array('PED_STATUS'	=> 'A',
																					  'PED_ID_ENDERECO' => $POST['ADDRESS'], 
																					  'PED_ID_PGTO' => $POST['PGTO'], 
																					  'PED_LOJA'	=> $LOJA['REST_ID'],
																					  'PED_LIG_ID'	=> 0,
																					  'PED_DATA'	=> date('Y-m-d H:m:i'),
																					  'PED_ATE_ID'	=> 0,
																					  'PED_CLI_ID'	=> $USER['CLI_ID'],
																					  'PED_ORIGEM'	=> (($TOGO === "true") ? 'TGO' : 'WEB'),
																					  'PED_QTD_ITENS'	 => $POST['PED_QTD_ITENS'],
																					  'PED_DATA_MOVIMENTO'	 => $POST['PED_DATA_MOVIMENTO'],
																					  'PED_QTD_PRODUTOS' => $POST['PED_QTD_PRODUTOS'],
																					  'PED_VLR_PRODUTOS'   => $POST['PED_VLR_PRODUTOS'],
																					  'PED_VLR_ACRESCIMOS' => $POST['PED_VLR_ACRESCIMOS'],
																					  'PED_TAXA_ENTREGA'   => $POST['PED_TAXA_ENTREGA'],
																					  'PED_PGTO_DESC'	   => $POST['PED_PGTO_DESC'],
																					  'PED_VLR_PEDIDO'	   => $POST['PED_VLR_PEDIDO'],
																					  'PED_VLR_PAGO'	   => $POST['PED_VLR_PAGO'],
																					  'PED_VLR_RECEBIDO'   => ($POST['PED_VLR_RECEBIDO'] == 0) ? $POST['PED_VLR_PEDIDO'] : $POST['PED_VLR_RECEBIDO'],
																					  'PED_VLR_TROCO' 	   => $POST['PED_VLR_TROCO'],
																					  'PED_OBS'	 		   => $POST['PED_OBS'],
																					  'PED_DES_ID'	 	   => $POST['PED_DES_ID'],
																					  'PED_VLR_DESCONTO'   => $POST['PED_VLR_DESCONTO'],
																					  'PED_TEM_BEBIDA'	   => $POST['PED_TEM_BEBIDA'],
																					  'PED_TEM_SOBREMESA'  => $POST['PED_TEM_SOBREMESA'],
																					  'PED_TEM_SOBREMESA'  => $POST['PED_TEM_SOBREMESA'],
																					  'PED_CPF' 		   => $POST['CPF_NOMINAL']));





															$USUARIO->setENTITIE(array('CLI_NOME'    => $USER['CLI_NOME'],
																				       'CLI_LOGIN'	 => $USER['CLI_LOGIN'],
																				       'CLI_FONE'	 => $USER['CLI_FONE'],
																				       'CLI_CPF_CGC' => $USER['CLI_CPF_CGC'],
										     				                           'CLI_DATA_CADASTRO'  => date('Y-m-d H:m:i'),
																			           'CLI_EMAIL'   => $USER['CLI_LOGIN'],
																			           'CLI_LAST_IP' => $HELPER->get_client_ip(),
																			           'CLI_CANAL_ECOMMERCE' => 'ESP' ));

															$ADDRESS->setENTITIE(array('CDA_LOGRADOURO'  => $CEP['CDA_LOGRADOURO'],
																				       'CDA_APELIDO'	 => $CEP['CDA_APELIDO'],
																				       'CDA_CEP'		 => $CEP['CDA_CEP'],
																				       'CDA_COMPLEMENTO' => $CEP['CDA_COMPLEMENTO'],
										                                      	       'CDA_NUMERO'      => $CEP['CDA_NUMERO'],
																			           'CDA_CIDADE'      => $CEP['CDA_CIDADE' ],
																			           'CDA_BAIRRO'      => $CEP['CDA_BAIRRO'],
																			           'CDA_UF'     	 => $CEP['CDA_UF' ],
																			           'CDA_TIPO'     	 => "WEB",
																			           'CDA_PAIS' 		 => 'BR',
																			           'CDA_REFERENCIA'  => $CEP['CDA_REFERENCIA'],
																			           'CDA_APTO_SALA'   => null));
															
														return parent::_POST($PEDIDO, $USUARIO, $ADDRESS);			
										
												break;
											
									
											case 'GET':
												
													$PEDIDO   = new EntitiePedido;
													$ITEM  	  = new EntitieItem;
													$USUARIO  = new EntitieUsuario;
													$ADDRESS  = new EntitieAddress;
													$SETTINGS  = $DATA['CONFIG']->getCONFIG();
													$LOJA 	   = $DATA['POST']['ATENDENTE'][0]['LOJA'];
													$REST 	   = $DATA['POST']['REST'];

													$PEDIDO->setSERVICE(array( 'NAME'        => $DATA['POST']['SERVICE'],
													                           'OPERATION'   => $DATA['POST']['OPERATION'],
													                           'POST' 		 => $DATA['POST']['CLIE'],
													                           'BASE' 		 => $LOJA['REST_DATABASE'],
													                           'REST'        => $REST,
													                           'EntitieItem' => $ITEM));
 
													$PEDIDO->setENTITIE(array('PED_ID'			  => null,
																			  'PED_ID_PGTO'		  => null, 
					  														  'PED_ID_ENDERECO'	  => null,
					  														  'PED_STATUS'		  => null,
					  														  'PED_DATA'		  => null,
					  														  'PED_ORIGEM'		  => null,
					  														  'PED_CLI_ID'		  => null,
					  														  'PED_QTD_PRODUTOS'  => null,
					  														  'PED_TAXA_ENTREGA'  => null,
					  														  'PED_VLR_PEDIDO'	  => null,
					  														  'PED_OBS'	 	   	  => null,
					  														  'PED_VLR_RECEBIDO'  => null,
					  														  'PED_VLR_PEDIDO'	  => null,
					  														  'PED_VLR_TROCO'	  => null,
					  														  'PED_STATUS'	=> null));
													
														return parent::_GET($PEDIDO, $USUARIO, $ADDRESS);				
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