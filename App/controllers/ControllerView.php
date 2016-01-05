<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erickeduardo@systemroot.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015.
* @access public
* @package Controller - MVC
* @example Classe de Controle de Visualização
*/

include_once (PATH_MODELS."dao/DaoView.php");
include_once (PATH_MODELS."entities/EntitieView.php");



class ControllerView extends DaoView {


	function render(array $DATA){
			$VIEW = new EntitieView;
			$VIEW->setPOST($DATA[0],'VIEW');
			$VIEW->setPOST($DATA[1],'ACTION');
			
			return $this->renderViewDao($VIEW);
	}


	function _set(array $DATA){
			$VIEW = new EntitieView;
			$VIEW->setPOST($DATA);
			
		
			return $this->renderDao($VIEW);
	}
	
	function renderContent(array $DATA){
			$VIEW = new EntitieView;
			$VIEW->setPOST($DATA[0],'VIEW');
			$VIEW->setPOST($DATA[1],'ACTION');
			
			return $this->renderContentView($VIEW);
	}
	
	function redirectView(array $DATA){
        	
        	return header('Location: '.$DATA['URL'].$DATA['VIEW']);
	}

	
}  // END CLASS