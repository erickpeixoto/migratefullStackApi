<?php

/**
* Classe Camada de Modelo de Entidaddade- MVC
* Entidade COMBO
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015.
* @access public
* @package Models - MVC
* @example Classe de Modelo de Dao - Direct Access Object [Objeto de Acesso Direto].
*/



abstract class DaoCombo extends ControllerHelper{



/**
 * PERSISTÊNCIA DA ENTIDADE, USUÁRIO.
 *
 * @param ENTIDADE DE USUÁRIO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public function _POST(EntitieCombo $COMBO){

          $SERVICE = $COMBO->getSERVICE();
          $ENTITIE = $COMBO->getENTITIE();
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
 * PERSISTÊNCIA DA ENTIDADE, USUÁRIO.
 *
 * @param ENTIDADE DE USUÁRIO
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
      public function _GET(EntitieCombo $COMBO){

              $SERVICE   = $COMBO->getSERVICE();
              $ENTITIE   = $COMBO->getENTITIE();
              $PDO       = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();
              $RESPONSE  = array();
                  switch ($SERVICE['OPERATION']):


                         /**
                           * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT UPDATE
                           * @return boolean
                           * @author @___erick
                           *
                           **/
                                case 'ALL':


                                   $COMBOS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(
                                                                                                                Array ('campos'   => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                       'tabelas'  => Array (0 => $ENTITIE['NAME']),
                                                                                                                       'where'    => null,
                                                                                                                       'limit'       => null,
                                                                                                                       'PDO'         => $PDO,
                                                                                                                       'BASE'        => null,
                                                                                                                       'COMPLEMENTO' => null));

                                            print_r(Array ('campos'   => array_keys($ENTITIE['ATTRIBUTES']),
                                                   'tabelas'  => Array (0 => $ENTITIE['NAME']),
                                                   'where'    => null,
                                                   'limit'       => null,
                                                   'PDO'         => $PDO,
                                                   'BASE'        => null,
                                                   'COMPLEMENTO' => null)); 

                                        foreach ($COMBOS as $key => $getCombo):



                                                 $PROMO = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES_AUX']),
                                                                                                                                           'tabelas' => Array (0 => $ENTITIE['AUX']),
                                                                                                                                          'where'   =>  array('op_comparacao' => Array(0 => "="),
                                                                                                                                                              'op_logico'     => null,
                                                                                                                                                              'campo'         => Array(0 => 'CPR_CMD_ID'),
                                                                                                                                                              'valor'         => Array(0 => $getCombo['CMB_ID'])),
                                                                                                                                           'limit'   => null,
                                                                                                                                           'PDO'     => $PDO,
                                                                                                                                           'COMPLEMENTO' => null));

                                                 $ARROW_PRODUTOS  = array();
                                                 $COMBOS    = array();
                                                 $PRODUTOS  = array();
                                                 $QTD_ITENS = 100;
                                                 $ITENS = array();


                                              foreach ($PROMO as $key => $getPromo):


                                                        for ($i=1; $i <= $QTD_ITENS; $i++) {

                                                            if($getPromo['CPR_ITEM'] == $i){

                                                                       array_push($ARROW_PRODUTOS, $getPromo['CPR_ITEM']);
                                                                       array_push($COMBOS, $getPromo);
                                                            }
                                                        }

                                                endforeach;




                                                    foreach (array_count_values($ARROW_PRODUTOS) as $k => $totalItens) {

                                                                    $aux = array();

                                                                  foreach ($PROMO as $key => $getPromo):


                                                                        if(($k) == $getPromo['CPR_ITEM']){

                                                                                 array_push($aux, $getPromo);

                                                                          }


                                                             endforeach;

                                                                      array_push($ITENS, $aux);


                                                      }
                                                                           $getCombo['ITENS'] =  $ITENS;


                                                                            $TIPOS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(
                                                                                                                                Array ('campos'  => array(0 => 'COMBO.COP_TIPO',
                                                                                                                                                          1 => 'TIPO.PTI_ID',
                                                                                                                                                          2 => 'TIPO.PTI_ECOMMERCE_DEFAULT',
                                                                                                                                                          3 => 'TIPO.PTI_ECOMMERCE_IMG',
                                                                                                                                                          4 => 'TIPO.PTI_TIPO'),
                                                                                                                                       'tabelas' => Array (0 =>  'porphut_consolidado.AWE_COMBO_OPCOES_DB AS COMBO INNER JOIN porphut_consolidado.AWE_PRODUTO_TIPOS_DB AS TIPO ON COMBO.COP_TIPO = TIPO.PTI_ID'),
                                                                                                                                       'where'   =>  array('op_comparacao' => Array(0 => "="),
                                                                                                                                                           'op_logico'     => null,
                                                                                                                                                           'campo'         => Array(0 => 'COMBO.COP_CMB_ID'),
                                                                                                                                                           'valor'         => Array(0 => $getCombo['CMB_ID'])),
                                                                                                                                       'limit'       => null,
                                                                                                                                       'PDO'         => $PDO,
                                                                                                                                       'BASE'        => null,
                                                                                                                                       'COMPLEMENTO' => null));

                                                                            $TAMANHOS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(
                                                                                                                                Array ('campos'  =>  array(0 => 'TAMANHO.PTA_ID',
                                                                                                                                                           1 => 'TAMANHO.PTA_TAMANHO',
                                                                                                                                                           2 => 'TAMANHO.PTA_TIPO',
                                                                                                                                                           3 => 'TAMANHO.PTA_ECOMMERCE_DEFAULT',
                                                                                                                                                           4 => 'TAMANHO.PTA_ECOMMERCE_IMG',
                                                                                                                                                           5 => 'TAMANHO.PTA_ECOMMERCE_FATIAS',
                                                                                                                                                           6 => 'COMBO.COP_TAMANHO'),
                                                                                                                                       'tabelas' => Array (0 => 'porphut_consolidado.AWE_COMBO_OPCOES_DB AS COMBO INNER JOIN porphut_consolidado.AWE_PRODUTO_TAMANHOS_DB AS TAMANHO ON COMBO.COP_TAMANHO = TAMANHO.PTA_ID'),
                                                                                                                                       'where'   =>  array('op_comparacao' => Array(0 => "="),
                                                                                                                                                           'op_logico'     => null,
                                                                                                                                                           'campo'         => Array(0 => 'COMBO.COP_CMB_ID'),
                                                                                                                                                           'valor'         => Array(0 => $getCombo['CMB_ID'])),
                                                                                                                                       'limit'       => null,
                                                                                                                                       'PDO'         => $PDO,
                                                                                                                                       'BASE'        => null,
                                                                                                                                       'COMPLEMENTO' => null));

                                                                          $getCombo['TIPOS'] = $TIPOS;
                                                                          $getCombo['TAMANHOS'] = $TAMANHOS;

                                                                      array_push($RESPONSE, $getCombo);



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
    public function _PUT(EntitieCombo $COMBO){

          $SERVICE = $COMBO->getSERVICE();
          $ENTITIE = $COMBO->getENTITIE();
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
 * PERSISTÊNCIA DA ENTIDADE, COMBO.
 *
 * @param ENTIDADE DE COMBO
 * @access public
 * @return BOOLEAN/INTEGER  [SQL DROP]
 *
 */
    public function _DELETE(EntitieCombo $COMBO){

          $SERVICE = $COMBO->getSERVICE();
          $ENTITIE = $COMBO->getENTITIE();
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
