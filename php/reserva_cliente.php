<?php 

	include('conexion.php');

	$con = conexion();

	$resultado = $con->query("SELECT r.fechaInicio,r.motivo,IF(r.estado=1,'ACTIVO','INACTIVO')AS estado,r.codigo,r.hora,s.nombre AS servicio_codigo,u.nombre AS usuario_codigo,u.apellido,u.ci FROM reserva r,usuario u,servicio s WHERE r.servicio_codigo=s.codigo AND r.usuario_codigo=u.codigo AND u.tipousuario_id = '3' AND r.estado = 1");

	$datos = array();

	while ($row = $resultado->fetch_assoc()) {
		$datos[] =  $row;
	}
	echo json_encode($datos);

 ?>