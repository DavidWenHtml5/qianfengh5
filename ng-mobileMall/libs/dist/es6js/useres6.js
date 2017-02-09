var user = angular.module('user', ['commonApp']);

user.controller('userctrl', ['$scope', '$http', function ($scope, $http) {
	$http.get("libs/php/getsession.php").success(function (response) {
		$('.mask').removeClass('item-hidden');

		if (response.state) {
			//			console.log(response.message)
			$scope.account = response.message;
			$scope.log = "退出";
		} else {
			$scope.log = "未登录";
			$scope.login = 'login.html';
		}
	});

	$scope.logout = function () {
		if ($scope.account) {
			$http.get("libs/php/logout.php").success(function (response) {
				if (response.state) {
					//					console.log(12)
					window.history.go(0);
				}
			});
		}
	};
}]);