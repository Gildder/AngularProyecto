<?php 
	$data = json_decode(file_get_contents("php://input"));
	$ci = $data->ci;
	$nombre = $data->nombre;
	$apellido = $data->apellido;
	$correo = $data->correo;
	$telefono = $data->telefono;
	$nick= $data->nick;
	$contrasenia = $data->contrasenia;

	include('conexion.php');
	$con = conexion();

	$sql="INSERT INTO `usuario` (`ci`, `nombre`, `apellido`, `correo`, `telefono`, `nick`, `contrasenia`, `tipousuario_id`) ".
	" VALUES ('" . $ci . "', ucwords('" . $nombre . "'), ucwords('" . $apellido . "'), strtolower('" . $correo . "'), '" . $telefono. "', '" . $nick . "', md5('" . $contrasenia. "'), '3') ";

	$resultado = $con->query($sql);
	
	return $resultado;
 ?>