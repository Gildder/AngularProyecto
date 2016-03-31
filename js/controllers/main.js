angularRoutingApp.controller('main', function($scope, $cookieStore, $http, $location, MyService) {  //MyService es un servicio
    $scope.titulo = 'Bienvenidos!';

    //variables de session
    $scope.loginIn= "Entrar";
    $scope.loginOut= "Registrar";
    $scope.isConect= 0;



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

    //campos para gestionar botones
    $scope.btnSesion = false;
    $scope.btnRegister = false;

    //campos mensaje de alerta
    $scope.showMsg = false;
    $scope.typeMsg = 0;
    $scope.message = '';

    //mostrar el formulario de session
    $scope.seeSesion = function()
    {
        $scope.hideMessage();

        if ($cookieStore.get('userName'))
        { 
            return;
        }

        if ($scope.btnSesion == true)       //activa boton 
        {
            $scope.btnSesion = false;
        }else{                   			//desactiva boton 
        	$scope.btnSesion = true;
        	$scope.btnRegister = false;
        }
        
    }

    //mostrar el formulario de registro, tambien para Salir session
    $scope.seeRegister = function()
    {
        $scope.hideMessage();

        if (!$cookieStore.get('userName'))
        { 
            if ($scope.btnRegister == true)       //activa boton 
            {   
                $scope.btnRegister = false;
            }else{                   			//desactiva boton 
            	$scope.btnRegister = true;
            	$scope.btnSesion = false;
            }
        }else{
            $scope.closeSession(); 
            $scope.inicializar(); 

        }
    }



    $scope.inicializar = function()
    {

        if (!$cookieStore.get('userName')) {
            $scope.loginIn = "Entrar";
            $scope.loginOut = "Registrar";
            $scope.isConect= 0;
            $scope.hideMessage();

        }else{
            $scope.loginIn = $cookieStore.get('userName');
            $scope.isConect= $cookieStore.get('tipo');
            $scope.loginOut = "Salir  ";
            
            //ocultamos la vista de los formualarios
            $scope.btnSesion = false;
            $scope.btnRegister = false;
        }
    }


    $scope.iniciarSession = function()
    {
        if ($scope.btnSesion == true) 
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
                
                //Guardamos el usuario el la coockies
                $cookieStore.put('tipo', $scope.actual.tipousuario_id);
                $cookieStore.put('userName', $scope.actual.nick);
                $cookieStore.put('codigo', $scope.actual.codigo);

                //Se inicializa la aplicacion
                $scope.inicializar();
                $location.path('/partials/inicio.html');


            });
            
        }else{
            alert('no conecto');
        }

    }

    $scope.closeSession = function()
    {
        //Eliminamos las coockies
        $cookieStore.remove('tipo');
        $cookieStore.remove('userName');
        $cookieStore.remove('codigo');

        $location.path('/partials/inicio.html');

        $scope.clean();
        $scope.inicializar();
    }

    $scope.clean = function()
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
    }

    $scope.showMessage = function(show, message, type)
    {
       $scope.showMsg = show;
       $scope.message = message;

       if (type == 1) {     //bien - verde
            $scope.typeMsg = 'success';
       }else if (type == 2) //atento - azul
       {
            $scope.typeMsg = 'info';
       }else if (type == 3) //cuidado - amarrillo
       {
            $scope.typeMsg = 'warning';
       }else if(type == 4){               //Error - rojo
            $scope.typeMsg = 'danger';
       }
    }

    $scope.hideMessage = function()
    {
        $scope.showMsg = false;
        $scope.typeMsg = '';
        $scope.message = '';

    }

});