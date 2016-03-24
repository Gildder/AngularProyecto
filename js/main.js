// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'pages/inicio.html',
            controller  : 'mainController'
        })
        .when('/usuario', {
            templateUrl : 'pages/usuario.html',
            controller  : 'usuarioController'
        })
        .when('/servicio', {
            templateUrl : 'pages/servicio.html',
            controller  : 'servicioController'
        })
        .when('/reserva', {
            templateUrl : 'pages/reserva.html',
            controller  : 'reservaController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {
    $scope.message = 'Hola, Raquet Club!';
});

//Usuarios*********************************************************************
angularRoutingApp.controller('usuarioController', function($scope, $http) {
    $scope.message = 'Usuarios';

    $scope.btnNuevo = true;
    $scope.btnGuardar = false;


    $scope.getUsuarios = function()
    {
        var url = "php/usuarios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.users = response;
        });
    }
});


//Servicios*********************************************************************
angularRoutingApp.controller('servicioController', function($scope, $http) {
    $scope.message = 'Servicios';

    $scope.btnNuevo = true;
    $scope.btnGuardar = false;


    $scope.getServicios = function()
    {
        var url = "php/servicios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.servicios = response;
        });
    }
});

///Reservas*********************************************************************
angularRoutingApp.controller('reservaController', function($scope, $http) {
    $scope.message = 'Reservas';
    $scope.currentPage = 0;//pagina actual
    $scope.pageSize = 5;//numero registros
    $scope.pages = [];//guardar numeros de paginas
    // $scope.users = [];
    // $scope.actuales = [];

    $scope.actual = {};
    $scope.actual.usuario= "";
    $scope.actual.servicio = "";
    $scope.actual.fechaInicio = "";
    $scope.actual.horaInicio = "";
    $scope.actual.motivo = "";

    //campos para gestionar botones
    $scope.btnNuevo = false;
    $scope.btnEditar = true;
    $scope.btnEliminar = true;
    $scope.btnGuardar = true;

    $scope.getReservas = function()
    {
        var url = "php/reserva.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.reservas = response;
        });
    }

    $scope.guardar = function()
    {
 /*   alert($scope.actual.fechaInicio);
    alert($scope.actual.usuario);
    alert($scope.actual.servicio);
    alert($scope.actual.horaInicio);
    alert($scope.actual.motivo);*/
        var url = "php/insert_reserva.php";
        $http.post(url,{'fechaInicio':$scope.actual.fechaInicio, 'usuario':$scope.actual.usuario, 'servicio':$scope.actual.servicio, 'horaInicio':$scope.actual.horaInicio, 'motivo':$scope.actual.motivo}).success(function(data, status, headers, config)
        {
            alert(data);
            // alert('llega aqui');
            console.log("Datos Guardados");
                $scope.actual = {};
    $scope.actual.usuario= "";
    $scope.actual.servicio = "";
    $scope.actual.fechaInicio = "";
    $scope.actual.horaInicio = "";
    $scope.actual.motivo = "";
            $scope.getReservas();
        });


    }

});