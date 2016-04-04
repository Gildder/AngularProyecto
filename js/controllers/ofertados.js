'use strict'
angular.module('angularRoutingApp')
.controller('ofertados', function($scope, $http, $cookieStore, $location) {
    $scope.titulo = 'Servicios ofertados';
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

    //campos para gestionar botones
    $scope.btnReserve = false;
    $scope.btnSeleccion =true;
    $scope.countReserve = 0;
    
    $scope.services = [];

    //cargar combo de servicios
    $scope.getServicios = function()
    {
        var url = "../AngularProyecto/php/servicios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.servicios = response;
            $scope.countReserve();
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
        
        if ($scope.isConect == 0) 
        {
            $scope.showMessage(true,'Por favor, Entra como usuario para poder realizar una reservacion.', 2);
        }else{
            $scope.hideMessage();
        }

        $scope.btnReserve = true;

        var url = "php/get_servicio.php?codigo=" + codigo;
        $http.get(url).success(function(response)
        {

            $scope.actuales = response;
            $scope.actual.servicio = $scope.actuales[0].codigo;
            
        });
    }

    $scope.save = function()
    {
        if ($scope.validarInsertarReserva()==false) {
            return;
        }
        $scope.user_codigo = $cookieStore.get('codigo');
         //alert($scope.user_codigo);
        var url = "../AngularProyecto/php/insert_reserva.php";
        $http.post(url,{'fechaInicio':$scope.actual.fechaInicio, 'usuario':$scope.user_codigo, 'servicio':$scope.actual.servicio, 'hora':$scope.actual.hora, 'motivo':$scope.actual.motivo}).success(function(data, status, headers, config)
        {
          
            $location.path('/misreservas');
            $scope.showMessage(true,'El usuario se guardo correctamente.', 1);
            $scope.clean();

        });
    }

    $scope.validarInsertarReserva = function()
    {
        $scope.user_codigo = $cookieStore.get('codigo');
        if ($scope.actual.fechaInicio ==="" || $scope.user_codigo ==="" || $scope.actual.servicio==="" || $scope.actual.hora ==="" || $scope.actual.motivo ==="") 
        {
            return false;
        } else{
            return true;
        }
    }

    $scope.countReserve = function(){
        var url = "../AngularProyecto/php/calcular_reserva.php?codigo=" + $cookieStore.get('codigo');
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.countReserve = response;

            if ($scope.countReserve == 2) {
                $scope.showMessage(true,'Su limite se reservas por semana esta completa', 3);
                $scope.btnSeleccion = false;
            }else{
                $scope.btnSeleccion = true;
            }
        });
    }

    $scope.obtenerFechas = function(){
        var url = "../AngularProyecto/php/calcular_fechas.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.fechasSemana = response;
        });
    }

    $scope.cancel = function()
    {
        $scope.btnReserve = false;
        $scope.hideMessage();
    }


    $scope.clean = function()
    {
        $scope.actual = {};
        $scope.actual.codigo= "";
        $scope.actual.nombre= "";
        $scope.actual.descripcion = "";
        $scope.actual.estado = "";
        $scope.actual.servicio = "";
        
        $scope.btnReserve =false;
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

});