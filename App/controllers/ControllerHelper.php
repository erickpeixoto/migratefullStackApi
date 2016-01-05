<?php
/**
* Classe Camada de Controle - MVC
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015.
* @access public
* @package Controller - MVC
* @example Classe de Utilidades
*/

class ControllerHelper {
	
		public function setIntToArray($DATA){
				$RESPONSE =  array();
				foreach($DATA as $key => $getValue):
							array_push($RESPONSE, $getValue);
				endforeach;
				return $RESPONSE;
		}
		
		public function removeIndex($OBJECT){
						$RESPONSE = $OBJECT['DATA'];
						unset($RESPONSE[$OBJECT['INDEX']]);
						return $RESPONSE;
		}
		
		public function parsePost($OBJECT){
				parse_str($OBJECT, $POST);
				return $POST;
		}
	
		public function getView($DATA){
			$RESPONSE = explode('/', $DATA,-1);
			return $RESPONSE[1];
		}
		
		public function parseDate($DATA){
				$RESPONSE = explode('/', $DATA);
				return $RESPONSE[2].'-'.$RESPONSE[1].'-'.$RESPONSE[0];
		}
		
		public function returnInsert(ARRAY $DATA){
					print($DATA);
		}
		
		public function setHour($DATA){
			$RESPONSE = explode(':', $DATA);
			$RESPONSE[0] = substr($RESPONSE[0], -2);
			return $RESPONSE[0].':'.$RESPONSE[1];
		}
	
		public function setDate($DATA){
			$RESPONSE = explode('-', $DATA);
			$RESPONSE[2] = substr($RESPONSE[2], 0, 2);
			return $RESPONSE[2].'/'.$RESPONSE[1].'/'.$RESPONSE[0];
		}
	
		public function setGrupos($DATA){
						$RESPONSE = array();
				foreach ($DATA as $key => $getGrupo) {
						array_push($RESPONSE, $getGrupo['PGR_ID']);
				}		
				
				return implode(",",$RESPONSE);
		}
	
		public function unserializePOST($DATA){
							
					parse_str($DATA, $RESPONSE);
					return $RESPONSE;
		}
		
		public function get_client_ip() {
		   
			     $ipaddress = '';
		
		     if ($_SERVER['HTTP_CLIENT_IP'])
		         $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		     else if($_SERVER['HTTP_X_FORWARDED_FOR'])
		         $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		     else if($_SERVER['HTTP_X_FORWARDED'])
		         $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		     else if($_SERVER['HTTP_FORWARDED_FOR'])
		         $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		     else if($_SERVER['HTTP_FORWARDED'])
		         $ipaddress = $_SERVER['HTTP_FORWARDED'];
		     else if($_SERVER['REMOTE_ADDR'])
		         $ipaddress = $_SERVER['REMOTE_ADDR'];
		     else
		         $ipaddress = 'UNKNOWN';

		     return $ipaddress; 
		}

   	    public function parseStr($STR){

				return "'".$STR."'";
		}	

		public function setChangeItem($ADICIONAIS){

				$strItem = null;
				
				if(count($ADICIONAIS) > 0):
						
						foreach ($ADICIONAIS as $key => $getAdd):
								$strItem .= $getAdd['APELIDO'].'  ';
						endforeach;
				endif;

				    	return $strItem;
		}

		public function getValorAdd($ADICIONAIS){

				$VALORES = array();
				
				if(count($ADICIONAIS) > 0):
						
						foreach ($ADICIONAIS as $key => $getAdd):
								array_push($VALORES, $getAdd['VALOR']);	
						endforeach;
				endif;

				    	return array_sum($VALORES);
		}



	public function getComplemento($ITEM){

					$RESPONSE = array( 'ID_FRACAO'		=> $ITEM['FIRST'],
									   'APELIDO_FRACAO' => $ITEM['APELIDO_FRACAO'],
									   'ID_FRACAO' => $ITEM['ID_FRACAO']);
		
			return ($ITEM['FRACAO'] == 0.5) ? $RESPONSE : null;

	}



		public function getHour($DATA){

			$RESPONSE = explode(':', $DATA);
			$RESPONSE[0] = substr($RESPONSE[0], -2);
			return $RESPONSE[0].':'.$RESPONSE[1].':'.$RESPONSE[2];
		}




	public function setPrazo(array $DATA){

		
		   # ESPECIFICO OS FATORES DE CÁLCULO DO INTERVALO
			define('FATOR_ANO', (365 * 60 * 60 * 24));
			define('FATOR_MES', (30 * 60 * 60 * 24));
			define('FATOR_DIA', (60 * 60 * 24));
			define('FATOR_HORA', (60 * 60));
			define('FATOR_MINUTO', 60);


			$this->getHour($DATA['DATA_ABERTURA']);

			//# CALCULA A DIFERENÇA ENTRE AS DATAS
			$INTERVALO_HORAS   = (strtotime(($DATA['DATA_ENCERRAMENTO']) ? $DATA['DATA_ENCERRAMENTO'] : date('Y-m-d H:i:s') )) - (strtotime($DATA['DATA_ABERTURA']));
			$INTERVALO_DIAS    = (strtotime(($DATA['DATA_ENCERRAMENTO']) ? $DATA['DATA_ENCERRAMENTO'] : date('Y-m-d H:i:s') )) - (strtotime($DATA['DATA_ABERTURA']));
			$INTERVALO_MINUTOS =  strtotime($DATA['DATA_ABERTURA']) - strtotime(($DATA['DATA_ENCERRAMENTO']) ? $DATA['DATA_ENCERRAMENTO'] : date('Y-m-d H:i:s'));


								   $DIAS    = (floor($INTERVALO_DIAS / FATOR_DIA) > 0) ? floor($INTERVALO_DIAS / FATOR_DIA).' dia(s) ': null;
								   $HORAS   = (floor($INTERVALO_HORAS / FATOR_HORA) < 24 AND floor($INTERVALO_HORAS / FATOR_HORA) > 0) ? floor($INTERVALO_HORAS / FATOR_HORA).' hora(s) ': null;
								   $MINUTOS = ($HORAS == 0 AND $DIAS == 0) ?   ((abs(floor($INTERVALO_MINUTOS / FATOR_MINUTO)) == 0) ? 1 : abs(floor($INTERVALO_MINUTOS / FATOR_MINUTO))).' minuto(s) ': null;

					
							return $DIAS.$HORAS.$MINUTOS;	

	}


 // $TEMPO_DECORRIDO = ControllerFront::makeObj(PATH_CONTROLLER, "ControllerChamado")->setPrazo(array('DATA_ABERTURA'  => $getChamados['DT_ABERTURA'],
 //                                                                                                   'DATA_ENCERRAMENTO'  => $getChamados['DT_ENCERRAMENTO']));




		public function getMinDate($DATA){

		
			$RESPONSE = explode(':', $DATA[0]['DIFF']);
			return $RESPONSE[1];
		}
		
		
}  // END CLASS


