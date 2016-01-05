
<?php

/**
* Classe Camada de Modelo de Entidaddade- MVC
* Entidade CUPOM
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015.
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object [Objeto de Acesso Direto].
*/



abstract class DaoCupom extends ControllerHelper{



/**
 * PERSISTÊNCIA DA ENTIDADE, CUPOM.
 *
 * @param ENTIDADE DE CUPOM
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public function _POST(EntitieCupom $CUPOM){

          $SERVICE = $CUPOM->getSERVICE();
          $ENTITIE = $CUPOM->getENTITIE();
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();


              switch ($SERVICE['OPERATION']):


                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'INSERIR':

                                       #CODE
                          break;

           endswitch;
      }






/**
 * PERSISTÊNCIA DA ENTIDADE, CUPOM.
 *
 * @param ENTIDADE DE CUPOM
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
      public function _GET(EntitieCupom $CUPOM){

              $SERVICE   = $CUPOM->getSERVICE();
              $ENTITIE   = $CUPOM->getENTITIE();
              $PDO       = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
              $RESPONSE  = array();

                  switch ($SERVICE['OPERATION']):


                         /**
                           * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT UPDATE
                           * @return boolean
                           * @author @___erick
                           *
                           **/
                                case 'ONE':

                                        $RESPONSE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(
                                                                                                Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                       'tabelas' => Array (0 =>  'pdidio_bdportaldidio.awe_descontos_db AS DESCONTOS  INNER JOIN .awe_promo_codigos AS CODIGO ON (DESCONTOS.DES_ID = CODIGO.VAL_DESC_ID)'),
                                                                                                       'where'   =>  array('op_comparacao' => Array(0 => "=",
                                                                                                                                                    1 => "=",
                                                                                                                                                    2 => "="),
                                                                                                                           'op_logico'     => Array(0 => "AND",
                                                                                                                                                    1 => "AND"),
                                                                                                                           'campo'         => Array(0 => 'DESCONTOS.DES_ATIVADO',
                                                                                                                                                    1 => 'CODIGO.VAL_UTILIZADO',
                                                                                                                                                    2 => 'CODIGO.VAL_CODIGO'),
                                                                                                                           'valor'         => Array(0 => 1,
                                                                                                                                                    1 => parent::parseStr(N),
                                                                                                                                                    2 => parent::parseStr($SERVICE['CODE']))),
                                                                                                       'limit'       => null,
                                                                                                       'PDO'         => $PDO,
                                                                                                       'BASE'        => null,
                                                                                                       'COMPLEMENTO' => null));

                                       return ($RESPONSE) ?  $RESPONSE : false;

                                break;

               endswitch;
          }









/**
 * PERSISTÊNCIA DA ENTIDADE, CUPOM.
 *
 * @param ENTIDADE DE CUPOM
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
    public function _PUT(EntitieCupom $CUPOM){

          $SERVICE = $CUPOM->getSERVICE();
          $ENTITIE = $CUPOM->getENTITIE();
          $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();


              switch ($SERVICE['OPERATION']):

                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'ALTERAR':

                                    # CODE ...

                          break;

             endswitch;
      }










/**
 * PERSISTÊNCIA DA ENTIDADE, CUPOM.
 *
 * @param ENTIDADE DE CUPOM
 * @access public
 * @return BOOLEAN/INTEGER  [SQL DROP]
 *
 */
    public function _DELETE(EntitieCupom $CUPOM){

          $SERVICE = $CUPOM->getSERVICE();
          $ENTITIE = $CUPOM->getENTITIE();
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
