'use strict'
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute','ngCookies']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/inicio', {
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
        .when('/misreservas', {
            templateUrl : 'partials/misreservas.html',
            controller  : 'misreservas'
        })
        .when('/servicios', {
            templateUrl : 'partials/ofertados.html',
            controller  : 'ofertados'
        })
        .otherwise({
            redirectTo: '/inicio'
        });
});

angularRoutingApp.config(function($controllerProvider)
{
    $controllerProvider.allowGlobals();
});

angularRoutingApp.filter('startFromGrid', function() 
{
    return function(input, start) 
    {
        start =+ start;
        return input.slice(start)
    }
});

angularRoutingApp.filter('stateReserve', function() 
{
    return function(state) 
    {

        if (state==='RECEPCIONADO') {
            return true;
        } else{
            return false;
        };
    }
});


