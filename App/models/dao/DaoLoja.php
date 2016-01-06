<?php
/**
* Classe Camada de Modelo de Entidaddade- MVC
* Entidade de LOJA
*
* @author Erick Eduardo <erickeduardo@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object [Objeto de Acesso Direto].
*/

abstract class DaoLoja extends ControllerHelper{


/**
 * PERSISTÊNCIA DA ENTIDADE, CEP.
 *
 * @param ENTIDADE DE CEP
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */


  public final function _POST(EntitieLoja $LOJA){


      }






/**
 * PERSISTÊNCIA DA ENTIDADE, CEP.
 *
 * @param ENTIDADE DE CEP
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public final function _GET(EntitieLoja $LOJA){

          $SERVICE = $LOJA->getSERVICE();
          $ENTITIE = $LOJA->getENTITIE();
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
          $RETURN  = Array();


              switch ($SERVICE['OPERATION']):

                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ALL
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                             case 'ALL':


                                   $RESPONSE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                               'tabelas' => array(0 => $ENTITIE['NAME']),
                                                                                                                               'where'   => array('op_comparacao' => Array(0 => "!=",
                                                                                                                                                                      1 => "="),
                                                                                                                                                  'op_logico'    => Array(0 => "AND"),
                                                                                                                                                  'campo'        => Array(0 => 'REST_ID',
                                                                                                                                                                          1 => 'REST_ECOMMERCE'),
                                                                                                                                                  'valor'        => Array(0 => 1,
                                                                                                                                                                          1 => parent::parseStr(S))),
                                                                                                                                'limit'   => null,
                                                                                                                                'PDO'     => $PDO,
                                                                                                                                'COMPLEMENTO' => null));


                                if($RESPONSE){

                                        foreach ($RESPONSE as $key => $getLoja) {

                                              $getLoja['REST_NOME'] = str_replace('(', ' ', $getLoja['REST_NOME']);
                                              $getLoja['REST_NOME'] = str_replace(')', ' ', $getLoja['REST_NOME']);
                                              $getLoja['REST_ECOMMERCE_NOME'] = str_replace('(', ' ', $getLoja['REST_ECOMMERCE_NOME']);
                                              $getLoja['REST_ECOMMERCE_NOME'] = str_replace(')', ' ', $getLoja['REST_ECOMMERCE_NOME']);
                                              $DATA = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array(0 => 'TIMEDIFF(now(), TBL.ISO_DATAHORA) AS DIFF'),
                                                                                                                                                                                            'tabelas' => array(0 => $getLoja['REST_DATABASE'].'.'.$ENTITIE['AUX'][1].' AS TBL'),
                                                                                                                                                                                            'where'   => null,
                                                                                                                                                                                            'limit'   => null,
                                                                                                                                                                                            'PDO'     => $PDO,
                                                                                                                                                                                            'COMPLEMENTO' => null));

                                                                                                $MOVIMENTO = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos' => array(0 => 'MVD_DATA_INI'),
                                                                                                                                                                                             'tabelas' => array(0 => $getLoja['REST_DATABASE'].'.'.$ENTITIE['AUX'][0]),
                                                                                                                                                                                             'where'   => null,
                                                                                                                                                                                              'limit'   => null,
                                                                                                                                                                                              'PDO'     => $PDO,
                                                                                                                                                                                              'COMPLEMENTO' => null));


                                                                                                $getLoja['STATE'] = array(
                                                                                                                          'SOCKET'    => ((int) parent::getMinDate($DATA) < 5) ? true : false,
                                                                                                                          'MOVIMENTO' => ($MOVIMENTO['MVD_DATA_INI'] == parent::parseStr(date('Y-m-d'))) ? true : false,
                                                                                                                          'DAYMOV'    => $MOVIMENTO[0]['MVD_DATA_INI']
                                                                                                                          );

                                                                                                array_push($RETURN, $getLoja);


                                          }



                                                return $RETURN;
                                  }

                              break;

                      /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ALL
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                             case 'CHECK':

                                    $RETURN = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array(0 => 'TIMEDIFF(now(), TBL.ISO_DATAHORA) AS DIFF'),
                                                                                                                              'tabelas' => array(0 => $SERVICE['BASE'].'.'.$ENTITIE['AUX'][1].' AS TBL'),
                                                                                                                              'where'   => null,
                                                                                                                              'limit'   => null,
                                                                                                                              'PDO'     => $PDO,
                                                                                                                              'COMPLEMENTO' => null));

                                  $MOVIMENTO = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos' => array(0 => 'MVD_DATA_INI'),
                                                                                                                              'tabelas' => array(0 => $SERVICE['BASE'].'.'.$ENTITIE['AUX'][0]),
                                                                                                                              'where'   => array('op_comparacao' => Array(0 => "="),
                                                                                                                                                  'op_logico'    => null,
                                                                                                                                                  'campo'        => Array(0 => 'MVD_DATA_INI'),
                                                                                                                                                  'valor'        => Array(0 => parent::parseStr(date('Y-m-d')))),
                                                                                                                                'limit'   => null,
                                                                                                                                'PDO'     => $PDO,
                                                                                                                                'COMPLEMENTO' => null));
                                    return array(
                                                    'SOCKET'    => ((int) parent::getMinDate($RETURN) < 5) ? true : false,
                                                    'MOVIMENTO' => ((int) count($MOVIMENTO) > 0) ? true : false
                                                );
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
