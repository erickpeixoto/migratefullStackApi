<?php
/**
* Classe Camada de Modelo - MVC
*
* @author Erick Eduardo <erick@accon.com.br>
* @version 1.0
* @copyright Accon Software Corporativo © 2015.
* @access public
* @package Models - MVC
* @example Classe de Modelo de Persistência.
*/

abstract class DAOCrud {







public function InserirDAO(EntitieCrud $CRUD) {


		// OBJETO AUXILIAR
		$ARGUMENTOS = $CRUD->getINSERT_ARGUMENTOS();


		// TRATAMENTO PARA MONTAR A STRING PARA O PDO
		for($i = 0; $i < count ($ARGUMENTOS['colunas']); $i ++):

				$colunasPDO  .= ":".$ARGUMENTOS['colunas'][$i].",";


		endfor;
				//RETIRANDO O ÚLTIMO CARACTERE
				$colunasPDO  = substr($colunasPDO, 0, - 1);

				// SQL
				$sql = "INSERT INTO ".$this->setAtributo($ARGUMENTOS['tabelas'],",")."(".$this->setAtributo($ARGUMENTOS['colunas']," ,").")VALUES(".$colunasPDO.")";

		try {
				// PDO
				$PDO = $ARGUMENTOS['PDO'];
				$gravarDados = $PDO->prepare($sql);
				

		// ESTRUTURA DE REPETICAO - INSERT
		for($j = 0; $j < $i; $j ++):

				$gravarDados->bindValue ( $ARGUMENTOS['colunas'][$j], $ARGUMENTOS['valores'][$j] );
	    endfor;
	    		// EXECUÇÃO
				$gravarDados->execute ();

			
			// CHECAGEM INSERT
			if ($gravarDados->rowCount () == 1):

					return  array('return' => true, 'lastId' => $PDO->lastInsertId());

			 else:

					return false;
			endif;


		} catch ( PDOException $e ) {

					echo "Erro ao inserir dados " . $e->getMessage ();

		}

	} // INSERT END









	// ************************** METODO DE SELECAO********************************
	
	public function selecionarDAO(EntitieCrud $CRUD) {

		// OBJETO AUXILIAR
		$ARGUMENTOS = $CRUD->getSELECT_ARGUMENTOS();
		
		// PDO
		$PDO = $ARGUMENTOS['PDO'];
		
		// SQL
		 if(!is_null($ARGUMENTOS['join'])):
					
							$SQL = "SELECT ".$this->setAtributo($ARGUMENTOS['campos'],","). " FROM ".$this->setAtributo($ARGUMENTOS['tabelas'],",").$this->setJoin($ARGUMENTOS['join']);
				
					else:
				
							$SQL = "SELECT ".$this->setAtributo($ARGUMENTOS['campos'],","). " FROM ".$this->setAtributo($ARGUMENTOS['tabelas'],",")." ";
					endif;
				
		// WHERE
		if ($ARGUMENTOS['where'] != null):
						$SQL .= " WHERE ";
				for ($i=0; $i < count($ARGUMENTOS['where']['campo']); $i++):
						$SQL .= $ARGUMENTOS['where']['campo'][$i]."  ".$ARGUMENTOS['where']['op_comparacao'][$i]."  ".$ARGUMENTOS['where']['valor'][$i]."  ".$ARGUMENTOS['where']['op_logico'][$i]." ";
				endfor;
		 endif;
						$SQL.=  "  ".$ARGUMENTOS['COMPLEMENTO']. $LIMIT = (!is_null($ARGUMENTOS['limit'])) ? ' LIMIT '.$ARGUMENTOS['limit'] : null;
		
				// echo $SQL;
				
		 		try {
					// OPERAÇÕES PDO
					$EXECUTE 			 = $PDO->prepare($SQL);
					$EXECUTE->execute();
					$DATA_ARRAY 		 = $EXECUTE->fetchAll ( PDO::FETCH_ASSOC );
					$num_rows			 = COUNT($DATA_ARRAY);
	
					// RETURN
					return (COUNT($DATA_ARRAY) == 0) ? array() : $DATA_ARRAY;
			if(empty($num_rows)):	throw new PDOException ();	endif;
			} catch (Exception $e) {
						echo "Erro: ".$e->getMessage();
			}

	} // SELECIONAR END













