// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'pages/inicio.html',
            controller  : 'mainController'
        })
        .when('/usuario', {
            templateUrl : 'pages/usuario.html',
            controller  : 'usuarioController'
        })
        .when('/servicio', {
            templateUrl : 'pages/servicio.html',
            controller  : 'servicioController'
        })
        .when('/reserva', {
            templateUrl : 'pages/reserva.html',
            controller  : 'reservaController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {
    $scope.message = 'Hola, Raquet Club Urbarí !';
});

//Usuarios*********************************************************************
angularRoutingApp.controller('usuarioController', function($scope, $http) {
    $scope.message = 'Usuarios';
    $scope.currentPage = 0;//pagina actual
    $scope.pageSize = 5;//numero registros
    $scope.pages = [];//guardar numeros de paginas


    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.ci = "";
    $scope.actual.nombre= "";
    $scope.actual.apellido = "";
    $scope.actual.correo = "";
    $scope.actual.telefono = "";

    //campos para gestionar botones
    $scope.btnNuevo = true;
    $scope.btnEditar = false;
    $scope.btnEliminar = false;
    $scope.btnGuardar = false;

    $scope.Mensaje = false;
    $scope.operacion = '';

    $scope.setPage = function(index)
    {
        $scope.currentPage = index - 1;
    }

    $scope.getUsuarios = function()
    {
        var url = "php/usuarios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.users = response;

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
        });
    }


    $scope.guardar = function()
    {

        if ($scope.btnEditar == 'false') 
        {
            var url = "php/insert_usuario.php";
            $http.post(url,{'ci':$scope.actual.ci, 'nombre':$scope.actual.nombre, 'apellido':$scope.actual.apellido, 'correo':$scope.actual.correo, 'telefono':$scope.actual.telefono}).success(function(data, status, headers, config)
            {
                // alert('llega aqui');
                console.log("Datos Guardados");
                $scope.limpiar();
                $scope.getUsuarios();

                $scope.btnGuardar = false;
                $scope.btnEditar = false;
                $scope.btnNuevo  = true;

                $scope.operacion = "Guardado";
                $scope.Mensaje = true;
            });

        } else{
            var url = "php/update_usuario.php";
            $http.post(url,{'codigo':$scope.actual.codigo, 'ci':$scope.actual.ci, 
                            'nombre':$scope.actual.nombre, 'apellido':$scope.actual.apellido, 
                            'correo':$scope.actual.correo, 'telefono':$scope.actual.telefono}).success(function(data, status, headers, config)
            {
                console.log("Datos Editados");
                $scope.limpiar();
                $scope.getUsuarios();

                $scope.btnGuardar = false;
                $scope.btnEditar = false;
                $scope.btnNuevo  = true;

                $scope.operacion = "Modificado";
                $scope.Mensaje = true;
            });            
        };
    }

    $scope.editar = function(codigo)
    {
        $scope.btnEditar = true;
        $scope.btnNuevo  = false;

        var url = "php/get_usuario.php?codigo=" + codigo;
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

    $scope.eliminar = function(codigo)
    {
        if (!confirm("Realmente quieres elimnar este registro " + codigo + " ?")) {
            return;
        };

        var url = "php/delete_usuario.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            console.log("Datos eliminados");
            $scope.operacion = "Elimino";
            $scope.Mensaje = true;

            $scope.actual = {};
            $scope.getUsuarios();

            $scope.operacion = "Eliminado";
            $scope.Mensaje = true;
        });
    }


    $scope.nuevo = function()
    {
        $scope.btnNuevo = false;
        $scope.btnGuardar = true;
    }

    $scope.cancelar = function()
    {
        $scope.btnNuevo = true;
        $scope.btnEditar = false;
        $scope.btnEliminar = false;
        $scope.btnGuardar = false;
    }

    $scope.limpiar = function()
    {
        $scope.actual = {};
        $scope.actual.codigo= "";
        $scope.actual.ci = "";
        $scope.actual.nombre= "";
        $scope.actual.apellido = "";
        $scope.actual.correo = "";
        $scope.actual.telefono = "";
    }

    $scope.ocultarMensaje = function(nombre)
    {
       $scope.Mensaje = false;
    }


});


