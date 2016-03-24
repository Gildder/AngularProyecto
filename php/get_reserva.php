<?php
	include('conexion.php');

	$con = conexion();
	
	$codigo = $_GET["codigo"];
	$resultado = $con->query("SELECT r.fechaInicio,r.motivo,r.estado,r.codigo,r.hora,s.codigo AS servicio_codigo,u.codigo AS usuario_codigo,u.apellido,u.nombre FROM reserva r,usuario u,servicio s WHERE r.servicio_codigo=s.codigo AND r.usuario_codigo=u.codigo AND r.codigo = '".$codigo."'");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>