<?php
/**
* Classe Camada de Modelo - MVC
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo � 2015.
* @access public
* @package Models - MVC
* @example Classe de Modelo de Persist�ncia.
*/

// IMPORTS
include_once (PATH_MODELS."/interfaces/InterfaceView.php");
abstract class DaoView implements InterfaceView {


/**
* M�TODO CRUD - OPERA��O CREATE.
*
* @return BOOLEAN
*/
public function renderViewDao(EntitieView $VIEW){

		try {
				$DATA = $VIEW->getPOST();
		
				  /**
				   * Verifica��o de tipo, unidade de controle atrav�s de
				   * m�todos acessores
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
* M�TODO CRUD - OPERA��O CREATE.
*
* @return BOOLEAN
*/
public function renderDao(EntitieView $VIEW){

		try {
				$DATA = $VIEW->getPOST();
				  /**
				   * Verifica��o de tipo, unidade de controle atrav�s de
				   * m�todos acessores
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
* M�TODO CRUD - OPERA��O DE INCLUS�O DE CONTE�DO
*
* @return BOOLEAN
*/
public function renderContentView(EntitieView $VIEW){

				try {
				$DATA = $VIEW->getPOST();
				  /**
				   * Verifica��o de tipo, unidade de controle atrav�s de
				   * m�todos acessores
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
					echo "Falha no carregamento do conte�do da View -- ERRO: ".$error->getMessage();
		}
}

} // CLASS END
