app.controller('controller1', function ($scope, servicePerson) {
    //const
    const classDown = "glyphicon glyphicon-arrow-down";
    const classUp = "glyphicon glyphicon-arrow-up";
    const columns = ['Id', 'Name', 'LastName', 'State', 'Age'];
    const columnStates = [classDown, classUp];

    $scope.divPerson = false;
    $scope.hidePersonId = true;
    $scope.person = {
        Id: 0,
        Name: "",
        LastName: "",
        State: "",
        Age: 0
    };
    $scope.Field = columns[0];
    $scope.Reverse = false;
    var oldColumn = 0;
    var oldColumnState = 0;
    $scope.ClassArr = [classDown, classDown, classDown, classDown, classDown];


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
        $scope.person.Id = person.Id;
        $scope.person.Name = person.Name;
        $scope.person.LastName = person.LastName;
        $scope.person.State = person.State;
        $scope.person.Age = person.Age;
        $scope.Action = "Update";
        $scope.divPerson = true;
        $scope.hidePersonId = false;
    }

    $scope.SortBy = function (column) {
        var newState = 0;
        if (oldColumn == column) {
            newState = oldColumnState == 0 ? 1 : 0;
            $scope.Reverse = !$scope.Reverse;
        } else {
            $scope.Reverse = false;
        }
        oldColumn = column;
        oldColumnState = newState;
        $scope.ClassArr = [classDown, classDown, classDown, classDown, classDown];
        $scope.ClassArr[column] = columnStates[newState];
        $scope.Field = columns[column];
    }

    $scope.addUpdatePerson = function () {

        var person = {
            Name: $scope.person.Name,
            LastName: $scope.person.LastName,
            State: $scope.person.State,
            Age: $scope.person.Age
        };
        var action = $scope.Action;

        if (action == "Update") {
            person.Id = $scope.person.Id;
            servicePerson.update(person).then(function (response) {
                getAllPersons();
                $scope.divPerson = false;
                $scope.hidePersonId = true;
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
        $scope.hidePersonId = true;
    }

    function myclear() {
        $scope.person = {
            Id: 0,
            Name: "",
            LastName: "",
            State: "",
            Age: 0
        };
    }

})