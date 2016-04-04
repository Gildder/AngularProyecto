<?php
	include('conexion.php');

	$con = conexion();
	
	$codigo = $_GET["codigo"];
	$resultado = $con->query("SELECT * FROM reserva WHERE usuario_codigo = '".$codigo."' AND estado = 0");

	//$resultado = $con->query("SELECT * FROM reserva WHERE usuario_codigo = '".$codigo."' AND estado = 1");
	$resultado = $con->query("SELECT r.fechaInicio,r.motivo,IF(r.estado=1,'ACTIVO','INACTIVO')AS estado,
		r.codigo,r.hora,s.nombre AS servicio_codigo,
		u.nombre AS usuario_codigo,u.apellido,u.nombre 
		FROM reserva r,usuario u,servicio s 
		WHERE r.servicio_codigo=s.codigo AND r.usuario_codigo=u.codigo AND r.usuario_codigo = '".$codigo."' AND r.estado ='1'");
	
	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

?>