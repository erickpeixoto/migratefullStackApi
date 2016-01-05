<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon
* @access public
* @package Controller - MVC
* @example Classe de Configurações
*
*/


include_once (PATH_MODELS."entities/EntitieConfig.php");


class ControllerConfig {


	public function setConfig($DATA){
					$CONFIG = new EntitieConfig;
					$CONFIG->setCONFIG(json_decode($DATA, true));
					$PATH_URL = $CONFIG->getCONFIG();
				 	define(PATH_URL, $PATH_URL['CONFIG']['URL']);
					return $CONFIG;
		 }
		 
		 
}  // END CLASS