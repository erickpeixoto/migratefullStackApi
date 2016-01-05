<?php


/**
* Classe Camada de Modelo de Entidaddade- MVC
* Entidade de EMPREESAS
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object [Objeto de Acesso Direto].
*/


abstract class DaoCep {


/**
 * PERSISTÊNCIA DA ENTIDADE, CEP.
 *
 * @param ENTIDADE DE CEP
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */

  public final function _POST(EntitieCep $PRODUTO){


  
      }




/**
 * PERSISTÊNCIA DA ENTIDADE, CEP.
 *
 * @param ENTIDADE DE CEP
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public final function _GET(EntitieCep $CEP){
   
          $SERVICE = $CEP->getSERVICE();
          $ENTITIE = $CEP->getENTITIE();
          $HELPER  = ControllerFront::makeObj("App/controllers/", "ControllerHelper");
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
          $RETURN  = Array('BASES' => $SERVICE['POST'], 'CEPS' => array());
      
  
              switch ($SERVICE['OPERATION']):
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ALL
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                             case 'ALL':
                              
          
                                    foreach ($SERVICE['POST'] as $key => $LOJA):
                              
                                                $RETURN['CEPS'][$LOJA['REST_ID']] = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                                                    'tabelas' => array(0 => $LOJA['REST_DATABASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                                                    'where'   => null,
                                                                                                                                                                    'limit'   => null,
                                                                                                                                                                    'PDO'     => $PDO,
                                                                                                                                                                    'COMPLEMENTO' => null));
                                    endforeach;
                                    
                                    return $RETURN['CEPS']; 
                              break;
                                    
           endswitch;
                  
                                         
      }




/**
 * PERSISTÊNCIA DA ENTIDADE, CEP.
 *
 * @param ENTIDADE DE CEP
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
      public final function _PUT(EntitieCep $CEP){
                    // #CODE
   
      }




/**
 * PERSISTÊNCIA DA ENTIDADE, CEP.
 *
 * @param ENTIDADE DE CEP
 * @access public
 * @return BOOLEAN/INTEGER  [SQL DROP]
 *
 */
    public final function _DELETE(EntitieCep $CEP){
     
                   // #CODE
      }




} // CLASS END
