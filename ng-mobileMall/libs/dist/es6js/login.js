var login = angular.module('login', ['commonApp']);

login.controller('loginctrl', ['$scope', '$http', function ($scope, $http) {
	$scope.loginsubmin = function () {
		$http.post('libs/php/login.php', {
			account: $scope.account,
			password: $scope.password
		}).success(function (response) {
			if (response.state) {
				setTimeout(function () {
					$('.mask').removeClass('item-hidden');
					window.location.href = "user.html";
				}, 1000);
			} else {
				$('.mask').removeClass('item-hidden');
				alert(response.message);
			}
		});
	};
}]);