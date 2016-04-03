<?php
	include('conexion.php');

	$con = conexion();
	
	$codigo = $_GET["codigo"];
	$estado = $_GET["estado"];

	if ($estado >= 3) {
		$sql = "SELECT * FROM reserva WHERE usuario_codigo = '".$codigo."'";
	} else {
		$sql = "SELECT * FROM reserva WHERE usuario_codigo = '".$codigo."' AND estado = '".$estado."'";
	}
	
	$resultado = $con->query(");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}

	
	echo json_encode($datos);

?>