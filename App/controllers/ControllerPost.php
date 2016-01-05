<?php

/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015.
* @access public
* @package Controller - MVC
* @example Classe de Controle de Operação
*/


include_once(PATH_CONTROLLER."ControllerHelper.php");


		class ControllerPost extends ControllerHelper{



			  function _SET(array $DATA){

 										ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->_SET($DATA['CONFIG']);

					switch ($DATA['POST']['SERVICE']):

								case 'USUARIO':
										echo json_encode(ControllerFront::makeObj(PATH_CONTROLLER, "ControllerUsuario")->_set($DATA));
								break;

							 	case 'PRODUTO':
										echo json_encode(ControllerFront::makeObj(PATH_CONTROLLER, "ControllerProduto")->_set($DATA));
								break;

								case 'COMBO':

										echo ControllerFront::makeObj(PATH_CONTROLLER, "ControllerCupom")->_set($DATA);
								break;

								case 'PEDIDO':
										echo json_encode(ControllerFront::makeObj(PATH_CONTROLLER, "ControllerPedido")->_set($DATA));
								break;

								case 'LOJA':
										echo json_encode(ControllerFront::makeObj(PATH_CONTROLLER, "ControllerLoja")->_set($DATA));
								break;

								case 'CEP':
										echo json_encode(ControllerFront::makeObj(PATH_CONTROLLER, "ControllerCep")->_set($DATA));
								break;

								case 'TAXA':
										echo json_encode(ControllerFront::makeObj(PATH_CONTROLLER, "ControllerTaxa")->_set($DATA));
								break;

								case 'ADDRESS':
										echo json_encode(ControllerFront::makeObj(PATH_CONTROLLER, "ControllerAddress")->_set($DATA));
								break;

								case 'FORMA_PAGAMENTO':
										echo json_encode(ControllerFront::makeObj(PATH_CONTROLLER, "ControllerFormaPagamento")->_set($DATA));
								break;

								case 'EMAIL':
										echo json_encode(ControllerFront::makeObj(PATH_CONTROLLER, "ControllerEmail")->_set($DATA));
								break;

					endswitch;
			}

}  // END CLASS
