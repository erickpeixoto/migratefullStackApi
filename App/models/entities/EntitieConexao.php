<?php
/**
* Classe Camada de Entidade - MVC
*
* @author Erick Eduardo Peixoto - erickeduardo@systemroot.com.br
* @version 1.0
* @copyright Accon Software Corporativo © 2015
* @access public
* @package Modelo de Entidade - MVC
* @example Classe de entidade de CONEXÃO.
*/


class EntitieConexao{


	//ATRIBUTOS ENCAPSULADOS
    private $POST = Array( 'DRIVER'   => null,
                           'HOST'     => null,
                           'BASE'     => null,
                           'USER'     => null,
                           'PASSWORD' => null);
  

    /**
     * Gets the value of POST.
     *
     * @return mixed
     */ 
        public function getPOST() {
        
            return $this->POST;
        }
  


    /**
     * Sets the value of POST.
     *
     * @param mixed $POST the p o s t
     *
     * @return self
     */
        public function setPOST($POST,$INDICE) {
        
            $this->POST[$INDICE] = $POST;
            return $this;
        }


        
}