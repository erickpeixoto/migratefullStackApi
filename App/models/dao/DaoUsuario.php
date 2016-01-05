<?php

/**
* Classe Camada de Modelo de Entidaddade- MVC
* Entidade USUARIO
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015.
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object [Objeto de Acesso Direto].
*/



abstract class DaoUsuario extends ControllerHelper{



/**
 * PERSISTÊNCIA DA ENTIDADE, USUÁRIO.
 *
 * @param ENTIDADE DE USUÁRIO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public function _POST(EntitieUsuario $USUARIO){
        
          $SERVICE = $USUARIO->getSERVICE();
          $ENTITIE = $USUARIO->getENTITIE();
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
  
  
              switch ($SERVICE['OPERATION']):
                    

                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'INSERIR':

                                         
                                         $RESPONSE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->createData(Array('tabelas'  => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                      'colunas'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                      'valores'  => parent::setIntToArray($ENTITIE['ATTRIBUTES']),
                                                                                                                                      'PDO'      => $PDO));
                                        if($RESPONSE['return']):

                                                        ControllerFront::makeObj(PATH_CONTROLLER, "ControllerFone")->_SET( Array(
                                                                                                                                  'METHOD'     => $SERVICE['METHOD'],
                                                                                                                                  'SERVICE'    => 'FONE',
                                                                                                                                  'OPERATION'  => 'INSERIR',
                                                                                                                                  'BASE'       => $SERVICE['BASE'],
                                                                                                                                  'CONNECTION' =>  $PDO,
                                                                                                                                  'POST'       =>  $ENTITIE['ATTRIBUTES'],
                                                                                                                                  'ID_CLIENTE' =>  $RESPONSE['lastId']
                                                                                                                                ));
                                                 unset($ENTITIE['ATTRIBUTES']['CLI_PASSWD']);
                                                       $ENTITIE['ATTRIBUTES']['CLI_ID'] = $RESPONSE['lastId'];
                                                return $ENTITIE['ATTRIBUTES'];
                                        endif;
                          break;


                      /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT TOGO
                       * @return boolean
                       * @author @___erick
                       *
                       **/   

                         case 'INSERIR_TOGO':
                                          
                                    

                                         $RESPONSE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->createData(Array('tabelas' => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                      'colunas'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                      'valores'  => parent::setIntToArray($ENTITIE['ATTRIBUTES']),
                                                                                                                                      'PDO'      => $PDO));                     

                                        if($RESPONSE['return']):

                                                
                                                            ControllerFront::makeObj(PATH_CONTROLLER, "ControllerAddress")->_SET( Array(
                                                                                                                                      'METHOD'     =>  'POST',
                                                                                                                                      'SERVICE'    =>  'ADDRESS',
                                                                                                                                      'OPERATION'  =>  'INSERIR',
                                                                                                                                      'BASE'       =>  $SERVICE['BASE'],
                                                                                                                                      'TOGO'       =>  (!$SERVICE['TOGO'][0]['LOJA']) ? $SERVICE['TOGO'] : $SERVICE['TOGO'][0]['LOJA'] ,
                                                                                                                                      'CONNECTION' =>  $PDO,
                                                                                                                                      'POST'       =>  $ENTITIE['ATTRIBUTES'],
                                                                                                                                      'ID'         =>  $RESPONSE['lastId']
                                                                                                                                    ));


                                                             ControllerFront::makeObj(PATH_CONTROLLER, "ControllerFone")->_SET( Array(
                                                                                                                                      'METHOD'     => $SERVICE['METHOD'],
                                                                                                                                      'SERVICE'    => 'FONE',
                                                                                                                                      'OPERATION'  => 'INSERIR',
                                                                                                                                      'BASE'       => $SERVICE['BASE'],
                                                                                                                                      'CONNECTION' =>  $PDO,
                                                                                                                                      'POST'       =>  $ENTITIE['ATTRIBUTES'],
                                                                                                                                      'ID_CLIENTE' =>  $RESPONSE['lastId']
                                                                                                                                    ));




                                                 unset($ENTITIE['ATTRIBUTES']['CLI_PASSWD']);
                                                       $ENTITIE['ATTRIBUTES']['CLI_ID'] = $RESPONSE['lastId'];
                                                return $ENTITIE['ATTRIBUTES'];
                                        endif;
                          break;



           endswitch;
      }






