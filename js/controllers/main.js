angularRoutingApp.controller('main', function($scope, $cookieStore, $http, $location, MyService) {  //MyService es un servicio
    $scope.titulo = 'Bienvenidos!';

    //variables de session
    $scope.loginIn= "Entrar";
    $scope.loginOut= "Registrar";
    $scope.isConect= 0;
    $scope.isRecorder = true;

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
    $scope.btnSave = false;
    
    //ver contraseña
    $scope.typePass = 'password';
    $scope.icoPass = 'eye-open btn-success';
    $scope.verPass = false;


    //campos mensaje de alerta
    $scope.showMsg = false;
    $scope.typeMsg = 0;
    $scope.message = '';

    //campos para atributos repetidos
    $scope.existCI = false;
    $scope.existCorreo = false;
    $scope.existTelefono = false;
    $scope.existNick = false;


    //limpiar formualrio
    $scope.data = {
        nick: '',
        contrasenia: '',
        ci: '',
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
    };

    $scope.resetForm = function() {
        $scope.data.nick= '';
        $scope.data.contrasenia= '';
        $scope.data.ci= '';
        $scope.data.nombre= '';
        $scope.data.apellido= '';
        $scope.data.telefono= '';
        $scope.data.correo= '';
        registerForm.setUntouched();
      };

    //mostrar el formulario de session
    $scope.seeSesion = function()
    {

        if ($cookieStore.get('userName'))
        { 
            return;
        }

        if ($scope.btnSesion == true)       //activa boton 
        {
            $scope.btnSesion = false;
        }else{                              //desactiva boton 
            $scope.btnSesion = true;
            $scope.btnRegister = false;
        }
        $scope.clean();
        $scope.hideMessage();
    }

    //mostrar el formulario de registro, tambien para Salir session
    $scope.seeRegister = function()
    {

        if ($cookieStore.get('userName'))
        { 
            $scope.closeSession(); 
            $scope.inicializar(); 
            return;
        }
        
        if ($scope.btnRegister == true)       //activa boton 
        {   
            $scope.btnRegister = false;
        }else{                              //desactiva boton 
            $scope.btnRegister = true;
            $scope.btnSesion = false;
        }
        $scope.clean();
        $scope.hideMessage();
    }



    $scope.inicializar = function()
    {

        if (!$cookieStore.get('userName')) {
            $scope.loginIn = "Entrar";
            $scope.loginOut = "Registrar";
            $scope.actual.nick= "";
            $scope.isConect= 0;
            $scope.hideMessage();

        }else{
            $scope.loginIn = $cookieStore.get('userName');
            $scope.actual.nick= $cookieStore.get('userName');
            $scope.isConect= $cookieStore.get('tipo');
            $scope.loginOut = "Salir  ";
            
            //ocultamos la vista de los formualarios
        }
            $scope.btnSesion = false;
            $scope.btnRegister = false;
        
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
                if (response=="") {
                    $scope.showMessage(true,'Usuario o contraseña incorrectos.', 4);
                    return;
                }else{

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
                    if($cookieStore.get('tipo') == '1'){
                        $location.path('/usuario');
                    }else if($cookieStore.get('tipo') == '2'){
                        $location.path('/reserva');
                    }else{
                        $location.path('/ofertados');
                    }
                    $scope.clean();
                    $scope.inicializar();
                }


            });
            
        }else{
            alert('no conecto');
        }

    }

    $scope.registrar = function(form)
    {
        
        if ($scope.btnRegister == true) 
        {
            var url = "../AngularProyecto/php/registrar.php";
            $http.post(url,{'ci':$scope.actual.ci.toString(),'nombre':$scope.actual.nombre, 'apellido':$scope.actual.apellido, 
                'correo':$scope.actual.correo, 'telefono':$scope.actual.telefono.toString(), 
                'nick':$scope.actual.nick, 'contrasenia':$scope.actual.contrasenia}).success(function(data, status, headers, config)
            {
                if (data == true) {
                    //Se inicializa la aplicacion
                    $location.path('/partials/inicio.html');
                    $scope.clean();
                    $scope.inicializar();
                    $scope.showMessage(true,'El usuario se registro correctamente.', 1);
                    form_set_pristine(form);
                }else{
                    $scope.verificarInsert(data);
                    $scope.showMessage(true,'El usuario se No registro correctamente.', 4);
                };
            });
        }else{
            $scope.showMessage(true,'El usuario se No registrar verifique sus datos.', 4);
        }
        
    }

    $scope.verificarInsert = function(param)
    {
        alert(param);
        var res = param.split("-");
        alert(res[0]);

        if (res[0]=="0") {$scope.existCI = false; } else{$scope.existCI = true;};
        if (res[1]=="0") {$scope.existTelefono = false; } else{$scope.existTelefono = true;};
        if (res[2]=="0") {$scope.existCorreo = false; } else{$scope.existCorreo = true;};
        if (res[3]=="0") {$scope.existNick = false; } else{$scope.existNick = true;};
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

        $scope.existCI = false;
        $scope.existCorreo = false;
        $scope.existTelefono = false;
        $scope.existNick = false;

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

    $scope.seePass = function()
    {
        if ($scope.verPass == true) {
            $scope.typePass = 'text';
            $scope.icoPass = 'eye-close btn-danger';
            $scope.verPass = false;
        } else{
            $scope.typePass = 'password';
            $scope.icoPass = 'eye-open btn-success';
            $scope.verPass = true;
        }
    }

    $scope.hideMessage = function()
    {
        $scope.showMsg = false;
        $scope.typeMsg = '';
        $scope.message = '';

    }

  var form_set_pristine = function(form){
    // 2013-12-20 DF TODO: remove this function on Angular 1.1.x+ upgrade
    // function is included natively

    if(form.$setPristine){
        form.$setPristine();
    } else {
        form.$pristine = true;
        form.$dirty = false;
        angular.forEach(form, function (input, key) {
            if (input.$pristine)
                input.$pristine = true;
            if (input.$dirty) {
                input.$dirty = false;
            }
        });
    }
};


});