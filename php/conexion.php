<?php 
function conexion (){
	//configuracion de MySql
	global $DB_HOST;
	global $DB_USER;
	global $DB_PASS;
	global $DB_NAME;


	//Asignando datos de MySql
	$DB_HOST = 'localhost';
	$DB_USER = 'root';
	$DB_PASS = 'admin';
	$DB_NAME = 'reserva';


	$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
	if (mysqli_connect_errno()) {
		printf(error_db_connect());
		exit();
	}

	return $mysqli;
}
	
 ?>