	
<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erickeduardo@systemroot.com.br>
* @version 1.0
* @copyright  Accon Software Corporativo © 2015.
* @access public
* @package Controller - MVC
* @example Classe de Controle de Autenticação
*/


	
	include_once (PATH_MODELS."dao/DaoUsuario.php");
	include_once (PATH_MODELS."entities/EntitieUsuario.php");




class ControllerUsuario extends DaoUsuario {

			
			public function _SET(array $DATA){
				  
					  switch ($DATA['POST']['METHOD']):

							case 'POST':  

							
										$USUARIO  = new EntitieUsuario;
									    $SETTINGS = $DATA['CONFIG']->getCONFIG();
										$HELPER   = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerHelper");
										$POST     = $HELPER->parsePost($DATA['POST']['DATA']);
										$PWD      = self::setHashingUser(array('HASHING' => $SETTINGS['CONFIG']['HASHINGSALT'], 'SALT' => $SETTINGS['CONFIG']['SALTUNIQUE'],'PWD' => $POST['pwd']));
										$BASE 	  = $DATA['POST']['REST'][0]['LOJA']['REST_DATABASE'];

										$POST['email'] = strtolower($POST['email']);

										$USUARIO->setSERVICE(array( 'METHOD'      => $DATA['POST']['METHOD'],
																	'SERVICE'     => $DATA['POST']['SERVICE'],
																	'NAME'        => $DATA['POST']['SERVICE'],
																	'OPERATION'   => $DATA['POST']['OPERATION'],
																	'BASE' 		  => (!$BASE) ? $DATA['POST']['REST']['REST_DATABASE'] : $BASE,
																	'TOGO' 		  => $DATA['POST']['REST']));
		   														   
										$USUARIO->setENTITIE(array('CLI_NOME'    => $POST['nome'],
															       'CLI_LOGIN'	 => $POST['email'],
															       'CLI_FONE'	 => $POST['fone'],
															       'CLI_PASSWD'	 => $PWD,
															       'CLI_CPF_CGC' => $POST['cpf-cnpj'],
					                                      	       'CLI_DATA_CADASTRO'  => date('Y-m-d H:m:i'),
														           'CLI_EMAIL'   => $POST['email'],
														           'CLI_LAST_IP' => $HELPER->get_client_ip(),
														           'CLI_CANAL_ECOMMERCE' => ($DATA['POST']['OPERATION'] == "INSERIR_TOGO") ? 'TGO' : 'WEB'));

											return parent::_POST($USUARIO);				
								break;
								
							
								
								


								case 'GET':
											$USUARIO = new EntitieUsuario;
											$HELPER   = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerHelper");
											$SETTINGS = $DATA['CONFIG']->getCONFIG();
											$POST     = $HELPER->parsePost($DATA['POST']['ACCESS']);
										
											$PWD   = self::setHashingUser(array('HASHING' => $SETTINGS['CONFIG']['HASHINGSALT'], 'SALT' => $SETTINGS['CONFIG']['SALTUNIQUE'],'PWD' => $POST['pwd']));
										
										
											$USUARIO->setSERVICE(array( 'METHOD'      => $DATA['POST']['METHOD'],
																	    'SERVICE'     => $DATA['POST']['SERVICE'],
																		'OPERATION'   => $DATA['POST']['OPERATION'],
																	    'BASE' 		  => $DATA['POST']['REST'],
																	    'PWD'         => $PWD));

											$USUARIO->setENTITIE(array('CLIENTE.CLI_ID'       => null,
                                                                       'CLIENTE.CLI_NOME'     => null,
                                                                       'CLIENTE.CLI_FONE'	  => null,
                                                                       'CLIENTE.CLI_CPF_CGC'  		  => null,
                                                                       'CLIENTE.CLI_LOGIN'    		  => $POST['e-mail'],
                                                                       'CLIENTE.CLI_SID'   	 		  => null,
                                                                       'CLIENTE.CLI_CANAL_ECOMMERCE'  => null,
                                                                       'ADDRESS.CDA_ID' 		 => null,
																	   'ADDRESS.CDA_CLI_ID'	     => null,
																	   'ADDRESS.CDA_LOGRADOURO'  => null,
																       'ADDRESS.CDA_APELIDO'	 => null,
																       'ADDRESS.CDA_CEP'		 => null,
																       'ADDRESS.CDA_TIPO'		 => null,
																       'ADDRESS.CDA_COMPLEMENTO' => null,
						                                      	       'ADDRESS.CDA_NUMERO'      => null,
															           'ADDRESS.CDA_CIDADE'      => null,
															           'ADDRESS.CDA_BAIRRO'      => null,
															           'ADDRESS.CDA_UF'  		 => null,
															           'ADDRESS.CDA_PAIS'  		 => null,
															           'ADDRESS.CDA_REFERENCIA'  => null,
															           'ADDRESS.CDA_APTO_SALA'   => null,
															           'ADDRESS.CDA_OBSERVACAO'  => null));
													
													return parent::_GET($USUARIO);				
									break;
								
							



								case 'PUT':
										
											switch ($DATA['POST']['OPERATION']) {
												
												case 'TOKEN':	

															$USUARIO  = new EntitieUsuario;
															$USUARIO->setSERVICE(array( 'METHOD'      =>  $DATA['POST']['METHOD'],
																						'SERVICE'     =>  $DATA['POST']['SERVICE'],
																					    'OPERATION'   =>  $DATA['POST']['OPERATION'],
																						'BASE' 		  =>  $DATA['POST']['DATA']['USER']['LOJA']['REST_DATABASE'],
																						'TOKEN' 	  =>  $DATA['POST']['DATA']['TOKEN'],
																						'WHERE' 	  =>  $DATA['POST']['DATA']['USER']['USER']['CLI_ID']));
							   														   
															$USUARIO->setENTITIE($ENTITIE);
															return parent::_PUT($USUARIO);			

													break;
												
												default:
													
															$USUARIO  = new EntitieUsuario;
														    $SETTINGS = $DATA['CONFIG']->getCONFIG();
															$HELPER   = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerHelper");
															$POST     = $HELPER->parsePost($DATA['POST']['DATA']);
															$PWD      = self::setHashingUser(array('HASHING' => $SETTINGS['CONFIG']['HASHINGSALT'], 'SALT' => $SETTINGS['CONFIG']['SALTUNIQUE'],'PWD' => $POST['pwd']));

																$ENTITIE = array('CLI_ID'   	 => $POST['id'],
																				 'CLI_NOME'   	 => $POST['nome'],
																			     'CLI_FONE'	 	 => $POST['fone'],
																			     'CLI_CPF_CGC'	 => $POST['cpf-cnpj'],
									                                      	     'CLI_DATA_CADASTRO'  => date('Y-m-d H:m:i'),
																		         'CLI_LAST_IP'	 => $HELPER->get_client_ip());

														
															if($POST['pwd']){  $ENTITIE['CLI_PASSWD'] = $PWD; }

															$USUARIO->setSERVICE(array( 'METHOD'      =>  $DATA['POST']['METHOD'],
																						'SERVICE'     =>  $DATA['POST']['SERVICE'],
																					    'OPERATION'   =>  $DATA['POST']['OPERATION'],
																						'BASE' 		  => ($DATA['POST']['REST']['REST_DATABASE']) ? $DATA['POST']['REST']['REST_DATABASE'] : $DATA['POST']['REST'][0]['LOJA']['REST_DATABASE'],
																						'WHERE' 	  =>  ($POST['id']) ? $POST['id'] :  $DATA['POST']['USER']['CLI_ID']));
							   														   
															$USUARIO->setENTITIE($ENTITIE);
															return parent::_PUT($USUARIO);	
													break;
											}

											

									break;
								



								case 'DELETE':
									  	    #CODE...
									break;
								
					endswitch;	
	
		}




		private static function setHashingUser($DATA){
						
					  	$hashing = $DATA['HASHING'];
					  	$sha     = sha1($hashing); 
					  	$saltunique = base64_encode($DATA['SALT'].$DATA['PWD']);
					  	$password   = md5($DATA['PWD']);  
					
			     return sha1($sha.$password.$saltunique);

		}



}  // END CLASS