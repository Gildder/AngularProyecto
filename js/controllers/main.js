angularRoutingApp.controller('main', function($scope, $http, MyService) {  //MyService es un servicio
    $scope.titulo = 'Bienvenidos!';

    $scope.nickName= "Entrar";
    $scope.loginOut= "Registrar";
    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.nick= "";
    $scope.actual.contrasenia= "";
    $scope.actual.ci = "";
    $scope.actual.nombre = "";
    $scope.actual.apellido = "";
    $scope.actual.correo = "";
    $scope.actual.telefono = "";
    $scope.actual.tipousuario_id = "";

    $scope.actual.recordar = false;

    //campos para gestionar botones
    $scope.btnSesion = false;
    $scope.btnRegister = false;

    $scope.seeSesion = function()
    {
        if ($scope.btnSesion == true && $scope.nickName== "Entrar")       //activa boton 
        {
            $scope.btnSesion = false;
        }else{                   			//desactiva boton 
        	$scope.btnSesion = true;
        	$scope.btnRegister = false;
        }
    }

    $scope.seeRegister = function()
    {
        if ($scope.loginOut== "Salir") {return;}

        if ($scope.btnRegister == true)       //activa boton 
        {   
            $scope.btnRegister = false;
        }else{                   			//desactiva boton 
        	$scope.btnRegister = true;
        	$scope.btnSesion = false;
        }
    }


    $scope.iniSession = function()
    {

        if ($scope.session.nick == "") {
            $scope.nickName = "Entrar";
            $scope.loginOut = "Registrar";
        }else{
            $scope.nickName = MyService.object.nick;
            $scope.loginOut = "Salir  ";
        }
        //$scope.nickName = " Entrar";
        //$scope.loginOut = " Registrar";
    }


    $scope.entrar = function()
    {
        if ($scope.btnSesion == true  && $scope.loginOut== "Registrar") 
        {
            var url = "../AngularProyecto/php/iniciar_sesion.php?nick=" + $scope.actual.nick + "& contrasenia=" + $scope.actual.contrasenia;
            $http.get(url).success(function(response)
            {
                $scope.actuales = response;
                $scope.actual.codigo = $scope.actuales[0].codigo;
                $scope.actual.ci = $scope.actuales[0].ci;
                $scope.actual.nombre = $scope.actuales[0].nombre;
                $scope.actual.apellido = $scope.actuales[0].apellido;
                $scope.actual.correo = $scope.actuales[0].correo;
                $scope.actual.telefono = $scope.actuales[0].telefono;
                $scope.actual.nick = $scope.actuales[0].nick;
                $scope.actual.tipousuario_id = $scope.actuales[0].tipousuario_id;
                

                $scope.nickName = $scope.actuales[0].nick;
                $scope.loginOut = "Salir";


                //actualizamos servicio de la factory
                MyService.newObject($scope.actual.codigo, $scope.actual.correo, $scope.actual.nick, $scope.actual.tipousuario_id);
                $scope.session = MyService.object;

                //$scope.showMessage("Guardado",true);
            	$scope.btnSesion = false; //ocultar formulario de session
            });
            
        }else{
            alert('no conecto');
        }

    }

    $scope.closeSesion = function()
    {
        $scope.actual = {};
        $scope.actual.codigo= "";
        $scope.actual.nick= "";
        $scope.actual.contrasenia= "";
        $scope.actual.ci = "";
        $scope.actual.nombre = "";
        $scope.actual.apellido = "";
        $scope.actual.correo = "";
        $scope.actual.telefono = "";
        $scope.actual.tipousuario_id = "";
        
        $scope.nickName= "Registrar";

        //limpiamos el servicio de la factory
        MyService.iniciar();
        $scope.session = MyService.object;
    }


});