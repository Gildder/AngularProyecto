<?php 
	$data = json_decode(file_get_contents("php://input"));
	$ci= $data->ci;
	$tipousuario= $data->tipousuario;
	$nombre = $data->nombre;
	$apellido = $data->apellido;
	$correo = $data->correo;
	$telefono = $data->telefono;

	include('conexion.php');
	$con = conexion();

	$sql="INSERT INTO `usuario`(`ci`,`tipousuario_id`, `nombre`, `apellido`, `correo`, `telefono`) ".
		" VALUES ('" . $ci . "', '" . $tipousuario. "', '" . $nombre. "','" . $apellido. "', '" . $correo . "','" . $telefono. "')";

	$resultado = $con->query($sql);
	
	if ($resultado===true) {
		echo "INSERTADO CON EXITO!!";
	} else {
		echo "Error de insersion";
	}
 ?>