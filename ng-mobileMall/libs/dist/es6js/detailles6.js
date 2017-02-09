var app = angular.module('dw2', ['commonApp']);

app.controller('dw2Controller', ['$scope', '$http', function ($scope, $http) {

	$http.get('libs/php/products.php').success(function (_response) {
		var _url = window.location.href.split('=');

		//		console.log(_url[1]);
		$scope.product = [];
		var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

		for (var i = 0; i < res.length; i++) {
			if (res[i].guid == _url[1]) {
				$scope.pro = res[i];
			}
		}
		$scope.product.push($scope.pro);

		//		console.log($scope.product);
	});

	$http.get('libs/php/detailes.php').success(function (_response) {

		$scope.detailesbanner = [];
		$scope.detailsimg = [];

		var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

		for (var i = 0; i < res.length; i++) {
			if (res[i].part == 'detailesbanner' && res[i].guid == $scope.pro.guid) {
				$scope.detailesbanner.push(res[i]);
			}

			if (res[i].part == 'detailsimg') {
				$scope.detailsimg.push(res[i]);
			}
		}
		//		console.log($scope.detailsimg)
		$scope.pagerows = 8;
		$scope.pageindex = 1;
	});

	$http.get('libs/php/comment.php').success(function (_response) {

		var res = typeof _response == 'string' ? JSON.parse(_response) : _response;
		$scope.comment = res;
	});

	var procount = 0;
	$scope.procount = procount;

	$http.get('libs/php/getsession.php').success(function (_response) {

		var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

		if (res.state) {
			$scope.account = res.message;
			$http({
				method: 'GET',
				url: 'libs/php/getcart.php',
				params: {
					account: $scope.account
				} }).success(function (_response) {
				var res = typeof _response == 'string' ? JSON.parse(_response) : _response;
				for (var i = 0; i < res.length; i++) {
					procount += parseInt(res[i].number);
				}

				$scope.procount = procount;
			});
		}
	});

	var _guid = Guid.NewGuid().ToString();

	$scope.buynow = function (_href) {

		$http({
			method: 'GET',
			url: 'libs/php/getcart.php',
			params: {
				account: $scope.account,
				guid: _guid
			} }).success(function (_response) {

			var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

			if (res) {
				$scope.procount = res[0];
			}
			//			console.log($scope.procount)
			if ($scope.procount) {
				var number = $scope.procount.number;
				number++;
				$http.post('libs/php/changeCart.php', {
					account: $scope.account,
					guid: _guid,
					number: number
				}).success(function (_response) {
					var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

					if (_href) {
						window.location.href = _href;
					} else {

						procount++;
						$scope.procount = procount;
						alert(res.message);
					}
				});
			} else if ($scope.account) {
				$http.post('libs/php/changeCart.php', {
					account: $scope.account,
					src: $scope.pro.src,
					title: $scope.pro.title,
					price: $scope.pro.price,
					guid: _guid
				}).success(function (_response) {
					var res = typeof _response == 'string' ? JSON.parse(_response) : _response;

					if (_href) {
						window.location.href = _href;
					} else {
						procount++;
						$scope.procount = procount;
						alert(res.message);
					}
				});
			} else {
				alert("您未登录，现在到登录页面登录");
				window.location.href = "login.html";
			}
		});
	};

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
				effect: 'coverflow',
				slidesPerView: 1,
				centeredSlides: true,
				coverflow: {
					rotate: 60,
					stretch: 10,
					depth: 60,
					modifier: 2,
					slideShadows: true
				},
				speed: 1000,
				autoplayDisableOnInteraction: false //点击左右页后继续轮播
			});
		}
	}, 1000);

	$('header>div>span').click(function () {
		$('header>div>span').removeClass('spanselect');
		$(this).addClass('spanselect');

		if ($(this).hasClass('detspan')) {
			$('.details').addClass('item-hidden');
		} else {
			$('.details').removeClass('item-hidden');
		}

		if ($(this).hasClass('comspan')) {
			$('.comment').addClass('item-hidden');
		} else {
			$('.comment').removeClass('item-hidden');
		}
	});

	var cartnumber = function () {
		var cartnum = 0;
		var _array = JSON.parse(localStorage.getItem('cart'));
		$.each(_array, function (_index, _obj) {
			cartnum += _obj.count;
		});

		$('.cart-total-num').html(cartnum);
	};

	if (localStorage.getItem('cart')) {
		cartnumber();
	}
}]);