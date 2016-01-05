<?php
/**
* Classe Camada de Modelo de Entidaddade- MVC
* Entidade de usuários
*
* @author Erick Eduardo <erick@accon.com.br>
* @version
* @copyright Accon Software Corporativo © 2013.
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object, em português: Objeto de Acesso Direto.
*/

// IMPORT
include_once ("App/controllers/ControllerCrud.php");

class DaoAutenticacao  {

    /**
     * ATURENTICAÇÃO DE USUÁRIO
     *
     * @param INTEGER
     * @access public
     * @return BOOLEAN
     *
     */

      public function _setDao(EntitieUser $DATA){
                        $SERVICE  = $DATA->getSERVICE();
                        $POST     = $DATA->getPOST();
                        $ENTITIE  = $DATA->getENTITIE();
                        $PDO      = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnectionDefaultController();
                        switch ($SERVICE['NOME']):
                        
                             case 'AUTENTICACAO':
                             
                                             $RESPONSE = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerCrud")->readData(
                                                                               array('campos'  => $ENTITIE['ATRIBUTOS'],
                                                                                     'tabelas' => array(0 => $ENTITIE['NOME']),
                                                                                     'where'   => array('op_comparacao' => array(0 => "=",
                                                                                                                                 1 => "="),
                                                                                     'op_logico'     => array(0 => "AND"),
                                                                                     'campo'         => array(0 => 'LOG',
                                                                                                              1 => 'PWD'),
                                                                                     'valor'         => array(0 => "'".$POST['ACCESS_LOG']."'",
                                                                                                              1 => "'".$POST['ACCESS_PWD']."'")
                                                                                    ),
                                                                                     'limit'  => null,
                                                                                     'PDO' => $PDO));
        
                                      /**
                                       *  VERIFICAÇÃO DE STATUS
                                       *  CRIAÇÃO DE SESSIONS
                                       */
                                          if(count($RESPONSE) == 1):
                                                         $DATA                   = $RESPONSE[0];
                                                         $_SESSION['AUTENTIC']   = true;
                                                         $_SESSION['EMAIL']      = $DATA['EMAIL'];
                                                         $_SESSION['USUARIO']    = $DATA['LOG'];
                                                         $_SESSION['__']         = $DATA['ID'];
                                                         $_SESSION['EMPRESA']    = $DATA['ID_EMPRESA'];
                                                         $_SESSION['NOME']       = $DATA['NOME'];
                                                         $_SESSION['LOG']        = date('H:i');
                                                  else:
                                                         session_destroy();
                                          endif;
                                                  // CHECAGEM DE STATUS
                                                   //$this->checkStatus();
                               break;
                             
                             case 'LOG-OFF':
                                    
                                          session_start();
                                          session_destroy();
                                          header('Location: main.php');
                                          exit();
                               break;
                        endswitch;
     	}
    	  public function checkStatus(){
          	if($_SESSION['AUTENTIC']):
                      ControllerFront::makeObj(PATH_CONTROLLER, "ControllerView")->redirectView(array('URL' => PATH_AMBIENTE,'VIEW' => 'Index/Cadastros/'));
                  else:
                      ControllerFront::makeObj(PATH_CONTROLLER, "ControllerView")->render(array(0 => 'Login',1 => 'ERROR_LOGIN'));
    	     endif;
      }
    } // CLASS END
