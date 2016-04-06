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
    $scope.btnCancelar = false;
    $scope.btnSave = false;
       
    $scope.users = [];

    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.ci = "";
    $scope.actual.tipousuario = "";
    $scope.actual.nombre= "";
    $scope.actual.apellido = "";
    $scope.actual.correo = "";
    $scope.actual.telefono = "";


    //tipo usuario
    $scope.getTipoUsuario = function()
    {
        var url = "../AngularProyecto/php/tipousuarios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.tipousuarios = response;
        });
    }

    $scope.getUsuarios = function()
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
        if ($scope.btnUpdate == false) 
        {
            var url = "../AngularProyecto/php/insert_usuario.php";
            $http.post(url,{'ci':$scope.actual.ci.toString(),'tipousuario_id':$scope.actual.tipousuario, 'nombre':$scope.actual.nombre,
             'apellido':$scope.actual.apellido, 'correo':$scope.actual.correo, 'telefono':$scope.actual.telefono.toString(), 'nick':$scope.actual.nombre, 'contrasenia':$scope.actual.ci}).success(function(data, status, headers, config)
            {
                if (data==true) {
                    $scope.showMessage(true,'El usuario se guardo correctamente.', 1);
                    $scope.clean();
                } else{
                    $scope.verificarInsert(data);
                    $scope.showMessage(true,'El usuario se No guardo correctamente.', 4);
                };
                $scope.getUsuarios();
            });

        } else{
            var url = "../AngularProyecto/php/update_usuario.php";
            $http.post(url,{'codigo':$scope.actual.codigo, 'ci':$scope.actual.ci,'tipousuario':$scope.actual.tipousuario, 
                            'nombre':$scope.actual.nombre, 'apellido':$scope.actual.apellido,'correo':$scope.actual.correo,
                            'telefono':$scope.actual.telefono}).success(function(data, status, headers, config)
            {
                if (data==true) {
                    $scope.showMessage(true,'El usuario se modifico correctamente.', 1);
                    $scope.clean();
                } else{
                    $scope.showMessage(true,'El usuario se No modifico correctamente.', 4);
                };
                $scope.getUsuarios();
                
            });            
        };
    }

    $scope.update = function(codigo)
    {
        $scope.isBtnNew(true);
        $scope.btnUpdate = true;

        var url = "../AngularProyecto/php/get_usuario.php?codigo=" + codigo;
        $http.get(url).success(function(response)
        {
            $scope.actuales = response;
            $scope.actual.codigo = $scope.actuales[0].codigo;
            $scope.actual.ci = parseInt($scope.actuales[0].ci);
            $scope.actual.tipousuario = $scope.actuales[0].tipousuario_id;
            $scope.actual.nombre = $scope.actuales[0].nombre;
            $scope.actual.apellido = $scope.actuales[0].apellido;
            $scope.actual.correo = $scope.actuales[0].correo;
            $scope.actual.telefono = parseInt($scope.actuales[0].telefono);
            $scope.actual.nick = $scope.actuales[0].nick;
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

            if (data==true) {
                $scope.showMessage(true,'El usuario se elimino correctamente.', 1);
            } else{
                $scope.showMessage(true,'El usuario No se elimino correctamente.', 4);
            };
            $scope.getUsuarios();
        });
    }

    $scope.baja = function(codigo)
    {
        if (!confirm("Deseas dar baja este usuario " + codigo + " ?")) {
            return;
        };

        var url = "../AngularProyecto/php/cancel_usuario.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            if (data==true) {
                $scope.showMessage(true,'Se realizo la baja correctamente.', 1);
            } else{
                $scope.showMessage(true,'No se realizo la baja correctamente.', 4);
            };
            $scope.getUsuarios();
        });
    }

    //retorn true si es valido
    $scope.validar = function()
    {
        if ($scope.actual.ci ==="" || $scope.actual.nombre ==="" || $scope.actual.apellido ==="" || $scope.actual.correo ==="" || $scope.actual.telefono==="") {
            $scope.showMessage(true,'Por favor, Llenes todos los campos del formulario de registro.', 4);
            return false;
        } else{
            $scope.validateCI();
            $scope.validatePhone();
            $scope.validateEmail();
            if ($scope.existCorreo == false || $scope.existCorreo == false || $scope.existCorreo == false) {
                return true;
            } else{
                return false;
            };

        }
    }

    $scope.cancel = function(){
        $scope.clean();
        $scope.hideMessage();
        


    }

    $scope.clean = function()
    {
        $scope.actual = {};
        $scope.actual.codigo= "";
        $scope.actual.ci = "";
        $scope.actual.tipousuario = "";
        $scope.actual.nombre= "";
        $scope.actual.apellido = "";
        $scope.actual.correo = "";
        $scope.actual.telefono = "";

        $scope.btnUpdate = false;
        $scope.btnCancelar = false;
        $scope.btnSave = false;
        $scope.btnNew = true;
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
            $scope.btnCancelar = false;
            $scope.btnSave = false;
            $scope.hideMessage();
            $scope.clean();

        }
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

   
});
