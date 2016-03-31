'use strict'
angular.module('angularRoutingApp')
.factory("MyService", function() {
  	var session = 
  	{
  		object : {	codigo: "",
				    correo: "",
				    nick: "",
				    tipo : ""
				},

		//funciones
		iniciar: function()
		{
			session.object['codigo'] = "";
			session.object['correo'] = "";
			session.object['nick'] = "";
			session.object['tipo'] = "";
		},

		newObject: function(codigos, correos, nicks, tipos ){
			session.object.codigo = codigos;
			session.object.correo = correos;
			session.object.nick = nicks;
			session.object.tipo = tipos;
		}
  	}	
  	return session;
});