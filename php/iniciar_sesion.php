<?php
	include('conexion.php');

	$con = conexion();
	
	$correo = $_GET["correo"];
	$contrasenia = $_GET["contrasenia"];

	$resultado = $con->query("SELECT * FROM usuario WHERE correo = 'strtolower('".$correo."') AND contrasenia = md5('".$contrasenia."') AND estado = '1'");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>