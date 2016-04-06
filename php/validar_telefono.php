<?php
	include('conexion.php');

	$con = conexion();
	
	$telefono = $_GET["telefono"];
	$resultado = $con->query("SELECT * FROM usuario WHERE telefono = '".$telefono."'");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>