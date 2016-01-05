<?php
/**
* Classe Camada de Modelo de Entidaddade- MVC
* Entidade de Itens
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object [Objeto de Acesso Direto].
*/



abstract class DaoItem extends ControllerHelper{




/**
 * PERSISTÊNCIA DA ENTIDADE, PEDIDO.
 *
 * @param ENTIDADE DE PEDIDO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public final function _POST(EntitieItem $ITEM){

  

            $SERVICE = $ITEM->getSERVICE();
            $ENTITIE = $ITEM->getENTITIE();
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
 * PERSISTÊNCIA DA ENTIDADE, PEDIDO.
 *
 * @param ENTIDADE DE PEDIDO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public final function _GET(EntitieItem $ITEM){
   
            $SERVICE = $ITEM->getSERVICE();
            $ENTITIE = $ITEM->getENTITIE();
            $PDO   = $SERVICE['CONNECTION'];      
  
              switch ($SERVICE['OPERATION']):
                  
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ALL
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                 
                            case 'ALL':

                                    return ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  =>  array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                           'tabelas'  =>  Array (0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                            'where'   =>  Array('op_comparacao' => Array(0 => "="),
                                                                                                                                               'op_logico'     => null,
                                                                                                                                               'campo'         => Array(0 => 'PIT_PED_ID'),
                                                                                                                                               'valor'         => Array(0 => $SERVICE['ID_PEDIDO'])),
                                                                                                                           'limit'   => null,
                                                                                                                           'PDO'     => $PDO,
                                                                                                                           'COMPLEMENTO' => 'ORDER BY PIT_ITEM ASC'));



                            break;
           endswitch;
      }



/**
 * PERSISTÊNCIA DA ENTIDADE, PEDIDO.
 *
 * @param ENTIDADE DE PEDIDO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
    public final function _PUT(EntitieItem $EMPRESA){
          

          $SERVICE = $EMPRESA->getSERVICE();
          $ENTITIE = $EMPRESA->getENTITIE();
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnectionDefaultController();
 
              switch ($SERVICE['OPERATION']):
                
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - UPDATE
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'ALTERAR':
                
                                      #CODE...                    
                          break;
                endswitch;
      }





    /**
    * PERSISTÊNCIA DA ENTIDADE, PEDIDO.
    *
    * @param ENTIDADE DE PEDIDO
    * @access public
    * @return BOOLEAN/INTEGER  [SQL DROP]
    *
    */

          public final function _DELETE(EntitieItem $EMPRESA){
              
                $SERVICE = $EMPRESA->getSERVICE();
                $ENTITIE = $EMPRESA->getENTITIE();
                $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnectionDefaultController();
            
        
                    switch ($SERVICE['OPERATION']):
                           /**
                             * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                             * @return boolean
                             * @author @___erick
                             *
                             **/
                                  case 'EXCLUIR':
                                         #CODE...
                                break;
                 endswitch;
            }



} // CLASS END
