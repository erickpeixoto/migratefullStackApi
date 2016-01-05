<?php
/**
* Classe Camada de Entidade - MVC
*
* @author Erick Eduardo Peixoto - erick@accon.com.br
* @version 0.1
* @copyright Accon Software Corporativo © 2015
* @access public
* @package Modelo de Entidade - MVC
* @example Classe de entidade.
*/
class EntitieView{
    //ATRIBUTOS ENCAPSULADOS
    private $POST = array();
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
}// END CLASS