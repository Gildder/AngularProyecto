<?php 
	$data = json_decode(file_get_contents("php://input"));
	$ci= $data->ci;
	$tipousuario_id= $data->tipousuario_id;
	$nombre = $data->nombre;
	$apellido = $data->apellido;
	$correo = $data->correo;
	$telefono = $data->telefono;

	include('conexion.php');
	$con = conexion();

	#inserta usuario
	$sql="INSERT INTO `usuario`(`ci`,`tipousuario_id`, `nombre`, `apellido`, `correo`, `telefono`, `nick`, `contrasenia`) ".
		" VALUES ( lower('" . $ci . "'), '" . $tipousuario_id. "', lower('" . $nombre. "'), lower('" . $apellido. "'), lower('" . $correo . "'),'". $telefono. "', '" .$nombre. "', md5('" . $ci. "'))";

	$resultado = $con->query($sql);
	
	if ($resultado===true) {
		echo true;
	} else {
		echo false;
	}
 ?>