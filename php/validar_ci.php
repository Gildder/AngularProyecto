<?php
	include('conexion.php');

	$con = conexion();
	
	$ci = $_GET["ci"];
	$resultado = $con->query("SELECT * FROM usuario WHERE ci = '".$ci."'");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>