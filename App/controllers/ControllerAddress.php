<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon
* @access public
* @package Controller - MVC
* @example Classe de Controle de Endereço
*/


include_once (PATH_MODELS."dao/DaoAddress.php");
include_once (PATH_MODELS."entities/EntitieAddress.php");
include_once (PATH_MODELS."entities/EntitieUsuario.php");


class ControllerAddress extends DaoAddress {



	public function _SET(array $DATA){
					
					switch ((!$DATA['POST']['METHOD']) ? $DATA['METHOD'] : $DATA['POST']['METHOD']):



									case 'POST':

									
												$ADDRESS = new EntitieAddress;
												$USUARIO  = new EntitieUsuario;
												$HELPER  = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerHelper");
												$POST 	 = $HELPER->parsePost($DATA['POST']['DATA']);
												$USER 	 = $DATA['POST']['USER'];
												$ADDRESS->setSERVICE(array( 'METHOD'      => (!$DATA['POST']['METHOD']) ? $DATA['METHOD'] : $DATA['POST']['METHOD'],
																			'SERVICE'     => (!$DATA['POST']['SERVICE']) ? $DATA['SERVICE'] : $DATA['POST']['SERVICE'],
																			'NAME'        => (!$DATA['POST']['SERVICE']) ? $DATA['SERVICE'] : $DATA['POST']['SERVICE'],
																			'OPERATION'   => (!$DATA['POST']['OPERATION']) ? $DATA['OPERATION'] : $DATA['POST']['OPERATION'],
																			'BASE' 		  => (!$DATA['POST']['REST'][0]['LOJA']['REST_DATABASE']) ? $DATA['BASE'] : $DATA['POST']['REST'][0]['LOJA']['REST_DATABASE'] ));

												$DATA['ID'] = ($DATA['TOGO']) ? $DATA['ID'] : $DATA['POST']['ID'];
												$DATA['ID'] = (!$DATA['ID'])  ? $DATA['POST']['CDA_CLI_ID'] : $DATA['ID'];

												if($DATA['TOGO'] || $DATA['POST']['AJAX']):	
																
													$CEP = ($POST['cep-address']) ? str_replace("-", "", $POST['cep-address']) : str_replace("-", "", $DATA['TOGO']['REST_CEP']);
														
															$ADDRESS->setENTITIE(array('CDA_CLI_ID'	     => ($DATA['ID']) ? $DATA['ID'] : $DATA['POST']['USER']['CLI_ID'],
																					   'CDA_LOGRADOURO'  => (!$POST['rua-address']) ? $DATA['TOGO']['REST_LOGRADOURO'] : $POST['rua-address'],
																				       'CDA_APELIDO'	 => $POST['apelido-address'],
																				       'CDA_CEP'		 => $CEP,
																				       'CDA_COMPLEMENTO' => $POST['complemento-address'],
										                                      	       'CDA_NUMERO'      => $POST['numero-address'],
																			           'CDA_CIDADE'      => (!$POST['localidade-address']) ? $DATA['TOGO']['REST_CIDADE_NOME'] : $POST['localidade-address'],
																			           'CDA_BAIRRO'      => (!$POST['bairro-address']) ? $DATA['TOGO']['REST_BAIRRO'] : $POST['bairro-address'],
																			           'CDA_UF'     	 => (!$POST['uf-address']) ? $DATA['TOGO']['REST_UF'] : $POST['uf-address'],
																			           'CDA_TIPO'     	 => ($DATA['TOGO']) ? "TGO" : "WEB",
																			           'CDA_PAIS' 		 => 'BR',
																			           'CDA_REFERENCIA'  => $POST['referencia-address'],
																			           'CDA_APTO_SALA'   => null));
												else:
											
														$ADDRESS->setENTITIE($DATA['POST']);
												endif;	


														$USUARIO->setENTITIE(array('CLI_NOME'    => $USER['CLI_NOME'],
																			       'CLI_LOGIN'	 => $USER['CLI_LOGIN'],
																			       'CLI_FONE'	 => $USER['CLI_FONE'],
																			       'CLI_CPF_CGC' => $USER['CLI_CPF_CGC'],
									     				                           'CLI_DATA_CADASTRO'  => date('Y-m-d H:m:i'),
																		           'CLI_EMAIL'   => $USER['CLI_LOGIN'],
																		           'CLI_LAST_IP' => $HELPER->get_client_ip(),
																		           'CLI_CANAL_ECOMMERCE' => 'ESP' ));		

											

													return parent::_POST($ADDRESS, $USUARIO);			



												
	
										break;

								
							
								
								case 'GET':

									
										$ADDRESS = new EntitieAddress;
										$ADDRESS->setSERVICE(array( 'NAME'      =>  $DATA['POST']['SERVICE'],
											                        'OPERATION' => $DATA['POST']['OPERATION'],
											                        'BASE' => $DATA['POST']['REST'][0]['LOJA']['REST_DATABASE']));

										$ADDRESS->setENTITIE(array('CDA_ID' 		 => null,
																   'CDA_CLI_ID'	     => $DATA['POST']['USER'],
																   'CDA_LOGRADOURO'  => null,
															       'CDA_APELIDO'	 => null,
															       'CDA_CEP'		 => null,
															       'CDA_COMPLEMENTO' => null,
					                                      	       'CDA_NUMERO'      => null,
														           'CDA_CIDADE'      => null,
														           'CDA_BAIRRO'      => null,
														           'CDA_UF'  		 => null,
														           'CDA_PAIS'  		 => null,
														           'CDA_REFERENCIA'  => null,
														           'CDA_APTO_SALA'   => null,
														           'CDA_TIPO'	     => null,
														           'CDA_OBSERVACAO'  => null));
							
												return parent::_GET($ADDRESS);				
									break;
							


								case 'PUT':
												
												$ADDRESS = new EntitieAddress;
												$HELPER = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerHelper");
												$POST = $HELPER->parsePost($DATA['POST']['DATA']);
												$ADDRESS->setSERVICE(array( 'METHOD'      => $DATA['POST']['METHOD'],
																			'SERVICE'     => $DATA['POST']['SERVICE'],
																			'NAME'        => $DATA['POST']['SERVICE'],
																			'OPERATION'   => $DATA['POST']['OPERATION'],
																			'BASE' =>$DATA['POST']['REST'][0]['LOJA']['REST_DATABASE']));


												$ADDRESS->setENTITIE(array('CDA_ID'	   		 => $POST['ID'],
																		   'CDA_APELIDO'	 => $POST['apelido-address'],
																	       'CDA_COMPLEMENTO' => $POST['complemento-address'],
							                                      	       'CDA_NUMERO'      => $POST['numero-address'],
																           'CDA_REFERENCIA'  => $POST['referencia-address']));

													return parent::_PUT($ADDRESS);				
									break;
								

								case 'DELETE':
									  	    #CODE...
									break;
								
					endswitch;				
			 }


}  // END class_alias()