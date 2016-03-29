'use strict'

angular.module('angularRoutingApp')
.controller('usuario', function($scope, $http) {
    $scope.titulo = 'Usuarios';

     //variables para controlar el numero de elemntos de la tabla
    $scope.currentPage = 0;     //pagina actual
    $scope.pageSize = 4;        //numero registros
    $scope.pages = [];          //guardar numeros de paginas

    //campos para gestionar botones
    $scope.btnNew = true;
    $scope.btnUpdate = false;
    $scope.btnDelete = false;
    $scope.btnSave = false;
    $scope.message = false;
    $scope.operation = '';
    
    $scope.users = [];

    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.ci = "";
    $scope.actual.nombre= "";
    $scope.actual.apellido = "";
    $scope.actual.correo = "";
    $scope.actual.telefono = "";

    $scope.getUsers = function()
    {
        var url = "../AngularProyecto/php/usuarios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.users = response;
            $scope.sizeTable();
            
        });
    }


    $scope.save = function()
    {

        if ($scope.btnUpdate == 'false') 
        {
            var url = "../AngularProyecto/php/insert_usuario.php";
            $http.post(url,{'ci':$scope.actual.ci, 'nombre':$scope.actual.nombre, 'apellido':$scope.actual.apellido, 'correo':$scope.actual.correo, 'telefono':$scope.actual.telefono}).success(function(data, status, headers, config)
            {
                $scope.getUsuarios();
                $scope.showMessage("Guardado",true);
                $scope.isBtnNew(true);
                $scope.clean();
            });

        } else{
            var url = "../AngularProyecto/php/update_usuario.php";
            $http.post(url,{'codigo':$scope.actual.codigo, 'ci':$scope.actual.ci, 
                            'nombre':$scope.actual.nombre, 'apellido':$scope.actual.apellido, 
                            'correo':$scope.actual.correo, 'telefono':$scope.actual.telefono}).success(function(data, status, headers, config)
            {
                $scope.getUsuarios();
                $scope.showMessage("Modificado",true);
                $scope.isBtnNew(true);
                $scope.clean();
            });            
        };
    }

    $scope.update = function(codigo)
    {
        $scope.isBtnNew(true);

        var url = "../AngularProyecto/php/get_usuario.php?codigo=" + codigo;
        $http.get(url).success(function(response)
        {
            $scope.actuales = response;
            $scope.actual.codigo = $scope.actuales[0].codigo;
            $scope.actual.ci = $scope.actuales[0].ci;
            $scope.actual.nombre = $scope.actuales[0].nombre;
            $scope.actual.apellido = $scope.actuales[0].apellido;
            $scope.actual.correo = $scope.actuales[0].correo;
            $scope.actual.telefono = $scope.actuales[0].telefono;
        });
    }

    $scope.delete = function(codigo)
    {
        if (!confirm("Realmente quieres elimnar este registro " + codigo + " ?")) {
            return;
        };

        var url = "../AngularProyecto/php/delete_usuario.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            $scope.getUsuarios();
            $scope.showMessage("Eliminado",true);
        });
    }

    $scope.clean = function()
    {
        $scope.actual = {};
        $scope.actual.codigo= "";
        $scope.actual.ci = "";
        $scope.actual.nombre= "";
        $scope.actual.apellido = "";
        $scope.actual.correo = "";
        $scope.actual.telefono = "";
    }

    $scope.sizeTable = function (){
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 1;
        var fin = $scope.currentPage + 1;
        if(ini < 1)
        {
            ini = 1;
            if(Math.ceil($scope.users.length / $scope.pageSize) > 5)
            {
                fin = 5;
            }
            else
            {
                fin = Math.ceil($scope.users.length / $scope.pageSize);
            }
        }
        else
        {
            if (ini >= Math.ceil($scope.users.length / $scope.pageSize) - 5)
            {
                ini =  Math.ceil($scope.users.length / $scope.pageSize) - 5;
                fin =  Math.ceil($scope.users.length / $scope.pageSize);
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
