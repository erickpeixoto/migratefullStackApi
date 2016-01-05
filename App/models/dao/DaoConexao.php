<?php
/**
* Classe Camada de Modelo de Entidade- MVC
* Entidade de usuários
*
* @author Accon Software Corporativo © 2015.
* @version 1.0
* @copyright Accon Software Corporativo © 2013.
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object, em português: Objeto de Acesso Direto.
*/


abstract class DaoConexao{


 	public static $instance;
	

	//METODO DE CONEXAO
	public function conectarDao(EntitieConexao $CONEXAO){

		//GET
		$DATA = $CONEXAO->getPOST();
		//CONEXAO
		try {
				if(!isset(self::$instance)):
						self::$instance = new PDO($DATA['DRIVER'].":host=".$DATA['HOST']."; dbname=".$DATA['BASE'],$DATA['USER'],$DATA['PASSWORD']);
					endif;
		} catch (PDOException $erro) {
				echo "Falha na conexao, ERRO: \n".$erro->getMessage();
		}
		return self::$instance;
	}


/**
* GET ALL CONNECTION - DOMINOS
*
*/
	public function getConnection(){
					//CONEXAO
					try {
							if(isset(self::$instance)):
									return self::$instance;
							endif;
					} catch (PDOException $erro) {
									echo "Falha no retorno da conexao, ERRO: \n".$erro->getMessage();
					}
			
		}


		
} // END CLASS
