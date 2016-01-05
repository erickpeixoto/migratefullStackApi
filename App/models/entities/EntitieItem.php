<?php



/**
* Classe Camada de Entidade - MVC
*
* @author Erick Eduardo Peixoto - erickeduardo@accon.com.br
* @version 0.1
* @copyright Accon Software Corporativo © 2015
* @access public
* @package Modelo de Entidade - MVC
* @example Classe de entidade.
*/

    class EntitieItem{
	


     //ATRIBUTOS ENCAPSULADOS
      private $POST = array();
      private $SERVICE = array();
      private $ENTITIE = array('NAME'  => 'AWE_PEDIDOS_ITENS_DB_ECOMMERCE',
                               'ATTRIBUTES' => array());
    
                           
    /**
     * Gets the value of POST.
     *
     * @return mixed
     */
        public function getPOST()
        {
        
        return $this->POST;
        }
    /**
     * Sets the value of POST.
     *
     * @param mixed $POST the p o s t
     *
     * @return self
     */
        public function setPOST($POST)
        {
        
        $this->POST = $POST;
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

}