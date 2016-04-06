<?php

	$data = json_decode(file_get_contents("php://input"));
	$codigo = $data->codigo;
	$ci = $data->ci;
	$tipousuario = $data->tipousuario;
	$nombre = $data->nombre;
	$apellido = $data->apellido;
	$correo = $data->correo;
	$telefono = $data->telefono;

	include('conexion.php');
	$con = conexion();
	$sql="UPDATE usuario  SET ci = '".$ci."', tipousuario_id = '".$tipousuario."', nombre = '".$nombre.
		"', apellido = '".$apellido."', correo = '".$correo."', telefono = '".
		$telefono."' WHERE codigo = '".$codigo."'";

	$resultado = $con->query($sql);
	if ($resultado===true) {
		echo "ACTUALIZO CON EXITO!!";
	} else {
		echo "Error de actualizacion";
	}
?>
