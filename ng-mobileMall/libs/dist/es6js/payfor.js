var payfor = angular.module('payfor', ['commonApp']);

payfor.controller('payforCtrl', ['$scope', '$http', function ($scope, $http) {
	$http.get('libs/php/getsession.php').success(function (_response) {
		$scope.procount = 0;
		var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

		if (res.state) {
			$scope.account = res.message;
			$http({
				method: 'GET',
				url: 'libs/php/getcart.php',
				params: {
					account: $scope.account,
					select: "true"
				} }).success(function (_response) {
				var res = typeof _response == 'string' ? JSON.parse(_response) : _response;
				//				console.log(res)
				if (res.state === false) {
					alert("没有选择商品，返回购物车");
					window.location.href = "shoppingcart.html";
				} else {
					$scope.cartProduct = res;
					for (var i in res) {
						$scope.procount += parseInt(res[i].number);

						titlePrice += res[i].number * res[i].price;
						$scope.titlePrice = titlePrice.toFixed(2);
						//						console.log($scope.titlePrice)
					}
				}
			});
		} else {
			alert("您未登录，请登录！");
			window.location.href = 'login.html';
		}
	});

	$scope.procount = 0;

	var titlePrice = 0;
	$scope.titlePrice = titlePrice;
}]);