/**
 * PERSISTÊNCIA DA ENTIDADE, USUÁRIO.
 *
 * @param ENTIDADE DE USUÁRIO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public function _GET(EntitieUsuario $USUARIO){
     
          $SERVICE  = $USUARIO->getSERVICE();
          $ENTITIE  = $USUARIO->getENTITIE();
          $PDO      = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
          $RESPONSE = array();
          
              switch ($SERVICE['OPERATION']):
                  

                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT UPDATE
                       * @return boolean
                       * @author @___erick
                       *
                       **/

                            case 'AUTH':
                                  


                                       foreach ($SERVICE['BASE'] as $key => $LOJA): 
                                          
                                             $GETUSER = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData( 
                                                                                                            Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                   'tabelas' => Array (0 => $LOJA['REST_DATABASE'].'.AWE_CLI_DELIVERY_ADDRESS_ECOMMERCE AS ADDRESS INNER JOIN '.$LOJA['REST_DATABASE'].'.AWE_CLIENTES_ECOMMERCE AS CLIENTE ON CLIENTE.CLI_ID = ADDRESS.CDA_CLI_ID'),
                                                                                                                    'where'   => Array('op_comparacao' => Array(0 => "=",
                                                                                                                                                                1 => "=",
                                                                                                                                                                2 => "!="),
                                                                                                                             'op_logico'     => Array(0 => "AND",
                                                                                                                                                      1 => "AND"),
                                                                                                                             'campo'         => Array(0 => 'CLIENTE.CLI_LOGIN',
                                                                                                                                                      1 => 'CLIENTE.CLI_PASSWD',
                                                                                                                                                      2 => 'CLIENTE.CLI_CANAL_ECOMMERCE'),
                                                                                                                             'valor'         => Array(0 =>  "'".$ENTITIE['ATTRIBUTES']['CLIENTE.CLI_LOGIN']."'",
                                                                                                                                                      1 => "'".$SERVICE['PWD']."'",
                                                                                                                                                      2 => "'ESP'")
                                                                                                                              ),
                                                                                                                   'limit'       => null,
                                                                                                                   'PDO'         => $PDO,
                                                                                                                   'BASE'        => null,
                                                                                                                   'COMPLEMENTO' => null));
                                          
                                                      if(count($GETUSER) > 0){ $RESPONSE = $GETUSER; };
                                       endforeach;
                                       return ($RESPONSE) ?  $RESPONSE : false; 

                            break;




                            case 'ALL':
                                  
                            
                                  
                                      foreach ($SERVICE['BASE'] as $key => $LOJA): 
                     
                                               $RESPONSE[$LOJA['REST_ID']] = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData( 
                                                                                                            Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                   'tabelas' => Array (0 => $LOJA['REST_DATABASE'].'.AWE_CLI_DELIVERY_ADDRESS_ECOMMERCE AS ADDRESS INNER JOIN '.$LOJA['REST_DATABASE'].'.AWE_CLIENTES_ECOMMERCE AS CLIENTE ON CLIENTE.CLI_ID = ADDRESS.CDA_CLI_ID'),
                                                                                                                   'where'   => null,
                                                                                                                   'limit'   => null,
                                                                                                                   'PDO'         => $PDO,
                                                                                                                   'BASE'        => null,
                                                                                                                   'COMPLEMENTO' => null));
                                       endforeach;
                           
                      
                                   return ($RESPONSE) ?  $RESPONSE : false; 

                            break;

           endswitch;
      }









