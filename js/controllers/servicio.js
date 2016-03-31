'use strict'
angular.module('angularRoutingApp')
.controller('servicio', function($scope, $http) {
    $scope.titulo = 'Servicios';
    $scope.currentPage = 0;     //pagina actual
    $scope.pageSize = 4;        //numero registros
    $scope.pages = [];          //guardar numeros de paginas

    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.nombre= "";
    $scope.actual.descripcion = "";
    $scope.actual.estado = "";

    //campos para gestionar botones
    $scope.btnNew = true;
    $scope.btnUpdate = false;
    $scope.btnDelete = false;
    $scope.btnSave = false;
    $scope.message = false;
    $scope.operation = '';
    
    $scope.services = [];


    $scope.getServices = function()
    {
        var url = "../AngularProyecto/php/servicios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.services = response;
            $scope.sizeTable();
        });
    }

    
    $scope.save = function()
    {

        if ($scope.btnUpdate == 'false') 
        {
            var url = "../AngularProyecto/php/php/insert_servicio.php";
            $http.post(url,{'nombre':$scope.actual.nombre, 'descripcion':$scope.actual.descripcion}).success(function(data, status, headers, config)
            {
                $scope.getServices();
                $scope.showMessage("Guardado",true);
                $scope.isBtnNew(true);
                $scope.clean();
            });

        } else{
            var url = "../AngularProyecto/php/php/update_servicio.php";
            $http.post(url,{'codigo':$scope.actual.codigo, 'nombre':$scope.actual.nombre, 
                            'descripcion':$scope.actual.descripcion}).success(function(data, status, headers, config)
            {
                $scope.getServices();
                $scope.showMessage("Modificado",true);
                $scope.isBtnNew(true);
                $scope.clean();
            });            
        };
    }

    $scope.update = function(codigo)
    {
        $scope.isBtnNew(true);

        var url = "php/get_servicio.php?codigo=" + codigo;
        $http.get(url).success(function(response)
        {

            $scope.actuales = response;
            $scope.actual.codigo = $scope.actuales[0].codigo;
            $scope.actual.nombre = $scope.actuales[0].nombre;
            $scope.actual.descripcion = $scope.actuales[0].descripcion;
            
        });
    }

     $scope.delete = function(codigo)
    {
         if (!confirm("Realmente quieres elimnar este registro " + codigo + " ?")) {
            return;
        };

        var url = "../AngularProyecto/php/php/delete_servicio.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            $scope.getServices();
            $scope.showMessage("Eliminado",true);
        });
    }

    $scope.clean = function()
    {
        $scope.actual = {};
        $scope.actual.nombre= "";
        $scope.actual.descripcion = "";
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