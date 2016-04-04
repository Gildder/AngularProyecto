'use strict'
angular.module('angularRoutingApp')
.controller('reserva', function($scope, $http) {
    $scope.titulo = 'Reservas';
    $scope.currentPage = 0;//pagina actual
    $scope.pageSize = 4;//numero registros
    $scope.pages = [];//guardar numeros de paginas

    $scope.resers = [];
    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.usuario= "";
    $scope.actual.servicio = "";
    $scope.actual.fechaInicio = "";
    $scope.actual.hora = "";
    $scope.actual.estado = "";
    $scope.actual.motivo = "";

    //campos para gestionar botones
    $scope.btnNew = true;
    $scope.btnUpdate = false;
    $scope.btnCancel = false;
    $scope.btnSave = false;
    $scope.btnRegister = true;
   
    $scope.nombreCompleto= "Nombre completo cliente";

    

    //cargo combo de usuarios
    $scope.getUsuarios = function()
    {
        var url = "../AngularProyecto/php/usuarios_cliente.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.usuarios = response;
          
        });
    }

    //cargar combo de servicios
    $scope.getServicios = function()
    {
        var url = "../AngularProyecto/php/servicios_ofertados.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.servicios = response;
        });
    }

    $scope.getReservas = function()
    {
        var url = "../AngularProyecto/php/reserva_cliente.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.resers = response;
            $scope.sizeTable();
            
        });
    }

    $scope.save = function()
    {

        if ($scope.btnUpdate == false) 
        {
            var url = "../AngularProyecto/php/insert_reserva.php";
            $http.post(url,{'fechaInicio':$scope.actual.fechaInicio, 'usuario':$scope.actual.usuario, 'servicio':$scope.actual.servicio, 'hora':$scope.actual.hora, 'motivo':$scope.actual.motivo}).success(function(data, status, headers, config)
            {
                if (data == true) {
                    $scope.getReservas();
                    $scope.showMessage(true,'La reserva se guardo correctamente.', 1);
                    $scope.clean();
                }else{
                    $scope.showMessage(true,'La reserva no se pudo guardar correctamente.', 4);
                }
            });

        } 
    }

    $scope.confirmar = function(codigo)
    {
        if (!confirm("Deseas confirmar esta  " + codigo + " reserva ?")) {
            return;
        };

        var url = "../AngularProyecto/php/confirmar_reserva.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            if (data == true) {
                $scope.getReservas();
                $scope.showMessage(true,'La reserva se recepciono correctamente.', 1);
            }else{
                $scope.showMessage(true,'La reserva no se pudo recepcionar correctamente.', 4);

            }
        });
    }

    $scope.cancelar = function(codigo)
    {
        if (!confirm("Realmente quieres cancelar esta reserva " + codigo + " ?")) {
            return;
        };

        var url = "../AngularProyecto/php/cancel_reserva.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            if (data == true) {
                $scope.getReservas();
                $scope.showMessage(true,'La reserva se cancelo correctamente.', 1);
            }else{
                $scope.showMessage(true,'La reserva no se pudo cancelar correctamente.', 4);

            }
        });
    }

    $scope.buscarUsuarios = function(codigo){
         var url = "../AngularProyecto/php/get_usuario.php?codigo=" + codigo;
        $http.get(url).success(function(response)
        {
            $scope.actuales = response;

            $scope.nombreCompleto = $scope.actuales[0].nombre + " " + $scope.actuales[0].apellido;
        });
    }

    $scope.obtenerFechas = function(){
        var url = "../AngularProyecto/php/calcular_fechas.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.fechasSemana = response;
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

        $scope.btnUpdate = false;
        $scope.btnSave = false;
        $scope.btnNew = true;
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


    $scope.isBtnNew = function(state)
    {
        if (state == true)       //activa boton nuevo
        {   
            $scope.btnNew = false;
            $scope.btnSave = true;
            $scope.btnCancel = true;
        }else{                   //desactiva boton nuevo
            $scope.btnNew  = true;
            $scope.btnSave = false;
            $scope.btnUpdate = false;
            $scope.clean();
        }
    }


});