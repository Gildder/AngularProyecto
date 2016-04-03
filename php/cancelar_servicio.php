<?php

	$data = json_decode(file_get_contents("php://input"));
	$codigo = $data->codigo;

	include('conexion.php');
	$con = conexion();
	$sql="UPDATE servicio  SET estado = '0' WHERE codigo = '".$codigo."'";

	$resultado = $con->query($sql);
	if ($resultado===true) {
		echo true;
	} else {
		echo false;
	}
?>
