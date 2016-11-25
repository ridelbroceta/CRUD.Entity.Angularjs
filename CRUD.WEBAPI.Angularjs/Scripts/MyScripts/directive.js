app.directive('testDir', function () {
    return {
        restrict: 'E',
        templateUrl: '/Content/Templates/directive.html',
        scope: {
            action: "@",
            hideid: "=",
            id: "@",
            name: "=", //variables de alcance($scope) o por valor
            lastname: "=", //usado para hacer uso de data-binding(datos entre vista controlador) o por referencia
            state: "=",
            age: "=",
            clickaction: "&" //útiles para llamar a funciones
        }
    }
})
