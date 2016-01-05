<?php
/**
* Classe Camada de Modelo - MVC
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015.
* @access public
* @package Models - MVC
* @example Classe de Modelo de Persistência.
*/

// IMPORTS
include_once (PATH_MODELS."/interfaces/InterfaceView.php");
abstract class DaoView implements InterfaceView {


/**
* MÉTODO CRUD - OPERAÇÃO CREATE.
*
* @return BOOLEAN
*/
public function renderViewDao(EntitieView $VIEW){

		try {
				$DATA = $VIEW->getPOST();
		
				  /**
				   * Verificação de tipo, unidade de controle através de
				   * métodos acessores
				   *
				   * @example GET / SET
				   *
				   */
				   if(file_exists($RESPONSE = PATH_VIEWS.'View'.$DATA['VIEW'].".phtml")):
				   				$_SESSION['ERROR'] = ($DATA['ACTION'] == "ERROR_LOGIN") ? 'ERROR_LOGIN' : null;
								include_once ($RESPONSE);
					// elseif(is_null($DATA['VIEW']) AND !isset($_SESSION['AUTENTIC'])):
								// include_once (PATH_VIEWS.'ViewLogin.phtml');
						 else:
								include_once (PATH_VIEWS.'ViewIndex.phtml');
					endif;
		} catch (Exception $error) {
					echo "Falha no carregamento da View -- ERRO: ".$error->getMessage();
		}
}


/**
* MÉTODO CRUD - OPERAÇÃO CREATE.
*
* @return BOOLEAN
*/
public function renderDao(EntitieView $VIEW){

		try {
				$DATA = $VIEW->getPOST();
				  /**
				   * Verificação de tipo, unidade de controle através de
				   * métodos acessores
				   *
				   * @example GET / SET
				   *
				   */
						foreach ($DATA['VIEW'] as $key => $value):
							  	if(file_exists($RESPONSE = PATH_VIEWS.'View'.$value.".phtml")):
			  										
												include ($RESPONSE);
											else:
												include (PATH_VIEWS.'ViewIndex.phtml');
										endif;
						endforeach;
				   
		} catch (Exception $error) {
					echo "Falha no carregamento da View -- ERRO: ".$error->getMessage();
		}
}



/**
* MÉTODO CRUD - OPERAÇÃO DE INCLUSÃO DE CONTEÚDO
*
* @return BOOLEAN
*/
public function renderContentView(EntitieView $VIEW){

				try {
				$DATA = $VIEW->getPOST();
				  /**
				   * Verificação de tipo, unidade de controle através de
				   * métodos acessores
				   *
				   * @example GET / SET
				   *
				   */
				   if(file_exists($RESPONSE = PATH_VIEWS.'viewContent/View'.$DATA['ACTION'].".phtml")):
								include_once ($RESPONSE);
							else:
								include_once (PATH_VIEWS.'viewContent/ViewDashboard.phtml');
					endif;
		} catch (Exception $error) {
					echo "Falha no carregamento do conteúdo da View -- ERRO: ".$error->getMessage();
		}
}

} // CLASS END
