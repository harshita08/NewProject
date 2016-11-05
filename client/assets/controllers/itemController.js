(function(){

	angular
		.module("myApp")
		.controller("itemCtrl", itemController);

		itemController.$inject = ['userFactory', '$location', '$route'];

		function itemController(userFactory, $location, $route){
			var vm = this;
			vm.user = {};
			vm.newItem = {};
			vm.allItems = [];
			vm.allUsers = [];
			vm.getSession = getSession;
			vm.addItem = addItem;
			//vm.reloadRoute = reloadRoute;
			vm.getItems = getItems;
			vm.getUsers = getUsers;
			vm.logout = logout;
			vm.updateItem = updateItem;

			getItems();

			function getItems(){
				getSession();
				userFactory.getItems(function(data){
					vm.allItems = data;
					getUsers();
				})
			}

			function getUsers(){
				userFactory.getUsers(function(data){
					vm.allUsers = data;
				})
			}

			function updateItem(index){
				console.log(index);
				userFactory.updateItem(index, function(data){
					console.log(data.status);
				})
			}

			function addItem(){
				console.log(vm.newItem);
				userFactory.addItem(vm.newItem, function(data){
					if(data.status){
						console.log("Success");
					} else{
						console.log("Error");
					}
				})
			}

			function getSession(){
				userFactory.getSession(function(data){
					vm.user = data.userInfo;
					if (!vm.user){
						$location.url('/');
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