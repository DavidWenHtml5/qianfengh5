
var app = angular.module('dw', []);

app.controller('dwController', ['$scope', '$http', function ($scope, $http) {

	$http.get('libs/php/mobilemall.php').success(function (_response) {

		$scope.bannerimg = [];
		$scope.topAdvertisement = [];
		$scope.categroy = [];
		$scope.indexplist = [];

		var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

		for (var i = 0; i < res.length; i++) {
			if (res[i].part == 'bannerimg') {
				$scope.bannerimg.push(res[i]);
			}

			if (res[i].part == 'top-advertisement') {
				$scope.topAdvertisement.push(res[i]);
			}

			if (res[i].part == 'categroy') {
				$scope.categroy.push(res[i]);
			}

			if (res[i].part == 'indexplist') {
				$scope.indexplist.push(res[i]);
			}
		}

		$scope.pagerows = 6;
	});

	if ($('.show-search')) {
		$('.show-search').click(function () {
			$('.search').css('display', 'block');
		});

		$('.hidden-search').click(function () {
			$('.search').css('display', 'none');
		});
	}
	setTimeout(function () {
		if ($('.swiper-container')) {
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 3000,
				loop: true,
				pagination: '.swiper-pagination',
				effect: 'flip',
				flip: {
					slideShadows: true,
					limitRotation: true
				},
				speed: 1000,
				prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',
				autoplayDisableOnInteraction: false //点击左右页后继续轮播
			});
		}
	}, 1000);

	$('.content').scroll(function () {
		//分段加载内容
		if ($scope.pagerows < $scope.indexplist.length) {
			if ($('.content')[0].clientHeight + $('.content')[0].scrollTop == $('.content')[0].scrollHeight - 1) {

				$('.mask').toggleClass('item-hidden');

				$http.get('libs/php/mobilemall.php').success(function (_response) {
					var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

					for (var i = 0; i < res.length; i++) {

						if (res[i].part == 'indexplist') {
							$scope.indexplist.push(res[i]);
						}
					}

					$scope.pagerows += $scope.pagerows;
					if ($scope.pagerows > $scope.indexplist.length) {
						$scope.pagerows = $scope.indexplist.length;
					}
				});

				setTimeout(function () {
					$('.mask').toggleClass('item-hidden');
				}, 1000);
			}
		}
	});
}]);