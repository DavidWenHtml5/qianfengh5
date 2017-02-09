var register = angular.module('register', ['commonApp']);

register.controller('registercontroller', ['$scope', '$http', function ($scope, $http) {
	$scope.code = "点击获取";
	$scope.showCode = function () {
		var code = "";
		for (var i = 0; i < 4; i++) {
			var isNum = parseInt(Math.random() * 10) % 2;
			if (isNum) {
				//生成一个数字
				code += parseInt(Math.random() * 10);
			} else {
				//大写字母
				code += String.fromCharCode(parseInt(Math.random() * 26) + 65);
			}
		}

		$scope.code = code;
		$('.code>span').css('fontSize', '20px');
	};

	$scope.register = function () {
		var flag = true;

		$.each($('input'), function (index, obj) {
			if ($(obj).val() === "") {
				flag = false;
			}
		});

		if (flag) {
			$http.post('libs/php/register.php', {
				account: $scope.account,
				password: $scope.password,
				email: $scope.email,
				phone: $scope.phone
			}).success(function (response) {
				//			console.log(response);
				if (response.state) {
					alert('注册成功');
					window.location.href = "login.html";
				} else {
					alert(response.message);
				}
			});
		} else {
			alert("注册资料不能为空");
		}
	};
}]);