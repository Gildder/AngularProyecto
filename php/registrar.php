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


	$respuesta = "";

	#validar CI**********************************
	$resultado = $con->query("SELECT * FROM usuario WHERE ci = '".$ci."'");

	$datos = array();
	while ($row = $resultado->fetch_assoc()) {$datos[] =  $row;	}

	if (count($datos)>0) { $respuesta = $respuesta."1-"; } else {$respuesta = $respuesta."0-"; }	

	#validar Telefono
	$resultado = $con->query("SELECT * FROM usuario WHERE telefono = '".$telefono."'");

	$datos = array();
	while ($row = $resultado->fetch_assoc()) {$datos[] =  $row;	}

	if (count($datos)>0) { $respuesta = $respuesta."1-"; } else {$respuesta = $respuesta."0-"; }	

	#validar correo
	$resultado = $con->query("SELECT * FROM usuario WHERE correo = lower('".$correo."')");

	$datos = array();
	while ($row = $resultado->fetch_assoc()) {$datos[] =  $row;	}

	if (count($datos)>0) { $respuesta = $respuesta."1-"; } else {$respuesta = $respuesta."0-"; }	

	#validar nick
	$resultado = $con->query("SELECT * FROM usuario WHERE nick = '".$nick."'");

	$datos = array();
	while ($row = $resultado->fetch_assoc()) {$datos[] =  $row;	}

	if (count($datos)>0) { $respuesta = $respuesta."1"; } else {$respuesta = $respuesta."0"; }	


	//insertar *****************************************

	if ($respuesta == "0-0-0-0") {

		$sql = "INSERT INTO `usuario` (`ci`, `nombre`, `apellido`, `correo`, `telefono`, `nick`, `contrasenia`, `tipousuario_id`) ".
		" VALUES ('" . $ci . "', '" . $nombre . "', '" . $apellido . "', '" . $correo . "', '" . $telefono. "', '" . $nick . "', md5('".$contrasenia."'), '3') ";

		$resultado = $con->query($sql);

		if ($resultado===true) {
			echo true;
		} else {
			echo "0-0-0-0";
		}
	} else {
		echo $respuesta;
	}
	
 ?>