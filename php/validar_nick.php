<?php
	include('conexion.php');

	$con = conexion();
	
	$nick = $_GET["nick"];
	$resultado = $con->query("SELECT * FROM usuario WHERE nick = '".$nick."'");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>