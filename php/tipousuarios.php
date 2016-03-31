<?php 

	include('conexion.php');

	$con = conexion();

	$resultado = $con->query("SELECT * FROM tipousuario");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}

	echo json_encode($datos);

 ?>