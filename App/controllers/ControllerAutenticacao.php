	
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
	
	include_once (PATH_MODELS."dao/DaoAutenticacao.php");
	include_once (PATH_MODELS."entities/EntitieUser.php");


class ControllerAutenticacao extends DaoAutenticacao {




	function _set(array $DATA){
				
				$USER = new EntitieUser;
				$USER->setSERVICE(array('NOME' => 'AUTENTICACAO'));
				
				$USER->setPOST(array('ACCESS_LOG' => $DATA['POST']['INPUT-ACCESS-LOG'],
									 'ACCESS_PWD' => $DATA['POST']['INPUT-ACCESS-PWD']));
				$USER->setENTITIE(array(0 => 'ID',
				                        1 => 'ID_EMPRESA',
				                        2 => 'NOME',
				                        3 => 'LOG', 
				                        4 => 'PWD',   
				                        5 => 'EMAIL'));
				
				return $this->_setDao($USER);

			}




	function responseLogin(array $DATA){
		

			if($DATA['ERROR'] == "ERROR_LOGIN"):
					echo '<div class="alert alert-error pull-right msg-error-login">
							<button type="button" class="close" data-dismiss="alert">×</button>
							<strong>Atenção!</strong>
							Os dados fornecidos não foram encontrados, verifique!
						 </div>';
				endif;
	}

	
}  // END CLASS