<?php
	include('conexion.php');

	$con = conexion();
	
	$correo = $_GET["correo"];
	$contrasenia = $_GET["contrasenia"];

	$correo = strtolower($correo);

	$resultado = $con->query("SELECT * FROM usuario WHERE correo = '".$correo."' AND contrasenia = '".$contrasenia."' AND estado = '1'");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>