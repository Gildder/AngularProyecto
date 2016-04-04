<?php
	$data = json_decode(file_get_contents("php://input"));
	$codigo = $data->codigo;

	include('conexion.php');
	$con = conexion();
	//estados baja = 0, Activo 1, Confirmado 2
	$sql="UPDATE reserva  SET  estado = '2' WHERE codigo = '".$codigo."'";

	$resultado = $con->query($sql);
	
	echo "$resultado";
?>