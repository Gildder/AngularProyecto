<?php

	$data = json_decode(file_get_contents("php://input"));
	$codigo = $data->codigo;
	$nombre = $data->nombre;
	$descripcion = $data->descripcion;

	include('conexion.php');
	$con = conexion();
	$sql="UPDATE servicio  SET nombre= '".$nombre."', descripcion = '".$descripcion."' WHERE codigo = '".$codigo."'";

	$resultado = $con->query($sql);
	if ($resultado===true) {
		echo "ACTUALIZO CON EXITO!!";
	} else {
		echo "Error de actualizacion";
	}
?>
