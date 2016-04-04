<?php
	$data = json_decode(file_get_contents("php://input"));
	$codigo = $data->codigo;

	include('conexion.php');
	$con = conexion();

	$sql="UPDATE reserva  SET  estado = '0' WHERE codigo = '".$codigo."'";

	$resultado = $con->query($sql);
	
	echo "$resultado";
?>