	// *********************** MÉTODO UPDATE *****************************
	public function alterarDAO(EntitieCrud $CRUD) {

		// OBJETO AUXILIAR
		$ARGUMENTOS = $CRUD->getUPDATE_ARGUMENTOS();
		
				// WHERE
		if (!is_null($ARGUMENTOS['where'])):
						$WHERE .= " WHERE ";
				for ($i=0; $i < count($ARGUMENTOS['where']['campo']); $i++):
						$WHERE .= $ARGUMENTOS['where']['campo'][$i]."  ".$ARGUMENTOS['where']['op_comparacao'][$i]." ? ".$ARGUMENTOS['where']['op_logico'][$i]." ";
				endfor;
		 endif;
		// INSTRUÇÃO SQL
		$SQL = "UPDATE ".$this->setAtributo($ARGUMENTOS['tabelas'],","). " SET " .$this->setAtributo($ARGUMENTOS['colunas']," = ? ,").$WHERE;

		try {
			// PDO
			$PDO = $ARGUMENTOS['PDO'];
			$gravarDados = $PDO->prepare($SQL);
			$cont = count($ARGUMENTOS['colunas']);
		
		
				for ($i=0; $i < count($ARGUMENTOS['colunas']); $i++): 
			
							 $gravarDados->bindValue($i+1, $ARGUMENTOS['valores'][$i]);
				endfor;
							
								
				
				for ($i = 0; $i < count($ARGUMENTOS['where']['valor']); $i++): 
				
							 $gravarDados->bindValue(++$cont, $ARGUMENTOS['where']['valor'][$i]);
				endfor;
		
						$gravarDados->execute();
					    $affected = $gravarDados->rowCount();
			 // VERIFICAÇÃO
			if ($affected > 0):
					return true;
				else :
	
					return false;
			endif;
		} catch ( PDOException $e ) {
				echo "Erro ao alterar dados " . $e->getMessage ();
		}
	}//END UPDATE







	// ************************** METODO DE EXCLUSÃO ********************************
	public function deletarDAO(EntitieCrud $CRUD){


		// OBJETO AUXILIAR
		$ARGUMENTOS = $CRUD->getDELETE_ARGUMENTOS();
		// PDO
		$PDO = $ARGUMENTOS['PDO'];
		// SQL
		$SQL = "DELETE FROM ".$this->setAtributo($ARGUMENTOS['tabelas'],",")." ";
		// WHERE
		if ($ARGUMENTOS['where'] != null):
						$SQL .= " WHERE ";
				for ($i=0; $i < count($ARGUMENTOS['where']['campo']); $i++):
						$SQL .= $ARGUMENTOS['where']['campo'][$i]."  ".$ARGUMENTOS['where']['op_comparacao'][$i]."  ".$ARGUMENTOS['where']['valor'][$i]."  ".$ARGUMENTOS['where']['op_logico'][$i]." ";
				endfor;
		 endif;
		 		try {
					// OPERAÇÕES PDO
					$EXECUTE  = $PDO->prepare($SQL);
					$RESPONSE = $EXECUTE->execute();
					// RETURN
					return $RESPONSE;
			if(empty($num_rows)):	throw new PDOException ();	endif;
			} catch (Exception $e) {
						echo "Erro: ".$e->getMessage();
			}
	}//END DELETE








public function setAtributo(Array $DATA, $STRING){
	
		// ATRIBUTO RETURN
		$RETURN = null;
		for ($i=0; $i < count($DATA); $i++) {
				$RETURN .= $DATA[$i].$STRING;
		}
		return  substr($RETURN, 0, - 1);
}







public function setJoin(Array $DATA){
	
 				$RESPONSE = null;
		
		for ($j=0; $j < count($DATA); $j++) { 
		 		$RESPONSE .= ' INNER JOIN '.$DATA[$j]['tabela'].'  '. $DATA[$j]['indice']. ' ON ( ';
				$ON = $DATA[$j]['on'];
		
				for ($i=0; $i < count($ON); $i++) {
										$RESPONSE .= $ON[$i]['tabela'].'.'.$ON[$i]['campo'].' = ';
								}
									$RESPONSE = substr($RESPONSE, 0, -2);		
									$RESPONSE .= ' ) ';
	 	} 	
	
		return $RESPONSE;
}




} // CLASS END
