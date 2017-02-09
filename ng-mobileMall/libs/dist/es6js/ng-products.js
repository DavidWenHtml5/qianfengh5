var app = angular.module('dw', []);

app.controller('dwController', ['$scope', '$http', function ($scope, $http) {

	//	var pagerows = 8;

	$http.get('libs/php/products.php').success(function (_response) {
		var res = typeof _response == 'string' ? JSON.parse(_response) : _response;
		//		console.log(res)
		$scope.products = res;
		$scope.pagerows = 8;
	});

	$('.ng-product').scroll(function () {
		//分段加载内容
		if ($scope.pagerows < $scope.products.length) {
			if ($('.ng-product')[0].clientHeight + $('.ng-product')[0].scrollTop == $('.ng-product')[0].scrollHeight) {
				$('.mask').toggleClass('item-hidden');

				$http.get('libs/php/products.php').success(function (_response) {
					var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

					$scope.products = res;
					$scope.pagerows += $scope.pagerows;
					if ($scope.pagerows > $scope.products.length) {
						$scope.pagerows = $scope.products.length;
					}
				});

				setTimeout(function () {
					$('.mask').toggleClass('item-hidden');
				}, 1000);
			}
		}
		console.log($scope.pagerows);
	});

	$('.ng-productnav>li').click(function () {
		$(this).toggleClass('selectli').find('i').toggleClass('iactive');
		$('.ng-product').toggleClass('productactive');

		if ($(this).hasClass('selectli')) {
			$('.ng-productnav>li').removeClass('selectli').find('i').removeClass('iactive');
			$(this).addClass('selectli').find('i').addClass('iactive');
			$('.ng-product').addClass('productactive');
		}

		if ($(this)[0] == $('.ng-productnav>li:nth-child(1)')[0]) {
			$('.categorylist').toggleClass('categorylistactive');
		} else {
			$('.categorylist').removeClass('categorylistactive');
		}

		if ($(this)[0] == $('.ng-productnav>li:nth-child(2)')[0]) {
			$('.brand').toggleClass('categorylistactive');
		} else {
			$('.brand').removeClass('categorylistactive');
		}

		if ($(this)[0] == $('.ng-productnav>li:nth-child(3)')[0]) {
			$('.ng-product').removeClass('productactive');
		}
	});

	$('.categorylist>ul:first-child>li').click(function () {
		$('.categorylist>ul:first-child>li').removeClass('subcategorylist');
		$(this).addClass('subcategorylist');
		var i = $('.categorylist>ul:first-child>li').index($(this));
		$('.categorylist>ul:nth-child(2)>li').removeClass('subcategorylist2');
		$('.categorylist>ul:nth-child(2)>li:nth-child(' + (i + 1) + ')').addClass('subcategorylist2');
	});
}]);

// app.filter('range', function () {
//          return function (array, range) {
//              for (var i = 1 ; i <= range; i++) {
//                  array.push(i);
//              }
//              return array;
//          }
//      })