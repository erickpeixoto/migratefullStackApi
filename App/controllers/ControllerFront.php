<?php
	/**
	* Classe Camada de Controle - MVC
	*
	* @author Erick Eduardo Peixoto - erick@accon.com.br
	* @version 0.1
	* @copyright  Accon Software Corporativo © 2015.
	* @access public 
	* @package Controller - MVC
	* @example Classe de Controle de Utilidade.
	*/	
						
	abstract class ControllerFront{		

		// IMPORT/CREATE
		  public function makeObj($path, $elemen){
					include_once($path.$elemen.'.php');
				
					return new $elemen;
		}
		// TRATAMENTO DE DATAS
		public function setData($data){
			$response = explode("/", $data);
			return $response[2]."-".$response[1]."-".$response[0];
		}
		// TRATAMENTO DE DATAS
		public function getData($data){
			$response = explode("-", $data);
	
			return $response[2]."/".$response[1]."/".$response[0];
		}
		// INCLUDES
		public function getInclude($elemen){
			include_once(PATH_PUBLIC.$elemen.'.php');
		}
		// CONSTANTES
		public function getConstantes(){
				// CONSTANTES
				 define(PATH_CONTROLLER, "App/controllers/");
				 define(PATH_MODELS, "App/models/");
				 define(PATH_PUBLIC, "App/views/public/");
				 define(PATH_AMBIENTE, "");
				 define(PATH_VIEWS,"App/views/");
				 define(SET_TITLE,"SGA v1.0");
				 header('Access-Control-Allow-Origin: *'); // HABILITA CONTROLE DE ORIGEM DE REQUISICAO
		}
		// CONSTANTES
		public function open($FILE){
				
				return file_get_contents($FILE);
		}
}//END CLASS
