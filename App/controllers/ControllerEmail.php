<?php



/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright  Accon Software Corporativo © 2015.
* @access public
* @package Controller - MVC
* @example Classe de Controle de E-mail de notificações
*/



include_once (PATH_MODELS."dao/DaoEmail.php");
		
		
		class ControllerEmail extends DaoEmail {
		
					public function _set(array $DATA){
						
								return parent::sendDao($DATA);				
					 }



					 
					 
}  // END CLASS