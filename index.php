<?php
	/**
	* Classe Camada de Controle - MVC
	*
	* @author Erick Eduardo Peixoto - @erick
	* @version 1.0
	* @copyright ACCON SOFTWARE CORPORATIVO © 2015.
	* @access private
	* @package Controller - MVC
	* @example Classe de Controle  - FRONTCONTROLLER
	*
	*/
	/**
	 * Habilitando o escopo de sessão
	 *
	 * @return void
	 * @author @erick
	 **/
		session_start();


	/**
	 * GET - Retorno de constantes
	 *
	 * @return void
	 * @author @erick
	 **/
		ControllerFront::getConstantes();
		$CONFIG = ControllerFront::makeObj("App/controllers/", "ControllerConfig")->setConfig(ControllerFront::open('.connection-app'));


    /**
	 * AUTOLOAD CLASS - Instância e carregamento de classes
	 *
	 * @return void
	 * @author @erick
	 **/
    	function __autoload($class){
			include_once("App/controllers/".$class.".php");
		}


    /**
	 * FRONT CONTROLLER - Controle de tratamento de Serviços Globais
	 *
	 * @return void
	 * @author @erick
	 **/
  	    ($_REQUEST) ? ControllerFront::makeObj(PATH_CONTROLLER, "ControllerPost")->_SET(array('POST' => $_REQUEST,'FILES' => $_FILES, 'CONFIG' => $CONFIG)) : null;


    /**
	 * BACKGROUND CONTROLLER - Controle de tratamento de Serviços para requisições Assíncronas
	 *
	 * @return void
	 * @author @erick
	 **/
		 (!isset($_REQUEST['AJAX'])) ? ControllerFront::makeObj(PATH_CONTROLLER, "ControllerView")->render(explode("/", $_GET['key'], -1), true) : null;
