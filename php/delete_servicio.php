<?php
	$data = json_decode(file_get_contents("php://input"));
	$codigo = $data->codigo;

	include('conexion.php');
	$con = conexion();

	$sql="DELETE FROM servicio WHERE codigo = '".$codigo."'";

	$resultado = $con->query($sql);
	if ($resultado===true) {
		echo "ELIMINO CON EXITO!!";
	} else {
		echo "Error de eliminacion";
	}
?>