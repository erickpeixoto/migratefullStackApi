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


abstract class DaoFormaPgtoPedido extends ControllerHelper{


/**
 * PERSISTÊNCIA DA ENTIDADE, CEP.
 *
 * @param ENTIDADE DE FORMA DE PAGAMENTO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */

  public final function _POST(EntitieFormaPgtoPedido $PGTO){

            $SERVICE = $PGTO->getSERVICE();
            $ENTITIE = $PGTO->getENTITIE();
            $RESPONSE = false;
            $PDO   = $SERVICE['CONNECTION'];      
                     
              switch ($SERVICE['OPERATION']):
                     
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'INSERIR':
                       
                                       $RESPONSE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->createData(array('tabelas' => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                   'colunas'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                   'valores'  => parent::setIntToArray($ENTITIE['ATTRIBUTES']),
                                                                                                                                   'PDO'      => $PDO));
                                       return ($RESPONSE) ? $ENTITIE['ATTRIBUTES'] : false;
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
  public final function _GET(EntitieFormaPgtoPedido $PGTO){
   
            # code...
                                         
      }




/**
 * PERSISTÊNCIA DA ENTIDADE, CEP.
 *
 * @param ENTIDADE DE CEP
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
      public final function _PUT(EntitieFormaPgtoPedido $PGTO){
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
    public final function _DELETE(EntitieFormaPgtoPedido $PGTO){
     
                   // #CODE
      }




} // CLASS END
