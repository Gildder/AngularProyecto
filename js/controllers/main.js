angularRoutingApp.controller('main', function($scope, $cookieStore, $http, $location, MyService) {  //MyService es un servicio
    $scope.titulo = 'Bienvenidos!';

    //variables de session
    $scope.loginIn= "Entrar";
    $scope.loginOut= "Registrar";
    $scope.isConect= 0;

    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.ci = "";
    $scope.actual.nombre = "";
    $scope.actual.apellido = "";
    $scope.actual.correo = "";
    $scope.actual.telefono = "";
    $scope.actual.nick= "";
    $scope.actual.contrasenia= "";
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
        }
        
    }


    $scope.iniciarSession = function()
    {
        if($scope.validarInicioSesion() == false){
            $scope.showMessage(true,'Por favor, Llenes todos los campos del formulario de registro.', 4);
            return;
        }else{
            $scope.hideMessage();
        }

        if ($scope.btnSesion == true) 
        {
            var url = "../AngularProyecto/php/iniciar_sesion.php?correo=" + $scope.actual.correo + "& contrasenia=" + $scope.actual.contrasenia;
            $http.get(url).success(function(response)
            {
                $scope.actuales = response;
                if ($scope.actual.tipousuario_id) {
                    $scope.showMessage(true,'Usuario o contraseña incorrectos.', 4);
                    return;
                } else{

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
                    $scope.clean();
                };


            });
            
        }else{
            alert('no conecto');
        }

    }

    $scope.registrar = function()
    {
        if($scope.validarRegistro() == false){
            $scope.showMessage(true,'Por favor, Llenes todos los campos del formulario de registro.', 4);
            return;
        }

        if ($scope.btnRegister == true) 
        {
            var url = "../AngularProyecto/php/registrar.php";
            $http.post(url,{'ci':$scope.actual.ci,'nombre':$scope.actual.nombre, 'apellido':$scope.actual.apellido, 'correo':$scope.actual.correo, 'telefono':$scope.actual.telefono, 'nick':$scope.actual.nick, 'contrasenia':$scope.actual.contrasenia}).success(function(data, status, headers, config)
            {
                //Se inicializa la aplicacion
                $location.path('/partials/inicio.html');
                $scope.showMessage(true,'El usuario se registro correctamente.', 1);
            });
            
            $scope.clean();
            
        }else{
            alert('no conecto');
        }
   
    }

    $scope.validarRegistro = function(){
        if ($scope.actual.ci =="" || $scope.actual.nombre =="" || $scope.actual.apellido =="" || $scope.actual.correo =="" || $scope.actual.telefono=="" || $scope.actual.nick=="" || $scope.actual.contrasenia == "") {
            return false;
        } else{
            return true;
        }
    }

    $scope.validarInicioSesion = function()
    {
        if ($scope.actual.correo =="" || $scope.actual.contrasenia == "") {
            return false;
        } else{
            return true;
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

        $scope.btnSesion = false;
        $scope.btnRegister = false;
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