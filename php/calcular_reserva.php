<?php
	date_default_timezone_set("America/La_Paz");

	# Número entero que representa el día de la semana, de 0 (dom) a 6 (sab)
	$dayWeek = date("w"); 	
	 
	 if ($dayWeek !=0) {
	 	$dayWeek = $dayWeek - 1; //para tomar domingo como ultimo dia
	 }

	#Calculando la fecha del primer dia de la semana
	$today = date('Y-m-d');
	$dateStart = strtotime ( '-'.$dayWeek.' day' , strtotime ( $today ) ) ;
	$dateStart = date ( 'Y-m-d' , $dateStart );

	#Calculando la fecha del ultimo dia de la semana
	$dateEnd = strtotime ( '+6 day' , strtotime ( $dateStart ) ) ;
	$dateEnd = date ( 'Y-m-d' , $dateEnd );


	include('conexion.php');

	$con = conexion();
	
	$codigo = $_GET["codigo"];

	$sql = "SELECT count(*) as cantidad FROM reserva WHERE (fechaInicio BETWEEN '".$dateStart."'  AND '".$dateEnd."') AND usuario_codigo = ".$codigo. " AND estado = '1'";
	if($resultado = $con->query($sql)){

		while ($row = $resultado->fetch_assoc()) {
			$datos =  $row['cantidad'];
			echo $datos;
		}

	}


?>