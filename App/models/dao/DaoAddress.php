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


abstract class DaoAddress extends ControllerHelper {


/**
 * PERSISTÊNCIA DA ENTIDADE DE ENDEREÇO.
 *
 * @param ENTIDADE DE CEP
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */

  public final function _POST(EntitieAddress $ADDRESS, EntitieUsuario $USUARIO){
            
           

            $SERVICE = $ADDRESS->getSERVICE();
            $ENTITIE = $ADDRESS->getENTITIE();
            $ENTITIE_USER = $USUARIO->getENTITIE();
            $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();


            switch ($SERVICE['OPERATION']):
            
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'INSERIR':
                                
                                      
                                      if($SERVICE['OPERATION'] == "INSERIR_TOGO"):

                                                        $RESPONSE_USER = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->createData(Array('tabelas'  => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE_USER['NAME']),
                                                                                                                                                          'colunas'  => array_keys($ENTITIE_USER['ATTRIBUTES']),
                                                                                                                                                          'valores'  => parent::setIntToArray($ENTITIE_USER['ATTRIBUTES']),
                                                                                                                                                          'PDO'      => $PDO));
                                       
                                                        if($RESPONSE_USER):

                                                                   ControllerFront::makeObj(PATH_CONTROLLER, "ControllerFone")->_SET( Array(
                                                                                                                                              'METHOD'     => $SERVICE['METHOD'],
                                                                                                                                              'SERVICE'    => 'FONE',
                                                                                                                                              'OPERATION'  => 'INSERIR',
                                                                                                                                              'BASE' => $SERVICE['BASE'],
                                                                                                                                              'CONNECTION' =>  $PDO,
                                                                                                                                              'POST'       =>  $ENTITIE_USER['ATTRIBUTES'],
                                                                                                                                              'ID_CLIENTE' =>  $RESPONSE_USER['lastId']
                                                                                                                                              ));
                          
                                                                     $ENTITIE['ATTRIBUTES']['CDA_CLI_ID'] = $RESPONSE_USER['lastId'];

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
                                                                    $ENTITIE['ATTRIBUTES']['CDA_CLI_ID'] = $GETUSER[0]['ID'];


                                                                            
                                                        endif;
                                        endif;
                                                         
                                        

                                               $RESPONSE =  ControllerFront::makeObj("App/controllers/", "ControllerCrud")->createData(array('tabelas'  => Array (0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                             'colunas'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                             'valores'  => parent::setIntToArray($ENTITIE['ATTRIBUTES']),
                                                                                                                                             'PDO'      => $PDO));

                                 
                                       if($RESPONSE['return']):

                                                       $ENTITIE['ATTRIBUTES']['CDA_ID'] = $RESPONSE['lastId'];
                                                return $ENTITIE['ATTRIBUTES'];
                                        endif;

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
  public final function _GET(EntitieAddress $ADDRESS){
   
          $SERVICE = $ADDRESS->getSERVICE();
          $ENTITIE = $ADDRESS->getENTITIE();
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
       
        
              switch ($SERVICE['OPERATION']):
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ALL
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                             case 'ALL':
                              
                                        return ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                               'tabelas' => array(0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                               'where'   => array('op_comparacao' => Array(0 => "=",
                                                                                                                                                                           1 => "="),
                                                                                                                                                  'op_logico'     => Array(0 => "AND"),
                                                                                                                                                  'campo'         => Array(0 => 'CDA_CLI_ID',
                                                                                                                                                                           1 => 'CDA_TIPO'),
                                                                                                                                                  'valor'         => Array(0 =>  $ENTITIE['ATTRIBUTES']['CDA_CLI_ID'],
                                                                                                                                                                           1 =>  parent::parseStr(WEB))),
                                                                                                                               'limit'   => null,
                                                                                                                               'PDO'     => $PDO,
                                                                                                                               'COMPLEMENTO' => null));
                            break;
                                    
           endswitch;
                  
                                         
      }




/**
 * PERSISTÊNCIA DA ENTIDADE, ADDRESS.
 *
 * @param ENTIDADE DE ADDRESS
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
      public final function _PUT(EntitieAddress $ADDRESS){
                         

                          $SERVICE = $ADDRESS->getSERVICE();
                          $ENTITIE = $ADDRESS->getENTITIE();
                          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();


                          switch ($SERVICE['OPERATION']):
                                    

                                              /**
                                               * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                                               * @return boolean
                                               * @author @___erick
                                               *
                                               **/
                                                    case 'ALTERAR':

                                                            
                                      
                                                               $RESPONSE =  ControllerFront::makeObj("App/controllers/", "ControllerCrud")->updateData(array('tabelas'   => array(0 => $SERVICE['BASE'].'.'.$ENTITIE['NAME']),
                                                                                                                                                             'colunas'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                                                             'valores'  => parent::setIntToArray($ENTITIE['ATTRIBUTES']),
                                                                                                                                                             'where'    =>  Array('op_comparacao' => array(0 => "="),
                                                                                                                                                                                  'op_logico'     => null,
                                                                                                                                                                                  'campo'         => array(0 => "CDA_ID"),
                                                                                                                                                                                  'valor'         => array(0 => $ENTITIE['ATTRIBUTES']['CDA_ID'])),
                                                                                                                                                                                  'PDO' => $PDO));
                                                              return ($RESPONSE) ? $ENTITIE['ATTRIBUTES'] : false;
                                                  break;
                          endswitch;
   
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