//Servicios*********************************************************************
angularRoutingApp.controller('servicioController', function($scope, $http) {
    $scope.message = 'Servicios';
    $scope.currentPage = 0;//pagina actual
    $scope.pageSize = 5;//numero registros
    $scope.pages = [];//guardar numeros de paginas

    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.nombre= "";
    $scope.actual.descripcion = "";

    //campos para gestionar botones
    $scope.btnNuevo = true;
    $scope.btnEditar = false;
    $scope.btnEliminar = false;
    $scope.btnGuardar = false;

    $scope.Mensaje = false;
    $scope.operacion = '';


    $scope.setPage = function(index)
    {
        $scope.currentPage = index - 1;
    }

    $scope.getServicios = function()
    {
        var url = "php/servicios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.servicios = response;

            $scope.pages.length = 0;
            var ini = $scope.currentPage - 1;
            var fin = $scope.currentPage + 1;
            if(ini < 1)
            {
                ini = 1;
                if(Math.ceil($scope.servicios.length / $scope.pageSize) > 5)
                {
                    fin = 5;
                }
                else
                {
                    fin = Math.ceil($scope.servicios.length / $scope.pageSize);
                }
            }
            else
            {
                if (ini >= Math.ceil($scope.servicios.length / $scope.pageSize) - 5)
                {
                    ini =  Math.ceil($scope.servicios.length / $scope.pageSize) - 5;
                    fin =  Math.ceil($scope.servicios.length / $scope.pageSize);
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
        });
    }

    
    $scope.guardar = function()
    {

        if ($scope.btnEditar == 'false') 
        {
            var url = "php/insert_servicio.php";
            $http.post(url,{'nombre':$scope.actual.nombre, 'descripcion':$scope.actual.descripcion}).success(function(data, status, headers, config)
            {
                // alert('llega aqui');
                console.log("Datos Guardados");
                $scope.limpiar();
                $scope.getServicios();

                $scope.btnGuardar = false;
                $scope.btnEditar = false;
                $scope.btnNuevo  = true;

                $scope.operacion = "Guardado";
                $scope.Mensaje = true;
            });

        } else{
            var url = "php/update_servicio.php";
            $http.post(url,{'codigo':$scope.actual.codigo, 'nombre':$scope.actual.nombre, 
                            'descripcion':$scope.actual.descripcion}).success(function(data, status, headers, config)
            {
                console.log("Datos Editados");
                $scope.limpiar();
                $scope.getServicios();

                $scope.btnGuardar = false;
                $scope.btnEditar = false;
                $scope.btnNuevo  = true;

                $scope.operacion = "Modificado";
                $scope.Mensaje = true;
            });            
        };
    }

    $scope.editar = function(codigo)
    {
        $scope.btnEditar = true;
        $scope.btnNuevo  = false;

        var url = "php/get_servicio.php?codigo=" + codigo;
        $http.get(url).success(function(response)
        {

            $scope.actuales = response;
            $scope.actual.codigo = $scope.actuales[0].codigo;
            $scope.actual.nombre = $scope.actuales[0].nombre;
            $scope.actual.descripcion = $scope.actuales[0].descripcion;
            
        });
    }

     $scope.eliminar = function(codigo)
    {
         if (!confirm("Realmente quieres elimnar este registro " + codigo + " ?")) {
            return;
        };

        var url = "php/delete_servicio.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            console.log("Datos eliminados");
            $scope.operacion = "Eliminado";
            $scope.Mensaje = true;

            $scope.actual = {};
            $scope.getServicios();
        });
    }

    
    $scope.nuevo = function()
    {
        $scope.btnNuevo = false;
        $scope.btnGuardar = true;
    }

    $scope.cancelar = function()
    {
        $scope.btnNuevo = true;
        $scope.btnEditar = false;
        $scope.btnEliminar = false;
        $scope.btnGuardar = false;
    }


    $scope.limpiar = function()
    {
        $scope.actual = {};
        $scope.actual.nombre= "";
        $scope.actual.descripcion = "";
    }

    $scope.ocultarMensaje = function(nombre)
    {
       $scope.Mensaje = false;
    }

});

