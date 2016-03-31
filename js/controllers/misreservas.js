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
    $scope.btnDelete = false;
    $scope.btnGuardar = false;


    //cargo combo de usuarios
    $scope.getUsuarios = function()
    {
        var url = "../AngularProyecto/php/usuarios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.usuarios = response;
          
        });
    }

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
        var url = "../AngularProyecto/php/reserva.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.resers = response;
            $scope.sizeTable();
            
        });
    }

    $scope.save = function()
    {

        if ($scope.btnUpdate == 'false') 
        {
            var url = "../AngularProyecto/php/insert_reserva.php";
            $http.post(url,{'fechaInicio':$scope.actual.fechaInicio, 'usuario':$scope.actual.usuario, 'servicio':$scope.actual.servicio, 'hora':$scope.actual.hora, 'motivo':$scope.actual.motivo}).success(function(data, status, headers, config)
            {
                $scope.getReservas();
                $scope.showMessage("Guardado",true);
                $scope.isBtnNew(true);
                $scope.clean();
            });

        } else{
            var url = "../AngularProyecto/php/update_reserva.php";
            $http.post(url,{'codigo':$scope.actual.codigo, 'usuario':$scope.actual.usuario, 
                            'servicio':$scope.actual.servicio, 'fechaInicio':$scope.actual.fechaInicio, 
                            'hora':$scope.actual.hora, 'estado':$scope.actual.estado,
                            'motivo':$scope.actual.motivo}).success(function(data, status, headers, config)
            {
                $scope.getReservas();

                $scope.showMessage("Modificado",true);
                $scope.isBtnNew(true);
                $scope.clean();

            });            
        };
    }

    $scope.update = function(codigo)
    {
        $scope.isBtnNew(true);

        var url = "../AngularProyecto/php/get_reserva.php?codigo=" + codigo;
        $http.get(url).success(function(response)
        {

            $scope.actuales = response;
            $scope.actual.codigo = $scope.actuales[0].codigo;
            $scope.actual.usuario = $scope.actuales[0].usuario_codigo;
            $scope.actual.servicio = $scope.actuales[0].servicio_codigo;
            $scope.actual.fechaInicio = $scope.actuales[0].fechaInicio;
            $scope.actual.hora = $scope.actuales[0].hora;
            $scope.actual.estado = $scope.actuales[0].estado;
            $scope.actual.motivo = $scope.actuales[0].motivo;
            
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


    $scope.isBtnNew = function(state)
    {
        if (state == true)       //activa boton nuevo
        {   
            $scope.btnNew = false;
            $scope.btnSave = true;
            $scope.btnCancelar = true;
        }else{                   //desactiva boton nuevo
            $scope.btnNew  = true;
            $scope.btnSave = false;
            $scope.btnUpdate = false;
        }
    }

    
});