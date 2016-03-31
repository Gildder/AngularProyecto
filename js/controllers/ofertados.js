'use strict'
angular.module('angularRoutingApp')
.controller('ofertados', function($scope, $http) {
    $scope.titulo = 'Servicios';
    $scope.currentPage = 0;     //pagina actual
    $scope.pageSize = 4;        //numero registros
    $scope.pages = [];          //guardar numeros de paginas

    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.usuario= "";
    $scope.actual.servicio = "";
    $scope.actual.fechaInicio = "";
    $scope.actual.hora = "";
    $scope.actual.estado = "";
    $scope.actual.motivo = "";
    $scope.actual.servicio = "";

    //campos para gestionar botones
    $scope.btnReserve = false;
    $scope.message = false;
    $scope.operation = '';
    
    $scope.services = [];

    //cargar combo de servicios
    $scope.getServicios = function()
    {
        var url = "../AngularProyecto/php/servicios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.servicios = response;
        });
    }

    $scope.getServicesOfertados = function()
    {
        var url = "../AngularProyecto/php/servicios_ofertados.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.services = response;
            $scope.sizeTable();
        });
    }

    $scope.seleccionar = function(codigo)
    {
        $scope.btnReserve = true;

        var url = "php/get_servicio.php?codigo=" + codigo;
        $http.get(url).success(function(response)
        {

            $scope.actuales = response;
            $scope.actual.servicio = $scope.actuales[0].codigo;
            
        });
    }

        //1 validas campos vacios
        //2 validar servicios disponibles por fecha
        //3 guardar servicio
    $scope.save = function()
    {
        alert($scope.actual.id);
        return;
        var url = "../AngularProyecto/php/insert_reserva.php";
        $http.post(url,{'fechaInicio':$scope.actual.fechaInicio, 'usuario':$scope.actual.usuario, 'servicio':$scope.actual.servicio, 'hora':$scope.actual.hora, 'motivo':$scope.actual.motivo}).success(function(data, status, headers, config)
        {
            $scope.getReservas();
            $scope.showMessage("Guardado",true);
            $scope.isBtnNew(true);
            $scope.clean();
        });
    }


    $scope.clean = function()
    {
        $scope.actual = {};
        $scope.actual.codigo= "";
        $scope.actual.nombre= "";
        $scope.actual.descripcion = "";
        $scope.actual.estado = "";
        $scope.actual.servicio = "";
    }

    $scope.sizeTable = function (){
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 1;
        var fin = $scope.currentPage + 1;
        if(ini < 1)
        {
            ini = 1;
            if(Math.ceil($scope.services.length / $scope.pageSize) > 5)
            {
                fin = 5;
            }
            else
            {
                fin = Math.ceil($scope.services.length / $scope.pageSize);
            }
        }
        else
        {
            if (ini >= Math.ceil($scope.services.length / $scope.pageSize) - 5)
            {
                ini =  Math.ceil($scope.services.length / $scope.pageSize) - 5;
                fin =  Math.ceil($scope.services.length / $scope.pageSize);
            }
        }       

        if (ini < 1)
        {
            ini = 1;
        }

        for (var i = ini; i <= fin; i++) 
        {
          $scope.pages.push({
            no: i
          });
        }

        if ($scope.currentPage >= $scope.pages.length)
        {
            $scope.currentPage = $scope.pages.length - 1;
        }

        $scope.currentPage = 0;
    }
   
    $scope.setPage = function(index)
    {
        $scope.currentPage = index - 1;
    }

    $scope.showMessage = function(action, state)
    {
        if (state == true) {       //muestra mensaje
            $scope.message = false;
        } else{                     //oculta mensaje
            $scope.message = true;
        };

        $scope.operation = action;
    }

});