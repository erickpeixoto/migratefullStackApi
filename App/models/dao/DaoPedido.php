<?php
/**
* Classe Camada de Modelo de Entidaddade- MVC
* Entidade de Pedido
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object [Objeto de Acesso Direto].
*/



abstract class DaoPedido extends ControllerHelper{




/**
 * PERSISTÊNCIA DA ENTIDADE, PEDIDO.
 *
 * @param ENTIDADE DE PEDIDO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public final function _POST(EntitiePedido $PEDIDO, EntitieUsuario $USUARIO, EntitieAddress $ADDRESS){

    
          $SERVICE = $PEDIDO->getSERVICE();
          $ENTITIE = $PEDIDO->getENTITIE();
          $ENTITIE_USER = $USUARIO->getENTITIE();
          $ENTITIE_ADDRESS = $ADDRESS->getENTITIE();

          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();      
          $RETURN  = array();
                     
              switch ($SERVICE['OPERATION']):
                 
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'INSERIR':
                                    


                                       /**
                                         * @example OPERAÇÃO DE PERSISTÊNCIA PARA PEDIDO TOGO
                                         * @return boolean
                                         * @author @___erick
                                         *
                                         **/
                                                 
                                                          $RESPONSE_USER = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->createData(Array('tabelas'  => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE_USER['NAME']),
                                                                                                                                                            'colunas'  => array_keys($ENTITIE_USER['ATTRIBUTES']),
                                                                                                                                                            'valores'  => parent::setIntToArray($ENTITIE_USER['ATTRIBUTES']),
                                                                                                                                                            'PDO'      => $PDO));
                                                   
                                                       if($RESPONSE_USER):
                                                      
                                                                  $ENTITIE_ADDRESS['ATTRIBUTES']['CDA_CLI_ID'] = $RESPONSE_USER['lastId'];
                                                                  $RESPONSE_ADDRESS_USER =   ControllerFront::makeObj(PATH_CONTROLLER, "ControllerAddress")->_SET( Array(
                                                                                                                                                                'METHOD'     =>  'POST',
                                                                                                                                                                'SERVICE'    =>  'ADDRESS',
                                                                                                                                                                'OPERATION'  =>  'INSERIR',
                                                                                                                                                                'BASE'       =>  $SERVICE['BASE'],
                                                                                                                                                                'TOGO'       =>  ($SERVICE['TOGO']) ? $SERVICE['LOJA'] : false,
                                                                                                                                                                'CONNECTION' =>  $PDO,
                                                                                                                                                                'POST'       =>  $ENTITIE_ADDRESS['ATTRIBUTES'],
                                                                                                                                                                'ID'         =>  $RESPONSE_USER['lastId']
                                                                                                                                                              ));

                                                                    ControllerFront::makeObj(PATH_CONTROLLER, "ControllerFone")->_SET( Array(
                                                                                                                                              'METHOD'     => $SERVICE['METHOD'],
                                                                                                                                              'SERVICE'    => 'FONE',
                                                                                                                                              'OPERATION'  => 'INSERIR',
                                                                                                                                              'BASE' => $SERVICE['BASE'],
                                                                                                                                              'CONNECTION' =>  $PDO,
                                                                                                                                              'POST'       =>  $ENTITIE_USER['ATTRIBUTES'],
                                                                                                                                              'ID_CLIENTE' =>  $RESPONSE_USER['lastId']
                                                                                                                                              ));
                                                              

                                                                      $ENTITIE['ATTRIBUTES']['PED_CLI_ID']      = $RESPONSE_USER['lastId'];
                                                                      $ENTITIE['ATTRIBUTES']['PED_ID_ENDERECO'] = $RESPONSE_ADDRESS_USER['CDA_ID'];

                                                          
                                                         else:

                                                                  $GETUSER = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData( 
                                                                                                                      Array ('campos'   => Array(0 => 'CLI_ID AS ID'),
                                                                                                                             'tabelas'  => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE_USER['NAME']),
                                                                                                                             'where'    => Array('op_comparacao' => Array(0 => "="),
                                                                                                                                                 'op_logico'     => null,
                                                                                                                                                 'campo'         => Array(0 => 'CLI_LOGIN'),
                                                                                                                                                 'valor'         => Array(0 =>  "'".$ENTITIE_USER['ATTRIBUTES']['CLI_LOGIN']."'")
                                                                                                                                                ),
                                                                                                                                     'limit'       => null,
                                                                                                                                     'PDO'         => $PDO,
                                                                                                                                     'BASE'        => null,
                                                                                                                                     'COMPLEMENTO' => null));
                                                        

                                                                  $GETADDRES = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData( 
                                                                                                                    Array ('campos'   => Array(0 => 'CDA_ID AS ID',
                                                                                                                                               1 => 'CDA_CEP AS CEP'),
                                                                                                                           'tabelas'  => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE_ADDRESS['NAME']),
                                                                                                                           'where'    => Array('op_comparacao' => Array(0 => "=",
                                                                                                                                                                        1 => "="),
                                                                                                                                               'op_logico'     => Array(0 => "AND"),
                                                                                                                                               'campo'         => Array(0 => 'CDA_CLI_ID',
                                                                                                                                                                        1 => 'CDA_TIPO'),
                                                                                                                                               'valor'         => Array(0 =>  $GETUSER[0]['ID'],
                                                                                                                                                                        1 =>  ($SERVICE['TOGO']) ? "'TGO'" : "'WEB'")
                                                                                                                                              ),
                                                                                                                           'limit'       => null,
                                                                                                                           'PDO'         => $PDO,
                                                                                                                           'BASE'        => null,
                                                                                                                           'COMPLEMENTO' => null));
                                                          


                                                      /**
                                                         * @example VERIFICANDO SE O ENDERECO PASSADO JA EXISTE NA BASE
                                                         *          A NEGAÇAO SERA IMPLEMENTADA EM CASOS POSITIVOS  
                                                         * @return boolean
                                                         * @author @___erick
                                                         *
                                                         **/  
                                                                    $CEP = ($SERVICE['TOGO']) ? $SERVICE['LOJA']['REST_CEP'] : $ENTITIE_ADDRESS['ATTRIBUTES']['CDA_CEP'];

                                                                            $CHECK_INSERT = true;
                                                                      
                                                                foreach ($GETADDRES as $key => $getValue) {
                                                                          
                                                                      if($getValue['CEP'] == $CEP){   $CHECK_INSERT = false;  }
                                                                }
                                                     

                                                      
                                                       /**
                                                         * @example INSERÇAO DE UM NOVO ENDERECO APOS VERIFICACAO FEITA A CIMA
                                                         * @return boolean
                                                         * @author @___erick
                                                         *
                                                         **/  
                                                              
                                                              if(!$GETADDRES || $CHECK_INSERT):
                                                                   
                                                                      $ENTITIE_ADDRESS['ATTRIBUTES']['CDA_CLI_ID'] =  $GETUSER[0]['ID'];
                                                                      $RESPONSE_ADDRESS_USER =   ControllerFront::makeObj(PATH_CONTROLLER, "ControllerAddress")->_SET( Array(
                                                                                                                                                                  'METHOD'     =>  'POST',
                                                                                                                                                                  'SERVICE'    =>  'ADDRESS',
                                                                                                                                                                  'OPERATION'  =>  'INSERIR',
                                                                                                                                                                  'BASE'       =>  $SERVICE['BASE'],
                                                                                                                                                                  'TOGO'       =>  ($SERVICE['TOGO']) ? $SERVICE['LOJA'] : false,
                                                                                                                                                                  'CONNECTION' =>  $PDO,
                                                                                                                                                                  'POST'       =>  $ENTITIE_ADDRESS['ATTRIBUTES'],
                                                                                                                                                                  'ID'         =>  $RESPONSE_USER['lastId']
                                                                                                                                                                ));

                                                                      ControllerFront::makeObj(PATH_CONTROLLER, "ControllerFone")->_SET( Array(
                                                                                                                                              'METHOD'     => $SERVICE['METHOD'],
                                                                                                                                              'SERVICE'    => 'FONE',
                                                                                                                                              'OPERATION'  => 'INSERIR',
                                                                                                                                              'BASE' => $SERVICE['BASE'],
                                                                                                                                              'CONNECTION' =>  $PDO,
                                                                                                                                              'POST'       =>  $ENTITIE_USER['ATTRIBUTES'],
                                                                                                                                              'ID_CLIENTE' =>  $RESPONSE_USER['lastId']
                                                                                                                                              ));


                                                                      $GETADDRES = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData( 
                                                                                                                Array ('campos'   => Array(0 => 'CDA_ID AS ID'),
                                                                                                                       'tabelas'  => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE_ADDRESS['NAME']),
                                                                                                                       'where'    => Array('op_comparacao' => Array(0 => "="),
                                                                                                                                           'op_logico'     => null,
                                                                                                                                           'campo'         => Array(0 => 'CDA_CLI_ID'),
                                                                                                                                           'valor'         => Array(0 =>  $GETUSER[0]['ID'])
                                                                                                                                          ),
                                                                                                                       'limit'       => null,
                                                                                                                       'PDO'         => $PDO,
                                                                                                                       'BASE'        => null,
                                                                                                                       'COMPLEMENTO' => null));
                                                                endif;


                                                                    

                                                              /**
                                                                 * @example OBTENDO O ULTIMO ENDERECO CADASTRADO E O CLIENTE RETORNADO
                                                                 * @return boolean
                                                                 * @author @___erick
                                                                 *
                                                                 **/    
                                                                  $ENTITIE['ATTRIBUTES']['PED_CLI_ID'] = $GETUSER[0]['ID'];
                                                                  $ENTITIE['ATTRIBUTES']['PED_ID_ENDERECO'] = $GETADDRES[count($GETADDRES)-1]['ID'];

                                                 endif;
                                  

                                        /**
                                           * @example PERSISTINDO PEDIDO, ITENS E PAGAMENTO EM BASE
                                           * @return boolean
                                           * @author @___erick
                                           *
                                           **/  
                                           $DATE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array(0 => 'NOW() AS NOW'),
                                                                                                                                                           'tabelas' => Array (0 => 'pdidio_bdportaldidio.awe_produtos_db'),
                                                                                                                                                           'where'   =>  null,
                                                                                                                                                           'limit'   => null,
                                                                                                                                                           'PDO'     => $PDO,
                                                                                                                                                           'COMPLEMENTO' => 'LIMIT 1'));
                                             $ENTITIE['ATTRIBUTES']['PED_DATA'] = $DATE[0]['NOW'];
                                             $RESPONSE =  ControllerFront::makeObj("App/controllers/", "ControllerCrud")->createData(array('tabelas'  => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                           'colunas'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                           'valores'  => parent::setIntToArray($ENTITIE['ATTRIBUTES']),
                                                                                                                                           'PDO'      => $PDO));

                                             if($RESPONSE['return']):
                                                    
                                                    $ENTITIE['ATTRIBUTES']['PED_ID'] = $RESPONSE['lastId'];
                                                    $RETURN['PEDIDO'] = $ENTITIE['ATTRIBUTES'];        
                                                    $RETURN['ITENS']  =  ControllerFront::makeObj(PATH_CONTROLLER, "ControllerItem")->_SET( Array(
                                                                                                                                                    'METHOD'     => $SERVICE['METHOD'],
                                                                                                                                                    'SERVICE'    => 'ITEM',
                                                                                                                                                    'OPERATION'  => 'INSERIR',
                                                                                                                                                    'BASE'       => $SERVICE['BASE'],
                                                                                                                                                    'CONNECTION' => $PDO,
                                                                                                                                                    'PEDIDO'     => $SERVICE['PEDIDO'],
                                                                                                                                                    'ID_PEDIDO'  => $RESPONSE['lastId']
                                                                                                                                                  ));

                                                   $RETURN['PGTO'] =   ControllerFront::makeObj(PATH_CONTROLLER, "ControllerFormaPgtoPedido")->_SET( Array(
                                                                                                                                                    'METHOD'     => $SERVICE['METHOD'],
                                                                                                                                                    'SERVICE'    => 'FORMA_PAGAMENTO',
                                                                                                                                                    'OPERATION'  => 'INSERIR',
                                                                                                                                                    'BASE'       => $SERVICE['BASE'],
                                                                                                                                                    'CONNECTION' => $PDO,
                                                                                                                                                    'POST'       => $SERVICE['DATA']['POST']['DATA'],
                                                                                                                                                    'ID_PEDIDO'  =>  $RESPONSE['lastId']
                                                                                                                                                  ));

                                                  
                                                  if($ENTITIE['ATTRIBUTES']['PED_DES_ID']):
                                                       
                                                                      ControllerFront::makeObj("App/controllers/", "ControllerCrud")->updateData(array('tabelas'   => array(0 => 'awe_promo_codigos'),
                                                                                                                                                       'colunas'  => array(0 => "VAL_UTILIZADO",
                                                                                                                                                                           1 => "VAL_UTILIZADO_DATA"),
                                                                                                                                                       'valores'  => array(0 => S,
                                                                                                                                                                           1 => date('Y-m-d H:i:s')),
                                                                                                                                                       'where'    =>  Array('op_comparacao' => array(0 => "="),
                                                                                                                                                                            'op_logico'     => null,
                                                                                                                                                                            'campo'         => array(0 => "VAL_ID"),
                                                                                                                                                                            'valor'         => array(0 => $SERVICE['ID_CUPOM'])),
                                                                                                                                                                            'PDO' => $PDO));
                                                           
                                                             
                                                    endif;
                                                

                                           endif;

                                                  return ($RETURN['PEDIDO']) ? $RETURN : false;

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
  public final function _GET(EntitiePedido $PEDIDO, EntitieUsuario $USUARIO, EntitieAddress $ADDRESS){
   
          $SERVICE      = $PEDIDO->getSERVICE();
          $ENTITIE      = $PEDIDO->getENTITIE();
          $ENTITIE_USER = $USUARIO->getENTITIE();
          $ENTITIE_ADDRESS = $ADDRESS->getENTITIE();
          $ITEM         = $SERVICE['EntitieItem']; 
          $EntitieItem  = $ITEM->getENTITIE();
          $PDO          = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
          $RESPONSE     =  array();
          
              switch ($SERVICE['OPERATION']):
                  
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ALL
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                 
                            case 'ALL':

                                          $RETURN  = array();

                                             foreach ($SERVICE['REST'] as $key => $LOJA): 


                                                             $RESPONSE = array();
                                                              $GETUSER = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData( 
                                                                                                                  Array ('campos'   => Array(0 => 'CLI_ID AS ID'),
                                                                                                                         'tabelas'  => Array (0 => $LOJA['REST_DATABASE'].'.'.$ENTITIE_USER['NAME']),
                                                                                                                         'where'    => Array('op_comparacao' => Array(0 => "="),
                                                                                                                                             'op_logico'     => null,
                                                                                                                                             'campo'         => Array(0 => 'CLI_LOGIN'),
                                                                                                                                             'valor'         => Array(0 =>  "'".$SERVICE['POST']."'")
                                                                                                                                            ),
                                                                                                                                 'limit'       => null,
                                                                                                                                 'PDO'         => $PDO,
                                                                                                                                 'BASE'        => null,
                                                                                                                                 'COMPLEMENTO' => null));
                                          
                                                             $GETADDRESS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData( 
                                                                                                                  Array ('campos'   => Array(0 => '*'),
                                                                                                                         'tabelas'  => Array (0 => $LOJA['REST_DATABASE'].'.'.$ENTITIE_ADDRESS['NAME']),
                                                                                                                         'where'    => Array('op_comparacao' => Array(0 => "="),
                                                                                                                                             'op_logico'     => null,
                                                                                                                                             'campo'         => Array(0 => 'CDA_CLI_ID'),
                                                                                                                                             'valor'         => Array(0 =>  $GETUSER[0]['ID'])
                                                                                                                                            ),
                                                                                                                         'limit'       => null,
                                                                                                                         'PDO'         => $PDO,
                                                                                                                         'BASE'        => null,
                                                                                                                         'COMPLEMENTO' => null));


                                                           $PEDIDOS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                               'tabelas' => Array (0 => $LOJA['REST_DATABASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                                'where'   =>  array('op_comparacao' => Array(0 => "="),
                                                                                                                                                                    'op_logico'     => null,
                                                                                                                                                                    'campo'         => Array(0 => 'PED_CLI_ID'),
                                                                                                                                                                    'valor'         => Array(0 => $GETUSER[0]['ID'])),
                                                                                                                                               'limit'   => null,
                                                                                                                                               'PDO'     => $PDO,
                                                                                                                                               'COMPLEMENTO' => 'ORDER BY PED_ID DESC'));
                                                                foreach ($PEDIDOS as $key => $pedido):

                                                                          $ITENS = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerItem")->_SET( Array(   'METHOD' => 'GET',
                                                                                                                                                              'SERVICE' => 'ITEM',
                                                                                                                                                              'OPERATION' => 'ALL',
                                                                                                                                                              'BASE' => $LOJA['REST_DATABASE'],
                                                                                                                                                              'CONNECTION' => $PDO,
                                                                                                                                                              'ID_PEDIDO' =>  $pedido['PED_ID']
                                                                                                                                                            ));
                                                                            array_push($RESPONSE, array('PEDIDO' => $pedido, 'ITENS' => $ITENS, 'TIME' =>  parent::setPrazo(array('DATA_ABERTURA'  => $pedido['PED_DATA'], 'DATA_ENCERRAMENTO'  => date('Y-m-d H:i:s')))));


                                                                  endforeach;

                                                              array_push($RETURN, array('REST' => $LOJA['REST_ID'], 'PEDIDOS' => $RESPONSE, 'ADDRESS' => $GETADDRESS)); 
                                            endforeach;

                                          
                                            return ($RETURN) ? $RETURN : Array();                           

                                             
                                                                             
                            break;
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT UPDATE
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'ONE':
                               
                            break;
                     
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ACCESS USER
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'ACCESS':
                                
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
    public final function _PUT(EntitiePedido $PEDIDO){
              
              #CODE...
      }





/**
 * PERSISTÊNCIA DA ENTIDADE, PEDIDO.
 *
 * @param ENTIDADE DE PEDIDO
 * @access public
 * @return BOOLEAN/INTEGER  [SQL DROP]
 *
 */
    public final function _DELETE(EntitiePedido $PEDIDO){
          $SERVICE = $PEDIDO->getSERVICE();
          $ENTITIE = $PEDIDO->getENTITIE();
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
