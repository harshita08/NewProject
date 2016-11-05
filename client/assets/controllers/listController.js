(function(){

	angular
		.module("myApp")
		.controller("listCtrl", listController);

		listController.$inject = ['userFactory', '$location', '$route', '$routeParams'];

		function listController(userFactory, $location, $route, $routeParams){
			var vm = this;
			vm.getUserProfile = getUserProfile;
			vm.logout = logout;
			vm.errors = [];
			vm.items = [];
			vm.items_done = [];
			vm.items_pending = [];


			if($routeParams.id){
				getUserProfile($routeParams.id);
			}

			function getUserProfile(userName){
				vm.userName = userName;
				userFactory.getUserProfile(userName, function(data){
					vm.items = data;
					for(var i=0; i<data.length; i++){
						if(data[i].checked_status === true){
							vm.items_done.push(data[i]);
						}
						else{
							vm.items_pending.push(data[i]);
						}
					}
				})
			}

			function logout(){
				userFactory.logout(function(data){
					if(data.status){
						$location.url('/');
					} else {
						vm.errors = data.errors;
					}
				})
			}


		}
})();