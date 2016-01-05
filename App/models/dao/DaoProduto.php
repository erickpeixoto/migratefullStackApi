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



abstract class DaoProduto {




/**
 * PERSISTÊNCIA DA ENTIDADE, PRODUTOS.
 *
 * @param ENTIDADE DE PRODUTOS
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public final function _POST(EntitieEmpresa $PRODUTO){

    
          $SERVICE = $PRODUTO->getSERVICE();
          $ENTITIE = $PRODUTO->getENTITIE();

            $PDO     = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerConexao")->getConnection();      
                     
              switch ($SERVICE['OPERATION']):
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - INSERT
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'INSERIR':
 
                                    array_push($SERVICE['POST'], date('Y-m-d H:i:s'));
                                    array_push($SERVICE['POST'], $_SESSION['USUARIO']);
                                    return ControllerFront::makeObj("App/controllers/", "ControllerCrud")->createData(array('tabelas' => Array (0 => $ENTITIE['NAME']),
                                                                                                                            'colunas'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                            'valores'  => ControllerFront::makeObj("App/controllers/", "ControllerHelper")->setIntToArray($SERVICE['POST']),
                                                                                                                            'PDO'      => $PDO));
                          break;
                  
                        
                endswitch;
      }
/**
 * PERSISTÊNCIA DA ENTIDADE, PRODUTOS.
 *
 * @param ENTIDADE DE PRODUTOS
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
  public final function _GET(EntitieProduto $PRODUTO){
   
          $SERVICE = $PRODUTO->getSERVICE();
          $ENTITIE = $PRODUTO->getENTITIE();
          $HELPER  = ControllerFront::makeObj("App/controllers/", "ControllerHelper");
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
                                
                               
                                  $GRUPOS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos' => array(0 => 'PGR_ID',
                                                                                                                                              1 => 'PGR_GRUPO'),
                                                                                                                           'tabelas' => array(0 => 'AWE_PRODUTO_GRUPOS_DB'),
                                                                                                                           'where'   =>  array('op_comparacao' => Array(0 => "="),
                                                                                                                                               'op_logico'     => null,
                                                                                                                                               'campo'         => Array(0 => 'PGR_MIXVENDA'),
                                                                                                                                               'valor'         => Array(0 => 1)),
                                                                                                                           'limit'   => null,
                                                                                                                           'PDO'     => $PDO,
                                                                                                                           'COMPLEMENTO' => 'ORDER BY PGR_ORDEM ASC'));
                             
                            
                                 $TIPOS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos' => array(0 => 'PTI_ID',
                                                                                                                                            1 => 'PTI_PGR_ID',
                                                                                                                                            2 => 'PTI_TIPO',
                                                                                                                                            3 => 'PTI_MENOR_FRACAO',
                                                                                                                                            4 => 'PTI_SIGLA',
                                                                                                                                            5 => 'PTI_ECOMMERCE_DEFAULT',
                                                                                                                                            6 => 'PTI_ECOMMERCE_IMG'),
                                                                                                                         'tabelas' => array(0 => 'AWE_PRODUTO_TIPOS_DB'),
                                                                                                                         'where'   => null,
                                                                                                                         'limit'   => null,
                                                                                                                         'PDO'     => $PDO,
                                                                                                                         'COMPLEMENTO' => null));
                                 
                                 $TAMANHOS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos' => array(0 => 'PTA_ID',
                                                                                                                                               1 => 'PTA_TAMANHO',
                                                                                                                                               2 => 'PTA_GRUPO',
                                                                                                                                               3 => 'PTA_TIPO',
                                                                                                                                               4 => 'PTA_SIGLA',
                                                                                                                                               5 => 'PTA_ECOMMERCE_DEFAULT',
                                                                                                                                               6 => 'PTA_ECOMMERCE_IMG',
                                                                                                                                               7 => 'PTA_ECOMMERCE_FATIAS'),
                                                                                                                            'tabelas' => array(0 => 'AWE_PRODUTO_TAMANHOS_DB'),
                                                                                                                            'where'   => null,
                                                                                                                            'limit'   => null,
                                                                                                                            'PDO'     => $PDO,
                                                                                                                            'COMPLEMENTO' => null));
                                         
                                  foreach (ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                           'tabelas' => array(0 => $ENTITIE['NAME']),
                                                                                                                           'where'   => array('op_comparacao' => Array(0 => "IN",
                                                                                                                                                                       1 => "="),
                                                                                                                                              'op_logico'     => Array(0 => "AND"),
                                                                                                                                              'campo'         => Array(0 => 'PRO_GRUPO',
                                                                                                                                                                       1 => 'PRO_ATIVO'),
                                                                                                                                              'valor'         => Array(0 => "(".$HELPER->setGrupos($GRUPOS).")",
                                                                                                                                                                       1 => "'S'")),
                                                                                                                            'limit'   => null,
                                                                                                                            'PDO'     => $PDO,
                                                                                                                            'COMPLEMENTO' => 'ORDER BY PRO_APELIDO_ECOMMERCE ASC'))  as $key => $getProduto):

                                $OPCIONAIS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  =>  array(0 => 'PTO_ID',
                                                                                                                                                 1 => 'PTO_APELIDO',
                                                                                                                                                 2 => 'PTO_VALOR_VENDA',
                                                                                                                                                 3 => 'PTO_APELIDO_ECOMMERCE'),
                                                                                                                             'tabelas' =>  array(0 => 'AWE_PRODUTOS_TOPPINGS_DB'),
                                                                                                                             'where'   =>  array('op_comparacao' => Array(0 => "="),
                                                                                                                                                 'op_logico'     => null,
                                                                                                                                                 'campo'         => Array(0 => 'PTO_GRUPO'),
                                                                                                                                                 'valor'         => Array(0 => $getProduto['PRO_GRUPO_TOPPING'])),
                                                                                                                              'limit'   => null,
                                                                                                                              'PDO'     => $PDO,
                                                                                                                              'COMPLEMENTO' => null));
                                                               
                                                          
                                                               
                                $RETIRADAS = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  =>  array(0 => 'PRE_ID',
                                                                                                                                                 1 => 'PRE_APELIDO'),
                                                                                                                             'tabelas' =>  array(0 => 'AWE_PRODUTOS_RECEITAS_DB'),
                                                                                                                             'where'   =>  array('op_comparacao' => Array(0 => "=",
                                                                                                                                                                         1 => "="),
                                                                                                                                                'op_logico'     => array(0 => "AND"),
                                                                                                                                                'campo'         => Array(0 => 'PRE_PRODUTO',
                                                                                                                                                                         1 => 'PRE_RETIRADO'),
                                                                                                                                                'valor'         => Array(0 => $getProduto['PRO_ID'],
                                                                                                                                                                         1 => 1)),
                                                                                                                            'limit'   => null,
                                                                                                                            'PDO'     => $PDO,
                                                                                                                            'COMPLEMENTO' => null));
                                                 
                               
                                                                    array_push($RETURN, array( 'PRODUTO'   => $getProduto,
                                                                                               'OPCIONAIS' => $OPCIONAIS,
                                                                                               'RETIRADAS' => $RETIRADAS));
                                                                       
                                      endforeach;         


                                    return array(
                                                    'PRODUTOS'  => $RETURN,
                                                    'GRUPOS'    => $GRUPOS,
                                                    'TIPOS'     => $TIPOS,
                                                    'TAMANHOS'  => $TAMANHOS
                                                );
                                     
                            break;
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT UPDATE
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'ONE':
                                  return ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                         'tabelas' => Array (0 => $ENTITIE['NAME']),
                                                                                                                          'where'   => array('op_comparacao' => array(0 => "="),
                                                                                                                                             'op_logico'     => null,
                                                                                                                                             'campo'         => array(0 => 'ID'),
                                                                                                                                             'valor'         => array(0 => $SERVICE['POST']['ID'])
                                                                                                                                            ),
                                                                                                                         'limit'   => null,
                                                                                                                         'PDO'     => $PDO,
                                                                                                                         'COMPLEMENTO' => null));
                            break;
                     
                     /**
                       * @example OPERAÇÃO DE PERSISTÊNCIA - SELECT ACCESS USER
                       * @return boolean
                       * @author @___erick
                       *
                       **/
                            case 'ACCESS':
                                  return ControllerFront::makeObj("App/controllers/", "ControllerCrud")->readData(Array ('campos'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                         'tabelas' => Array (0 => $ENTITIE['NAME']),
                                                                                                                          'where'   => array('op_comparacao' => array(0 => "="),
                                                                                                                                             'op_logico'     => null,
                                                                                                                                             'campo'         => array(0 => 'ID'),
                                                                                                                                             'valor'         => array(0 => $_SESSION['EMPRESA'])
                                                                                                                                            ),
                                                                                                                         'limit'   => null,
                                                                                                                         'PDO'     => $PDO,
                                                                                                                         'COMPLEMENTO' => null));
                            break;
           endswitch;
      }
