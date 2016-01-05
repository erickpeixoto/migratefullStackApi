<?php
/**
* Classe Camada de Entidade - MVC
*
* @author Erick Eduardo Peixoto - erick@accon.com.br
* @version 1.0
* @copyright Accon Software Corporativo © 2015
* @access public
* @package Modelo de Entidade - MVC
* @example Classe de entidade de USUÁRIO
*/



class EntitieUsuario{


    //ATRIBUTOS ENCAPSULADOS
    private $ENTITIE = array('NAME' => 'AWE_CLIENTES_ECOMMERCE',
                             'ATTRIBUTES' => array());
    
    private $SERVICE = array( 'NAME'        => null,
                              'OPERATION'   => null,
                              'POST'        => null,
                              'FILE' => array( 'NAME'     => null,
                                               'TMP_NAME' => null));
    /**
     * Gets the value of ENTITIE.
     *
     * @return mixed
     */
    public function getENTITIE()
    {
        return $this->ENTITIE;
    }


    /**
     * Sets the value of ENTITIE.
     *
     * @param mixed $ENTITIE the e n t i t i e
     *
     * @return self
     */
    public function setENTITIE($ENTITIE)
    {
        $this->ENTITIE['ATTRIBUTES'] = $ENTITIE;
        return $this;
    }


    /**
     * Gets the value of SERVICE.
     *
     * @return mixed
     */
    public function getSERVICE()
    {
        return $this->SERVICE;
    }


    /**
     * Sets the value of SERVICE.
     *
     * @param mixed $SERVICE the s e r v i c e
     *
     * @return self
     */
    public function setSERVICE($SERVICE)
    {
        $this->SERVICE = $SERVICE;
        return $this;
    }

}