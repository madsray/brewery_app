<<<<<<< HEAD
// console.log("WORKING")

const app = angular.module ('BreweryApp', []);
app.controller('MainController', ['$http', function($http){
this.brewery = [];
this.createForm = {};
this.test="HELLLOOOOO";

this.createBrewery = () => {
  console.log('Submit button works');
$http({
  method: 'POST',
  url: '/brewery',
  data: this.createForm
}).then(response => {
  this.brewery.push(response.data);
  console.table(response.data);
  this.createForm={};
} , error => {
  console.error(error)
}).catch( err => console.log('Catch', err ))
}

this.getBrewery = () => {
  $http({ method: 'GET',
   url: '/brewery'
 }).then(response=>{
   this.brewery=response.data
   this.breweries = this.brewery[0];
 }).catch(err=> console.log(err));
}
this.getBrewery();

this.deleteBrewery= (id) => {
console.log('Deleting....');
  $http({
    method: 'DELETE',
    url: '/brewery/' + id
  }).then(response => {
    console.table(response.data);
    const removeByIndex = this.brewery.findIndex(brewery => brewery._id === id)

    this.brewery.splice(removeByIndex, 1);


    console.log('this is the array index number of the destination i want to delete: ', removeByIndex);
  }, error => { console.error(err.message)
  }).catch( err => console.error('Catch', err));
  }
}]);
=======
const app = angular.module('BreweryApp', []);

app.controller('MainController', ['$http', function ($http) {

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
>>>>>>> b18b534231f2c2da00d6bce79ba9babe08bc4b9f
