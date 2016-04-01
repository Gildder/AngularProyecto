'use strict'
angular.module('angularRoutingApp')
.controller('reserva', function($scope, $http, $cookieStore) {
    $scope.titulo = 'Reservas';
    $scope.currentPage = 0;//pagina actual
    $scope.pageSize = 4;//numero registros
    $scope.pages = [];//guardar numeros de paginas

    $scope.resers = [];
    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.servicio = "";
    $scope.actual.fechaInicio = "";
    $scope.actual.hora = "";
    $scope.actual.estado = "";
    $scope.actual.motivo = "";

    //campos para gestionar botones
    $scope.btnDelete = false;


    //cargar combo de servicios
    $scope.getServicios = function()
    {
        var url = "../AngularProyecto/php/servicios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.servicios = response;
        });
    }

    $scope.getReservas = function()
    {
        $scope.user_codigo = $cookieStore.get('codigo');
        var url = "../AngularProyecto/php/get_misreservas.php?codigo=" + $scope.user_codigo;
        $http.get(url).success(function(response)
        {
            $scope.resers = response;
            $scope.sizeTable();
        });
    }

    

    $scope.delete = function(codigo)
    {
        if (!confirm("Realmente quieres elimnar este registro " + codigo + " ?")) {
            return;
        };

        var url = "../AngularProyecto/php/delete_reserva.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            console.log("Datos eliminados");
            $scope.operacion = "Eliminado";
            $scope.Mensaje = true;

            $scope.actual = {};
            $scope.getReservas();
        });
    }

    $scope.clean = function()
    {
        $scope.actual = {};
        $scope.actual.usuario= "";
        $scope.actual.servicio = "";
        $scope.actual.fechaInicio = "";
        $scope.actual.hora = "";
        $scope.actual.motivo = "";
    }

    $scope.sizeTable = function (){
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 1;
        var fin = $scope.currentPage + 1;
        if(ini < 1)
        {
            ini = 1;
            if(Math.ceil($scope.resers.length / $scope.pageSize) > 5)
            {
                fin = 5;
            }
            else
            {
                fin = Math.ceil($scope.resers.length / $scope.pageSize);
            }
        }
        else
        {
            if (ini >= Math.ceil($scope.resers.length / $scope.pageSize) - 5)
            {
                ini =  Math.ceil($scope.resers.length / $scope.pageSize) - 5;
                fin =  Math.ceil($scope.resers.length / $scope.pageSize);
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