var userinfo = angular.module('userinfo', ['commonApp']);

userinfo.controller('userinfoCtrl', ['$scope', '$http', function ($scope, $http) {

	$http.get("libs/php/getsession.php").success(function (response) {
		$('.mask').removeClass('item-hidden');

		if (response.state) {
			//			console.log(response.message)
			$scope.account = response.message;
		} else {
			$scope.account = "未登录";
		}
	});

	$scope.resetPwd = function () {
		$http.post('libs/php/resetPwd.php', {
			//			account:$scope.account,
			oldPwd: $scope.oldPwd,
			newPwd: $scope.newPwd
		}).success(function (response) {
			if (response.state) {
				setTimeout(function () {
					alert(response.message);
					window.location.href = "login.html";
				}, 1000);
			} else {
				alert(response.message);
			}
		});
	};
}]);