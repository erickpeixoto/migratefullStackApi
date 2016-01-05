<?php


/**
* Classe Camada de Modelo de Entidaddade- MVC
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object [Objeto de Acesso Direto].
*/


abstract class DaoFone extends ControllerHelper{


/**
 * PERSISTÊNCIA DA ENTIDADE DE TELEFONE.
 *
 * @param ENTIDADE DE FORMA DE PAGAMENTO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */

  public final function _POST(EntitieFone $PGTO){

            $SERVICE = $PGTO->getSERVICE();
            $ENTITIE = $PGTO->getENTITIE();
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
 * PERSISTÊNCIA DA ENTIDADE DE TELEFONE.
 *
 * @param ENTIDADE DE TELEFONE
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public final function _GET(EntitieFone $PGTO){
   
            # code...
                                         
      }




/**
 * PERSISTÊNCIA DA ENTIDADE DE TELEFONE.
 *
 * @param ENTIDADE DE TELEFONE
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
      public final function _PUT(EntitieFone $PGTO){
                    // #CODE
   
      }




/**
 * PERSISTÊNCIA DA ENTIDADE DE TELEFONE.
 *
 * @param ENTIDADE DE TELEFONE
 * @access public
 * @return BOOLEAN/INTEGER  [SQL DROP]
 *
 */
    public final function _DELETE(EntitieFormaPgtoPedido $PGTO){
     
                   // #CODE
      }




} // CLASS END