/**
 * PERSISTÊNCIA DA ENTIDADE, USUÁRIO.
 *
 * @param ENTIDADE DE USUÁRIO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
    public function _PUT(EntitieUsuario $USUARIO){
        
          $SERVICE = $USUARIO->getSERVICE();
          $ENTITIE = $USUARIO->getENTITIE();
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
      
  
              switch ($SERVICE['OPERATION']):
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'ALTERAR':

                              
                                  $RESPONSE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->updateData(array( 'tabelas'  => Array(0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                'colunas'  => Array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                'valores'  => parent::setIntToArray($ENTITIE['ATTRIBUTES']),
                                                                                                                                'where'   =>  Array('op_comparacao' => Array(0 => "="),
                                                                                                                                                   'op_logico'     => null,
                                                                                                                                                   'campo'         => Array(0 => "CLI_ID"),
                                                                                                                                                   'valor'         => Array(0 => $SERVICE['WHERE'])),
                                                                                                                                                   'PDO' => $PDO));
                                    return ($RESPONSE) ? $ENTITIE['ATTRIBUTES'] : false;

                          break;


                          case 'TOKEN':
                            
                                  $RESPONSE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->updateData(array( 'tabelas'  => Array(0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                'colunas'  => array(0 => 'CLI_SID'),
                                                                                                                                'valores'  => array(0 =>  $SERVICE['TOKEN']),
                                                                                                                                'where'   =>  Array('op_comparacao' => Array(0 => "="),
                                                                                                                                                    'op_logico'     => null,
                                                                                                                                                    'campo'         => Array(0 => "CLI_ID"),
                                                                                                                                                    'valor'         => Array(0 => $SERVICE['WHERE'])),
                                                                                                                                                    'PDO' => $PDO));
                                    return ($RESPONSE) ? true : false;

                          break;

                            case 'ALTERAR_SENHA':


                                   $RESPONSE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->updateData(array( 'tabelas'  => Array(0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                'colunas'  => array(0 => 'CLI_SID',
                                                                                                                                                    1 => 'CLI_PASSWD'),
                                                                                                                                'valores'  => array(0 =>  null,
                                                                                                                                                    1 => $ENTITIE['ATTRIBUTES']['CLI_PASSWD']),
                                                                                                                                'where'   =>  Array('op_comparacao' => Array(0 => "="),
                                                                                                                                                    'op_logico'     => null,
                                                                                                                                                    'campo'         => Array(0 => "CLI_ID"),
                                                                                                                                                    'valor'         => Array(0 => $SERVICE['WHERE'])),
                                                                                                                                                    'PDO' => $PDO));
                                    if($RESPONSE){
                                        
                                          $ENTITIE['ATTRIBUTES'] = array('CLIENTE.CLI_ID'         => null,
                                                                          'CLIENTE.CLI_NOME'      => null,
                                                                          'CLIENTE.CLI_FONE'      => null,
                                                                          'CLIENTE.CLI_CPF_CGC'   => null,
                                                                          'CLIENTE.CLI_LOGIN'     => null,
                                                                          'CLIENTE.CLI_SID'       => null,
                                                                          'ADDRESS.CDA_ID'        => null,
                                                                          'ADDRESS.CDA_CLI_ID'      => null,
                                                                          'ADDRESS.CDA_LOGRADOURO'  => null,
                                                                          'ADDRESS.CDA_APELIDO'     => null,
                                                                          'ADDRESS.CDA_CEP'         => null,
                                                                          'ADDRESS.CDA_COMPLEMENTO' => null,
                                                                          'ADDRESS.CDA_NUMERO'      => null,
                                                                          'ADDRESS.CDA_CIDADE'      => null,
                                                                          'ADDRESS.CDA_BAIRRO'      => null,
                                                                          'ADDRESS.CDA_UF'          => null,
                                                                          'ADDRESS.CDA_PAIS'        => null,
                                                                          'ADDRESS.CDA_REFERENCIA'  => null,
                                                                          'ADDRESS.CDA_APTO_SALA'   => null,
                                                                          'ADDRESS.CDA_OBSERVACAO'  => null);


                                                $RETURN = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData( 
                                                                                                                                Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                       'tabelas' => Array (0 => $SERVICE['BASE'].'.AWE_CLI_DELIVERY_ADDRESS_ECOMMERCE AS ADDRESS INNER JOIN '.$SERVICE['BASE'].'.AWE_CLIENTES_ECOMMERCE AS CLIENTE ON CLIENTE.CLI_ID = ADDRESS.CDA_CLI_ID'),
                                                                                                                                        'where'   => Array('op_comparacao' => Array(0 => "="),
                                                                                                                                                 'op_logico'     => null,
                                                                                                                                                 'campo'         => Array(0 => 'CLIENTE.CLI_ID'),
                                                                                                                                                 'valor'         => Array(0 =>  $SERVICE['WHERE'])
                                                                                                                                                  ),
                                                                                                                                       'limit'       => null,
                                                                                                                                       'PDO'         => $PDO,
                                                                                                                                       'BASE'        => null,
                                                                                                                                       'COMPLEMENTO' => null));
                                    }

                                    return ($RETURN) ? $RETURN : false;

                          break;
           endswitch;
      }










/**
 * PERSISTÊNCIA DA ENTIDADE, USUARIO.
 *
 * @param ENTIDADE DE USUARIO
 * @access public
 * @return BOOLEAN/INTEGER  [SQL DROP]
 *
 */
    public function _DELETE(EntitieUsuario $USUARIO){
       
          $SERVICE = $USUARIO->getSERVICE();
          $ENTITIE = $USUARIO->getENTITIE();
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnectionDefaultController();
      
  
              switch ($SERVICE['OPERATION']):
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'EXCLUIR':
                                      return ControllerFront::makeObj(PATH_CONTROLLER, "ControllerCrud")->deleteData(Array(
                                                                                                                           'tabelas'  => Array(0 => $ENTITIE['NAME']),
                                                                                                                           'where'   =>  Array('op_comparacao' => Array(0 => "="),
                                                                                                                                               'op_logico'     => null,
                                                                                                                                               'campo'         => Array(0 => 'ID'),
                                                                                                                                               'valor'         => Array(0 => $SERVICE['WHERE'])),
                                                                                                                           'PDO' => $PDO));
                          break;
           endswitch;
      }
      
} // CLASS END
