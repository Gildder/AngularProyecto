<?php 
	$data = json_decode(file_get_contents("php://input"));
	$nombre= $data->nombre;
	$descripcion = $data->descripcion;

	include('conexion.php');
	$con = conexion();

	$sql="INSERT INTO `servicio`(`nombre`, `descripcion`) "." VALUES ('" . $nombre . "', '" . $descripcion. "')";

	$resultado = $con->query($sql);
	
	if ($resultado===true) {
		echo "INSERTADO CON EXITO!!";
	} else {
		echo "Error de insersion";
	}
 ?>