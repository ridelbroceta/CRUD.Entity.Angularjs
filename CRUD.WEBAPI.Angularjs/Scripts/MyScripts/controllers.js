app.controller('controller1', function($scope, servicePerson) {
    $scope.divPerson = false;
    getAllPersons();

    function getAllPersons() {

        servicePerson.getAllPersons().then(function success(response) {
            $scope.persons = response.data;
            myclear();
            $scope.divPerson = false;
        }, function error() {
            alert('Error in getting records');
        });
    }

    $scope.deletePerson = function (person) {
        servicePerson.delete(person.Id).then(function success(response) {
            getAllPersons();
        }, function error() {
            alert('Error in deleting record');
        });
    }

    $scope.editPerson = function (person) {
        $scope.personId = person.Id;
        $scope.personName = person.Name;
        $scope.Action = "Update";
        $scope.divPerson = true;


    }

    $scope.addUpdatePerson = function () {

        var person = {
            Name: $scope.personName
        };
        var action = $scope.Action;

        if (action == "Update") {
            person.Id = $scope.personId;
            servicePerson.update(person).then(function (response) {
                getAllPersons();
                $scope.divPerson = false;
            }, function () {
                alert('Error in updating record');
            });
        }
        else {
            servicePerson.add(person).
            then(function (response) {
                getAllPersons();
                $scope.divPerson = false;
            }, function () {
                alert('Error in adding record');
            });
        }
        
    }

    $scope.addPerson = function () {
        myclear();
        $scope.Action = "Add";
        $scope.divPerson = true;
    }

    function myclear() {
        $scope.personId = "";
        $scope.personName = "";
    }

})