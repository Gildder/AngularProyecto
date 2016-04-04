<?php 
	$data = json_decode(file_get_contents("php://input"));
	$fechaInicio= $data->fechaInicio;
	$motivo = $data->motivo;
	$servicio_codigo = $data->servicio;
	$usuario_codigo = $data->usuario;
	$hora = $data->hora;

	include('conexion.php');
	$con = conexion();

	$sql="INSERT INTO `reserva`(`fechaInicio`, `motivo`, `servicio_codigo`, `usuario_codigo`, `hora`) ".
		" VALUES ('" . $fechaInicio . "', '" . $motivo. "','" . $servicio_codigo. "', '" . $usuario_codigo . "','" . $hora. "')";

	$resultado = $con->query($sql);
	
	if ($resultado===true) {
		echo true;
	} else {
		echo false;
	}
 ?>