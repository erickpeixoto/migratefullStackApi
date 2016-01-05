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


abstract class DaoTaxa {


/**
 * PERSISTÊNCIA DA ENTIDADE, TAXA.
 *
 * @param ENTIDADE DE TAXA
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */

  public final function _POST(EntitieTaxa $PRODUTO){


  
      }




/**
 * PERSISTÊNCIA DA ENTIDADE, TAXA.
 *
 * @param ENTIDADE DE TAXA
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public final function _GET(EntitieTaxa $TAXA){
   
          $SERVICE = $TAXA->getSERVICE();
          $ENTITIE = $TAXA->getENTITIE();
          $HELPER  = ControllerFront::makeObj("App/controllers/", "ControllerHelper");
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
          $RETURN  = Array('BASES' => $SERVICE['POST'], 'TAXAS' => array());
      

              switch ($SERVICE['OPERATION']):
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ALL
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                             case 'ALL':
                              
          
                                    foreach ($SERVICE['POST'] as $key => $LOJA):
                              
                                                $RETURN['TAXAS'][$LOJA['REST_ID']] = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                                                    'tabelas' => array(0 => $LOJA['REST_DATABASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                                                    'where'   => null,
                                                                                                                                                                    'limit'   => null,
                                                                                                                                                                    'PDO'     => $PDO,
                                                                                                                                                                    'COMPLEMENTO' => null));
                                    endforeach;
                                    
                                    return $RETURN['TAXAS']; 
                              break;
                                    
           endswitch;
                  
                                         
      }




/**
 * PERSISTÊNCIA DA ENTIDADE, TAXA.
 *
 * @param ENTIDADE DE TAXA
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
      public final function _PUT(EntitieTAXA $TAXA){
                    // #CODE
   
      }




/**
 * PERSISTÊNCIA DA ENTIDADE, TAXA.
 *
 * @param ENTIDADE DE TAXA
 * @access public
 * @return BOOLEAN/INTEGER  [SQL DROP]
 *
 */
    public final function _DELETE(EntitieTAXA $TAXA){
     
                   // #CODE
      }




} // CLASS END
