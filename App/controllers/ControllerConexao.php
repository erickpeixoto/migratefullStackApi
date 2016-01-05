<?php
	/**
	* Classe Camada de Controle - MVC
	*
	* @author Erick Eduardo <erick@accon.com.br>
	* @version 0.1
	* @copyright Accon Software Corporativo © 2012.
	* @access public
	* @package Controller - MVC
	* @example Classe de Controle de Autenticação de usuário.
	*/





// IMPORT
include_once (PATH_MODELS."dao/DaoConexao.php");
include_once (PATH_MODELS."entities/EntitieConexao.php");




	class ControllerConexao extends DaoConexao {


			public function conectarBanco(Array $DATA){
				
					//OBJETO
					$CONEXAO = new EntitieConexao;
					$CONEXAO->setPOST($DATA['DRIVER'],'DRIVER');
					$CONEXAO->setPOST($DATA['HOST'],'HOST');
					$CONEXAO->setPOST($DATA['BASE'],'BASE');
					$CONEXAO->setPOST($DATA['USER'],'USER');
					$CONEXAO->setPOST($DATA['PASSWORD'],'PASSWORD');
					return $this->conectarDao($CONEXAO);
			}



	/**
	* GET CONNECTION 
	*
	*/
	  public function _SET($CONNECTION){
			
			$SETTINGS = $CONNECTION->getCONFIG();
			$CONNECT = $SETTINGS['CONFIG']['CONNECTION'];
  		 
  		    return $this->conectarBanco($CONNECT); 
	 }
	


}//CLASS end(array)