/**
 * PERSISTÊNCIA DA ENTIDADE, EMPRESAS.
 *
 * @param ENTIDADE DE EMPRESAS
 * @access public
 * @return BOOLEAN/INTEGER
 *
 */
    public final function _PUT(EntitieEmpresa $EMPRESA){
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
                                      $RESPONSE = ControllerFront::makeObj("App/controllers/", "ControllerCrud")->updateData(array(
                                                                                                                               'tabelas'  => array(0 => $ENTITIE['NAME']),
                                                                                                                               'colunas'  => array_keys($ENTITIE['ATTRIBUTES']),
                                                                                                                               'valores'  => ControllerFront::makeObj("App/controllers/", "ControllerHelper")->setIntToArray($SERVICE['POST']),
                                                                                                                               'where'   =>  Array('op_comparacao' => array(0 => "="),
                                                                                                                                                   'op_logico'     => null,
                                                                                                                                                   'campo'         => array(0 => "ID"),
                                                                                                                                                   'valor'         => array(0 => $SERVICE['WHERE'])),
                                                                                                                                                   'PDO' => $PDO));
                             
                                       move_uploaded_file($SERVICE['FILE']['fake-file']['tmp_name'], PATH_PUBLIC.'img/logotipos/'.$SERVICE['POST']['logotipo']);
                                       return $RESPONSE;
                                    
                          break;
                endswitch;
      }
/**
 * PERSISTÊNCIA DA ENTIDADE, EMPRESAS.
 *
 * @param ENTIDADE DE EMPRESAS
 * @access public
 * @return BOOLEAN/INTEGER  [SQL DROP]
 *
 */
    public final function _DELETE(EntitieEmpresa $EMPRESA){
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
                                      $RESPONSE =  ControllerFront::makeObj(PATH_CONTROLLER, "ControllerCrud")->deleteData(array(
                                                                                                                                 'tabelas'  => array(0 => $ENTITIE['NAME']),
                                                                                                                                 'where'   =>  array('op_comparacao' => array(0 => "="),
                                                                                                                                                     'op_logico'     => null,
                                                                                                                                                     'campo'         => array(0 => 'ID'),
                                                                                                                                                     'valor'         => array(0 => $SERVICE['WHERE'])),
                                                                                                                                 'PDO' => $PDO));
                                              
                                             if($RESPONSE AND $SERVICE['POST']['POST']): unlink($_SERVER['DOCUMENT_ROOT'].'/App/views/public/img/logotipos/'.$SERVICE['POST']['POST']); endif;
                                              return $RESPONSE;
                          break;
           endswitch;
      }
} // CLASS END
