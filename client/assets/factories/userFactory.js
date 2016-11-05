(function(){

	angular
		.module("myApp")
		.factory("userFactory", userFactory);

		function userFactory($http){
			var factory = {
				addUser: addUser,
				getSession: getSession,
				logout: logout,
				addItem: addItem,
				getItems: getItems,
				getUsers: getUsers,
				getUserProfile: getUserProfile,
				updateItem: updateItem,
			};
			return factory;

			function getItems(callback){
				$http.get('/items')
				.success(function(data){
					callback(data);
				})
			}

			function updateItem(index, callback){
				$http.post('/item/' + index)
				.success(function(data){
					callback(data);
				})
			}

			function getUserProfile(userName, callback){
			 	$http.get('/users/' + userName)
			 	.success(function(data){
			 		callback(data);
			 	})
			 }

			function getUsers(callback){
				$http.get('/users')
				.success(function(data){
					callback(data);
				})
			}

			function addItem(newItem, callback){
				$http.post('/items', newItem)
				.success(function(data){
					callback(data);
				})
			}

			function addUser(newUser, callback){
			 	$http.post('/users', newUser)
			 	.success(function(data){
			 		callback(data);
			 	})
			 }

			 function getSession(callback){
			 	$http.get('/session')
			 	.success(function(data){
			 		callback(data);
			 	})
			 }

			 function logout(callback){
				$http.post('/logout')
				.success(function(returnData){
					callback(returnData);
				})
			}

		}
})();