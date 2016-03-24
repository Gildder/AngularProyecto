<?php

	$data = json_decode(file_get_contents("php://input"));
	$codigo = $data->codigo;
	$usuario = $data->usuario;
	$servicio = $data->servicio;
	$fechaInicio = $data->fechaInicio;
	$hora = $data->hora;
	$estado = $data->estado;
	$motivo = $data->motivo;

	include('conexion.php');
	$con = conexion();
	$sql="UPDATE reserva  SET usuario_codigo = '".$usuario."', servicio_codigo = '".$servicio.
		"', fechaInicio = '".$fechaInicio."', hora = '".$hora."', estado = '".$estado.
		"', motivo = '".$motivo."' WHERE codigo = '".$codigo."'";

	$resultado = $con->query($sql);
	if ($resultado===true) {
		echo "ACTUALIZO CON EXITO!!";
	} else {
		echo "Error de actualizacion";
	}
?>
