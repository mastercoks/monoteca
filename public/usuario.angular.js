// public/angularApp.js

// Criamos um módulo Angular chamado listaUsuarios
const listaUsuarios = angular.module('listaUsuarios', []);

function mainController($scope, $http) {

    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function (){
        $http.get('/api/usuarios')
            .success(function(data) {
                $scope.usuarios = data;
                $scope.formUsuario = {};
                console.log("usuarios: ", data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    refresh();

    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarUsuario = function() {
        $http.post('/api/usuarios', $scope.formUsuario)
            .success(function(data) {
                // Limpa o formulário para criação de outros usuarios
                $scope.formUsuario = {};
                $scope.usuarios = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Ao clicar no botão Remover, deleta o usuario
    $scope.deletarUsuario = function(id) {
        $http.delete('/api/usuarios/' + id)
            .success(function(data) {
                $scope.usuarios = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Ao clicar no botão Editar, edita o usuario
    $scope.editarUsuario = function(id) {
        $http.get('/api/usuarios/' + id)
            .success(function(data) {
                $scope.formUsuario = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarUsuario = function() {
        $http.put('/api/usuarios/' + $scope.formUsuario._id, $scope.formUsuario)
        .success( function(response){
            refresh();
        });
    };

}
