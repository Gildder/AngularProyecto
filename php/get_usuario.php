<?php
	include('conexion.php');

	$con = conexion();
	
	$codigo = $_GET["codigo"];
	$resultado = $con->query("SELECT * FROM usuario WHERE codigo = '".$codigo."'");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>