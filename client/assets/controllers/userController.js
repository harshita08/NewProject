(function(){

	angular
		.module("myApp")
		.controller("userCtrl", userController);

		userController.$inject = ['userFactory', '$location'];

		function userController(userFactory, $location){
			var vm = this;
			vm.addUser = addUser;
			vm.newUser = {};

			// function getSession(){
			// 	userFactory.getSession(function(data){
			// 		vm.user = data.userInfo;
			// 		if (!vm.user){
			// 			$location.url('/');
			// 		}
			// 	})
			// }

			function addUser(){
				userFactory.addUser(vm.newUser, function(data){
					if(data.status){
						vm.user = data.userInfo;
						$location.url('/dashboard');
					} else{
						console.log("Error...");
					}
				});
			}

		}
})();