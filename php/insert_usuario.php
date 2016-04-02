<?php 
	$data = json_decode(file_get_contents("php://input"));
	$ci= $data->ci;
	$tipousuario_id= $data->tipousuario_id;
	$nombre = $data->nombre;
	$apellido = $data->apellido;
	$correo = $data->correo;
	$telefono = $data->telefono;
	$nick = $data->nick;
	$contrasenia = $data->contrasenia;

	include('conexion.php');
	$con = conexion();



	$sql="INSERT INTO `usuario`(`ci`,`tipousuario_id`, `nombre`, `apellido`, `correo`, `telefono`, `nick`, `contrasenia`) ".
		" VALUES ('" . $ci . "', '" . $tipousuario_id. "', '" . $nombre. "', '" . $apellido. "', '" . $correo . "','". $telefono. "', '" .$nick. "', md5('" . $contrasenia. "'))";

	$resultado = $con->query($sql);
	
	if ($resultado===true) {
		echo "INSERTADO CON EXITO!!";
	} else {
		echo "Error de insersion";
	}
 ?>