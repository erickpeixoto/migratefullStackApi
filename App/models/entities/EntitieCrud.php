<?php


/**
* Classe Camada de Modelo de Entidade- MVC
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015
* @access public
* @package Models - MVC
* @example Classe de Modelo de Entidade.
*/


class EntitieCrud{


    // REFATORING
    private $INSERT_ARGUMENTOS = Array();
    private $SELECT_ARGUMENTOS = Array();
    private $UPDATE_ARGUMENTOS = Array();
    private $DELETE_ARGUMENTOS = Array();




    /**
     * Gets the value of INSERT_ARGUMENTOS.
     *
     * @return mixed
     */
    public function getINSERT_ARGUMENTOS()
    {
        return $this->INSERT_ARGUMENTOS;
    }

    /**
     * Sets the value of INSERT_ARGUMENTOS.
     *
     * @param mixed $INSERT_ARGUMENTOS the i n s e r t_ a r g u m e n t o s
     *
     * @return self
     */
    public function setINSERT_ARGUMENTOS($INSERT_ARGUMENTOS)
    {
        $this->INSERT_ARGUMENTOS = $INSERT_ARGUMENTOS;

        return $this;
    }

    /**
     * Gets the value of SELECT_ARGUMENTOS.
     *
     * @return mixed
     */
        public function getSELECT_ARGUMENTOS(){
        return $this->SELECT_ARGUMENTOS;
    }



    /**
     * Sets the value of SELECT_ARGUMENTOS.
     *
     * @param mixed $SELECT_ARGUMENTOS the s e l e c t_ a r g u m e n t o s
     *
     * @return self
     */
        public function setSELECT_ARGUMENTOS($SELECT_ARGUMENTOS){

        $this->SELECT_ARGUMENTOS = $SELECT_ARGUMENTOS;
        return $this;
    }


    /**
     * Gets the value of UPDATE_ARGUMENTOS.
     *
     * @return mixed
     */
    public function getUPDATE_ARGUMENTOS()
    {
        return $this->UPDATE_ARGUMENTOS;
    }


    /**
     * Sets the value of UPDATE_ARGUMENTOS.
     *
     * @param mixed $UPDATE_ARGUMENTOS the u p d a t e_ a r g u m e n t o s
     *
     * @return self
     */
    public function setUPDATE_ARGUMENTOS($UPDATE_ARGUMENTOS)
    {
        $this->UPDATE_ARGUMENTOS = $UPDATE_ARGUMENTOS;

        return $this;
    }



    /**
     * Gets the value of DELETE_ARGUMENTOS.
     *
     * @return mixed
     */
    public function getDELETE_ARGUMENTOS()
    {
        return $this->DELETE_ARGUMENTOS;
    }


    /**
     * Sets the value of DELETE_ARGUMENTOS.
     *
     * @param mixed $DELETE_ARGUMENTOS the d e l e t e_ a r g u m e n t o s
     *
     * @return self
     */
    public function setDELETE_ARGUMENTOS($DELETE_ARGUMENTOS)
    {
        $this->DELETE_ARGUMENTOS = $DELETE_ARGUMENTOS;

        return $this;
    }



}// END CLASS