///Reservas*********************************************************************
angularRoutingApp.controller('reservaController', function($scope, $http) {
    $scope.message = 'Reservas';
    $scope.currentPage = 0;//pagina actual
    $scope.pageSize = 5;//numero registros
    $scope.pages = [];//guardar numeros de paginas

    $scope.actual = {};
    $scope.actual.codigo= "";
    $scope.actual.usuario= "";
    $scope.actual.servicio = "";
    $scope.actual.fechaInicio = "";
    $scope.actual.hora = "";
    $scope.actual.estado = "";
    $scope.actual.motivo = "";

    //campos para gestionar botones
    $scope.btnNuevo = true;
    $scope.btnEditar = false;
    $scope.btnEliminar = false;
    $scope.btnGuardar = false;

    $scope.Mensaje = false;
    $scope.operacion = '';

    //cargo combo de usuarios
    $scope.getUsuarios = function()
    {
        var url = "php/usuarios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.usuarios = response;
          
        });
    }

    $scope.setPage = function(index)
    {
        $scope.currentPage = index - 1;
    }

    //cargar combo de servicios
    $scope.getServicios = function()
    {
        var url = "php/servicios.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.servicios = response;
        });
    }

    $scope.getReservas = function()
    {
        var url = "php/reserva.php";
        $http.get(url).success(function(response)   //funcoin http
        {
            $scope.reservas = response;

            $scope.pages.length = 0;
            var ini = $scope.currentPage - 1;
            var fin = $scope.currentPage + 1;
            if(ini < 1)
            {
                ini = 1;
                if(Math.ceil($scope.reservas.length / $scope.pageSize) > 5)
                {
                    fin = 5;
                }
                else
                {
                    fin = Math.ceil($scope.reservas.length / $scope.pageSize);
                }
            }
            else
            {
                if (ini >= Math.ceil($scope.reservas.length / $scope.pageSize) - 5)
                {
                    ini =  Math.ceil($scope.reservas.length / $scope.pageSize) - 5;
                    fin =  Math.ceil($scope.reservas.length / $scope.pageSize);
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
        });
    }

    $scope.guardar = function()
    {

        if ($scope.btnEditar == 'false') 
        {
            var url = "php/insert_reserva.php";
            $http.post(url,{'fechaInicio':$scope.actual.fechaInicio, 'usuario':$scope.actual.usuario, 'servicio':$scope.actual.servicio, 'hora':$scope.actual.hora, 'motivo':$scope.actual.motivo}).success(function(data, status, headers, config)
            {
                // alert('llega aqui');
                console.log("Datos Guardados");
                $scope.limpiar();
                $scope.getReservas();

                $scope.btnGuardar = false;
                $scope.btnEditar = false;
                $scope.btnNuevo  = true;

                $scope.Mensaje = true;
                $scope.operacion = "Guardado";
            });

        } else{
            var url = "php/update_reserva.php";
            $http.post(url,{'codigo':$scope.actual.codigo, 'usuario':$scope.actual.usuario, 
                            'servicio':$scope.actual.servicio, 'fechaInicio':$scope.actual.fechaInicio, 
                            'hora':$scope.actual.hora, 'estado':$scope.actual.estado,
                            'motivo':$scope.actual.motivo}).success(function(data, status, headers, config)
            {
                console.log("Datos Editados");
                $scope.limpiar();
                $scope.getReservas();

                $scope.btnGuardar = false;
                $scope.btnEditar = false;
                $scope.btnNuevo  = true;

                $scope.operacion = "Modificado";
                $scope.Mensaje = true;

            });            
        };
    }

    $scope.nuevo = function()
    {
        $scope.btnNuevo = false;
        $scope.btnGuardar = true;
    }

    $scope.cancelar = function()
    {
        $scope.btnNuevo = true;
        $scope.btnEditar = false;
        $scope.btnEliminar = false;
        $scope.btnGuardar = false;
    }

    $scope.editar = function(codigo)
    {
        $scope.btnEditar = true;
        $scope.btnNuevo  = false;

        var url = "php/get_reserva.php?codigo=" + codigo;
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

    $scope.eliminar = function(codigo)
    {
        if (!confirm("Realmente quieres elimnar este registro " + codigo + " ?")) {
            return;
        };

        var url = "php/delete_reserva.php?codigo=" + codigo;
        $http.post(url,{'codigo': codigo}).success(function(data, status, headers, config)
        {
            console.log("Datos eliminados");
            $scope.operacion = "Eliminado";
            $scope.Mensaje = true;

            $scope.actual = {};
            $scope.getReservas();
        });
    }

    $scope.limpiar = function()
    {
        $scope.actual = {};
        $scope.actual.usuario= "";
        $scope.actual.servicio = "";
        $scope.actual.fechaInicio = "";
        $scope.actual.hora = "";
        $scope.actual.motivo = "";
    }

    $scope.ocultarMensaje = function(nombre)
    {
       $scope.Mensaje = false;
    }




});

angularRoutingApp.filter('startFromGrid', function() 
{
    return function(input, start) 
    {
        start =+ start;
        return input.slice(start)
    }
});