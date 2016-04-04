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

	#calculo para obtener lista de dias *****************
	//arreglo de fechas de la semana actual
	$stackDate = array();


	//dia semana
	$dayWeek = date("w"); 	
	 
	 if ($dayWeek ==0) {
	 	$dayWeek = 7; 
	 }
	 $dayWeek = $dayWeek - 1; 


	for ($i=$dayWeek; $i <7 ; $i++) {
		$today = date('Y-m-d');
		#Calculando la fecha del primer dia de la semana
		$dateDay = strtotime ( '+'.$i.' day' , strtotime ( $today ) ) ;
		$dateDay = date ( 'Y-m-d' , $dateDay );

		switch ($i) {
		    case 0:
		        $day = "Lunes";
		        break;
		    case 1:
		        $day = "Martes";
		        break;
		    case 2:
		        $day = "Miercoles";
		        break;
		    case 3:
		        $day = "Jueves";
		        break;
		    case 4:
		        $day = "Viernes";
		        break;
	        case 5:
		        $day = "Sabado";
		        break;
	        case 6:
		        $day = "Domingo";
		        break;
		} 

		array_push($stackDate,$dateDay." - ".$day);
	}

	echo json_encode($stackDate);


?>