const app = angular.module('BreweryApp', []);

app.controller('MainController', ['$http', function ($http) {
    this.brewery = [];
    this.createForm = {};
    this.test = "HELLLOOOOO";

    this.createBrewery = () => {
        console.log('Submit button works');
        $http({
            method: 'POST',
            url: '/brewery',
            data: this.createForm
        }).then(response => {
            this.brewery.push(response.data);
            console.table(response.data);
            this.createForm = {};
        }, error => {
            console.error(error)
        }).catch(err => console.log('Catch', err))
    }

    this.getBrewery = () => {
        $http({
            method: 'GET',
            url: '/brewery'
        }).then(response => {
            this.brewery = response.data
            this.breweries = this.brewery[0];
        }).catch(err => console.log(err));
    }
        
    this.deleteBrewery = (id) => {
            console.log('Deleting....');
            $http({
                method: 'DELETE',
                url: '/brewery/' + id
            }).then(response => {
                console.table(response.data);
                const removeByIndex = this.brewery.findIndex(brewery => brewery._id === id)

                this.brewery.splice(removeByIndex, 1);


                console.log('this is the array index number of the destination i want to delete: ', removeByIndex);
            }, error => {
                console.error(err.message)
            }).catch(err => console.error('Catch', err));
        
    }

    this.getBrewery();
}]);

app.controller('ReviewController', ['$http', function($http) {

    this.formdata = {};
    this.editdata = {};
    this.reviews = [];
    this.showedits = 1;
    this.currentuser = {};

    this.edit = (id) => {

        this.showedits = id;
    }

    this.allReview = () => {

        $http({ url: '/review', method: 'GET' })
            .then(response => {
                console.log(response.data);
                this.reviews = response.data
            }, err => {
                console.log(err.data.err);
                this.error = err.statusText;
            })
            .catch(err => console.log(err.message));
    }

    this.user = () => {

        $http({ url: '/user', method: 'GET' })
            .then(response => {
                console.log(response.data.username);
                this.currentuser = response.data.username;
            }, err => {
                console.log(err.data.err);
                this.error = err.statusText;
            })
            .catch(err => console.log(err.message));
    }

    this.addReview = () => {

        $http({ url: '/review', method: 'POST', data: this.formdata })
            .then(response => {
                console.log(response.data);
                this.reviews.push(response.data)
            }, err => {
                console.log(err.data.err);
                this.error = err.statusText;
            })
            .catch(err => console.log(err.message));
    }

    this.editReview = (id) => {

        $http({ url: '/review/' + id, method: 'PUT', data: this.editdata })
            .then(response => {
                console.log(response.data);
            }, err => {
                console.log(err.data.err);
                this.error = err.statusText;
            })
            .catch(err => console.log(err.message));
    }

    this.deleteReview = (id) => {

    $http({ url: '/review/' + id, method: 'DELETE' })
        .then(response => {

            console.log(this.reviews);

            const removeByIndex = this.reviews.findIndex(review => review._id === id)

                console.log(removeByIndex);
                this.reviews.splice(removeByIndex, 1);

        }, err => {

            console.log(err.data.err);
            this.error = err.statusText;

            console.log(this.reviews);

            const removeByIndex = this.reviews.findIndex(review => review._id === id)

                console.log(removeByIndex);
                this.reviews.splice(removeByIndex, 1);
        })
        .catch(err => console.log(err.message));
    }

    this.allReview();
    this.user();
}]);









    app.controller('AuthController', ['$http', function ($http) {

        this.loginUser = () => {
            $http({ url: '/sessions/login', method: 'post', data: this.loginForm })
                .then(response => {
                    console.log('Log in successful!');
                    this.user = response.data.user;
                }, err => {
                    console.log(err.data.err);
                    this.error = err.statusText;
                })
                .catch(err => this.error = 'Server broke?');
        };

        this.registerUser = () => {
            $http({ url: '/user', method: 'post', data: this.newUserForm })
                .then(response => {
                    console.log('Register successful!');
                    this.user = response.data.user;
                }, err => {
                    console.log(err.data.err);
                    this.error = err.statusText;
                })
                .catch(err => this.error = 'Something went wrong');
        };

    }]);
