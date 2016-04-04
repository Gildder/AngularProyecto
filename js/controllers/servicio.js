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
    $scope.btnUpdate = false;
    $scope.btnCancelar = false;
    $scope.btnSave = false;
    $scope.btnNew = true;
    $scope.stateService = [{'id':'0', 'nombre': 'No ofertados'},{'id':'1', 'nombre': 'Ofertados'}];
    
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
        if($scope.validar() == false){
            $scope.showMessage(true,'Por favor, Llenes todos los campos del formulario de registro.', 4);
            return;
        }

        if ($scope.btnUpdate == false) 
        {
            var url = "../AngularProyecto/php/insert_servicio.php";
            $http.post(url,{'nombre':$scope.actual.nombre, 'descripcion':$scope.actual.descripcion}).success(function(data, status, headers, config)
            {
                $scope.getServices();
                $scope.showMessage(true,'El servicio se guardo correctamente.', 1);
                $scope.clean();
            });

        } else{
            var url = "../AngularProyecto/php/update_servicio.php";
            $http.post(url,{'codigo':$scope.actual.codigo, 'nombre':$scope.actual.nombre, 
                            'descripcion':$scope.actual.descripcion,'estado':$scope.actual.estado}).success(function(data, status, headers, config)
            {
                if (data == true) {
                    $scope.getServices();
                    $scope.showMessage(true,'El servicio se modifico correctamente.', 1);
                    $scope.clean();
                } else{
                    $scope.showMessage(true,'El servicio No modifico correctamente.', 4);
                };
            });            
        };
    }

    $scope.update = function(codigo)
    {
        $scope.isBtnNew(true);
        $scope.btnUpdate = true;

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

        var url = "../AngularProyecto/php/delete_servicio.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            if (data == true) {
                $scope.getServices();
                $scope.showMessage(true,'El servicio se elimino correctamente.', 1);
            }else{
                $scope.showMessage(true,'El servicio se pudo elimino correctamente.', 4);

            }
        });
    }

    $scope.cancelar = function(codigo)
    {
         if (!confirm("Realmente quieres cancelar este registro " + codigo + " ?")) {
            return;
        };

        var url = "../AngularProyecto/php/cancelar_servicio.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            if (data == true) {
                $scope.getServices();
                $scope.showMessage(true,'El servicio se cancelo correctamente.', 1);
            }else{
                $scope.showMessage(true,'El servicio No se pudo cancelar correctamente.', 4);

            }
        });
    }

    $scope.validar = function()
    {
        if ($scope.actual.nombre ==="" || $scope.actual.descripcion ==="") 
        {
            return false;
        } else{
            return true;
        }
    }

    $scope.cancel = function()
    {
        

        $scope.clean();
        $scope.hideMessage();

    }

    $scope.clean = function()
    {
        $scope.actual = {};
        $scope.actual.nombre= "";
        $scope.actual.descripcion = "";

        $scope.btnNew = true;
        $scope.btnSave = false;
        $scope.btnUpdate = false;
        $scope.btnCancelar = false;

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
            $scope.hideMessage();
        }
    }


});