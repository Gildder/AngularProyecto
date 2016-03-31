angularRoutingApp.controller('main', function($scope) {
    $scope.titulo = 'Bienvenidos!';
	$scope.session = [];

    $scope.actual = {};
    $scope.actual.id= "";
    $scope.actual.ci= "";
    $scope.actual.nombre= "";
    $scope.actual.correo= "";
    $scope.actual.nick= "";
    $scope.actual.contrasenia = "";
    $scope.actual.tipo = 0;
    $scope.actual.recordar = false;

    //campos para gestionar botones
    $scope.btnSesion = false;
    $scope.btnRegister = false;

    $scope.seeSesion = function()
    {
        if ($scope.btnSesion == true)       //activa boton 
        {
            $scope.btnSesion = false;
        }else{                   			//desactiva boton 
        	$scope.btnSesion = true;
        	$scope.btnRegister = false;
        }
    }

    $scope.seeRegister = function()
    {
        if ($scope.btnRegister == true)       //activa boton 
        {   
            $scope.btnRegister = false;
        }else{                   			//desactiva boton 
        	$scope.btnRegister = true;
        	$scope.btnSesion = false;
        }
    }

    $scope.entrar = function()
    {
        if ($scope.btnSesion == 'true') 
        {
            var url = "../AngularProyecto/php/php/iniciar_sesion.php";
            $http.post(url,{'nick':$scope.actual.nick, 'contrasenia':$scope.actual.contrasenia}).success(function(data, status, headers, config)
            {
            	$scope.session = data;
            	$scope.actual.id = $scope.session[0].id;
            	$scope.actual.ci= $scope.session[0].ci;
			    $scope.actual.nombre= $scope.session[0].nombre;
			    $scope.actual.correo= $scope.session[0].correo;
			    $scope.actual.nick= $scope.session[0].nick;
			    $scope.actual.contrasenia = $scope.session[0].contrasenia;
			    $scope.actual.tipo = $scope.session[0].tipousuario_id;
                $scope.enableNavigation();
                //$scope.showMessage("Guardado",true);
            	$scope.btnSesion = false; //ocultar formulario de session
            });
        }
    }

    $scope.enableNavigation = function()
    {

    }


});