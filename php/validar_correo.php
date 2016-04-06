<?php
	include('conexion.php');

	$con = conexion();
	
	$correo = $_GET["correo"];
	$resultado = $con->query("SELECT * FROM usuario WHERE correo = '".$correo."'");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>