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


abstract class DaoFormaPagamento extends ControllerFront{


/**
 * PERSISTÊNCIA DA ENTIDADE, CEP.
 *
 * @param ENTIDADE DE FORMA DE PAGAMENTO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */

  public final function _POST(EntitieFormaPagamento $PGTO){

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
  public final function _GET(EntitieFormaPagamento $PGTO){
   
          $SERVICE = $PGTO->getSERVICE();
          $ENTITIE = $PGTO->getENTITIE();
          $HELPER  = ControllerFront::makeObj("App/controllers/", "ControllerHelper");
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
          $RETURN  = Array('BASES' => $SERVICE['POST'], 'PGTO' => array());
      
  
              switch ($SERVICE['OPERATION']):
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ALL
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                             case 'ALL':
                              
          
                                    foreach ($SERVICE['POST'] as $key => $LOJA):
                                                

                                                $PGTO = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                           'tabelas' => array(0 => $LOJA['REST_DATABASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                           'where'   => array('op_comparacao' => Array(0 => "="),
                                                                                                                                                              'op_logico'     => null,
                                                                                                                                                              'campo'         => Array(0 => 'FPG_ATIVO'),
                                                                                                                                                              'valor'         => Array(0 =>  "'S'")),
                                                                                                                                           'limit'   => null,
                                                                                                                                           'PDO'     => $PDO,
                                                                                                                                           'COMPLEMENTO' => null));


                                                $GRUPOS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array(0 => 'FTI_ID', 1 => 'FTI_DESCRICAO'),
                                                                                                                                          'tabelas' => array(0 => $LOJA['REST_DATABASE'].'.'.$ENTITIE['AUX']),
                                                                                                                                          'where'   => null,
                                                                                                                                          'limit'   => null,
                                                                                                                                          'PDO'     => $PDO,
                                                                                                                                          'COMPLEMENTO' => null));
                                                $RETURN['PGTO'][$LOJA['REST_ID']] = array('PGTO' => $PGTO, 'GPRS' => $GRUPOS);
                                    endforeach;
                                    
                                    return $RETURN['PGTO']; 
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
      public final function _PUT(EntitieFormaPagamento $PGTO){
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
    public final function _DELETE(EntitieFormaPagamento $PGTO){
     
                   // #CODE
      }




} // CLASS END
