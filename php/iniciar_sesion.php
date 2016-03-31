<?php
	include('conexion.php');

	$con = conexion();
	
	$nick = $_GET["nick"];
	$contrasenia = $_GET["contrasenia"];

	$resultado = $con->query("SELECT * FROM usuario WHERE nick = '".$nick."' AND contrasenia = '".$contrasenia."' AND estado = '1'");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>