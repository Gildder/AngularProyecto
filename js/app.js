'use strict'
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'partials/inicio.html',
            controller  : 'main'
        })
        .when('/usuario', {
            templateUrl : 'partials/usuario.html',
            controller  : 'usuario'
        })
        .when('/servicio', {
            templateUrl : 'partials/servicio.html',
            controller  : 'servicio'
        })
        .when('/reserva', {
            templateUrl : 'partials/reserva.html',
            controller  : 'reserva'
        })
        .when('/servicios', {
            templateUrl : 'partials/ofertados.html',
            controller  : 'ofertados'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.filter('startFromGrid', function() 
{
    return function(input, start) 
    {
        start =+ start;
        return input.slice(start)
    }
});

