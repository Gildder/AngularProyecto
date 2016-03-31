<?php
	$data = json_decode(file_get_contents("php://input"));
	$nick = $data->nick;
	$contrasenia = $data->contrasenia;

	include('conexion.php');
	$con = conexion();

	$sql="SELECT * FROM usuario WHERE nick = '".$codigo."' AND contrasenia = '".$contrasenia."'";

	$resultado = $con->query($sql);
	$datos = array();

	if ($resultado===true) {
		echo "INICIO CON EXITO!!";


		while ($row = $resultado->fetch_assoc()) {
			$datos[] =  $row;
		}

		echo json_encode($datos);
		
	} else {
		echo "Error de SESSION";
	}
?>