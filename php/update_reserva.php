<?php

	$data = json_decode(file_get_contents("php://input"));
	$codigo = $data->codigo;
	$usuario_codigo = $data->usuario_codigo;
	$servicio_codigo = $data->servicio_codigo;
	$fechaInicio = $data->fechaInicio;
	$hora = $data->horaInicio;
	$estado = $data->estado;
	$motivo = $data->motivo;

	include('conexion.php');
	$con = conexion();
	$sql="UPDATE `reserva`  SET usuario_codigo = '".$usuario_codigo."', servicio_codigo = '".$servicio_codigo.
		"', fechaInicio = '".$fechaInicio."', hora = '".$hora."', estado = '".$estado."', motivo = '".$motivo."' WHERE codigo = '".$codigo."'");

	$resultado = $con->query($sql);
	if ($resultado===true) {
		echo "ACTUALIZO CON EXITO!!";
	} else {
		echo "Error de actualizacion";
	}
?>
