app.service('servicePerson', function($http) {
    this.getAllPersons = function() {
        return $http.get('api/Person/Get');
    }

    this.delete = function (id) {
        return $http.delete('api/Person/Delete/' + id);
    }

    this.update = function (person) {
       var response = $http({
            method: "put",
            url: "api/Person/Put",
            params: { id: person.Id, name: person.Name }
        });

        return response;

    }

    this.add = function (person) {
        return $http.post('api/Person/Post', JSON.stringify(person));

    }

})