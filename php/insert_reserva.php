<?php 
$data = json_decode(file_get_contents("php://input"));
// $fechaInicio= mysql_real_escape_string($data->fechaInicio);
// $motivo = mysql_real_escape_string($data->motivo);
// $servicio_codigo = mysql_real_escape_string($data->servicio);
// $usuario_codigo = mysql_real_escape_string($data->usuario);
// $hora = mysql_real_escape_string($data->hora);
$fechaInicio= $data->fechaInicio;
$motivo = $data->motivo;
$servicio_codigo = $data->servicio;
$usuario_codigo = $data->usuario;
$hora = $data->horaInicio;
	include('conexion.php');
	$con = conexion();
$sql="INSERT INTO `reserva`(`fechaInicio`, `motivo`, `servicio_codigo`, `usuario_codigo`, `hora`) ".
	" VALUES ('" . $fechaInicio . "', '" . $motivo. "','" . $servicio_codigo. "', '" . $usuario_codigo . "','" . $hora. "')";
$resultado = $con->query($sql);
	if ($resultado===true) {
		echo "INSERTADO CON EXITO!!";
	} else {
		echo "Error de insersion";
	}
 ?>