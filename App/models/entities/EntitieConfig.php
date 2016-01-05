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
   

    class EntitieConfig{
  	  
       //ATRIBUTOS ENCAPSULADOS
       private $ENTITIE = array('CONFIG' => array());
    
  
    /**
     * Gets the value of ENTITIE.
     * @return mixed
     */
        public function getCONFIG()
        {
            return $this->ENTITIE;
        }

        
    /**
     * Sets the value of ENTITIE.
     *
     * @param mixed $ENTITIE the e n t i t i e
     * @return self
     */
        public function setCONFIG($ENTITIE)
        {
            $this->ENTITIE['CONFIG'] = $ENTITIE;
            return $this;
        }
}