var cart = angular.module('cart', ['commonApp']);

cart.controller('cartCtrl', ['$scope', '$http', function ($scope, $http) {
	$http.get('libs/php/getsession.php').success(function (_response) {
		$scope.procount = 0;
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
				//				console.log(res)
				if (res.state === false) {
					alert("购物车为空，返回到首页浏览商品");
					window.location.href = "mobileMall.html";
				} else {
					$scope.cartProduct = res;
					initselect();
				}
			});
		} else {
			alert("您未登录，请登录！");
			window.location.href = 'login.html';
		}
	});

	//初始化数据选择项
	var initselect = function () {
		var _selectType = 'false';
		allSelect(_selectType);
	};

	//数据选择项全选修改
	var allSelect = function (_selectType) {
		$http.post('libs/php/changeCart.php', {
			account: $scope.account,
			allselect: _selectType
		}).success(function (_response) {
			var res = typeof _response == 'string' ? JSON.parse(_response) : _response;
			console.log(res.message);
		});
	};

	//减少商品数量按钮颜色
	$scope.minuscolor = function (index) {
		minuscolor(index);
	};

	var minuscolor = function (_index) {
		//		console.log(evt)		
		if ($($('.count')[_index]).html() > 1) {

			$($('.count')[_index]).prev('.minuscount').removeClass('minuscountactive');
		} else {

			$($('.count')[_index]).prev('.minuscount').addClass('minuscountactive');
		}
	};

	//检查是否所有商品被选中
	var checkcircle = function () {
		var flag = true;
		$.each($('.checked>i'), function (index, obj) {
			if ($(obj).hasClass('fa-circle-o')) {
				$('.allcheck>i').addClass('fa-circle-o').removeClass('fa-check-circle');
				flag = false;
			}
		});

		if (flag) {
			$('.allcheck>i').removeClass('fa-circle-o').addClass('fa-check-circle');
		}
	};

	//付款数额
	var pfCount = 0;

	$scope.payforCount = parseInt(pfCount).toFixed(2);

	//选择商品并添加付款数额
	$scope.checkedSelect = function (_event, _price, _guid) {

		if ($(_event.target).is('.fa-circle-o')) {
			pfCount = $(_event.target).toggleClass('fa-circle-o').toggleClass('fa-check-circle').closest('ul').find('.count').html() * _price;
			$scope.payforCount = (parseInt($scope.payforCount) + parseInt(pfCount)).toFixed(2);
			checkcircle();

			var _selectType = 'true';
			proSelect(_selectType, _guid);
		} else if ($(_event.target).is('.fa-check-circle')) {
			pfCount = $(_event.target).toggleClass('fa-circle-o').toggleClass('fa-check-circle').closest('ul').find('.count').html() * _price;
			$scope.payforCount = parseInt($scope.payforCount - pfCount).toFixed(2);
			checkcircle();

			var selectType = 'false';
			proSelect(selectType, _guid);
		}
	};

	//数据选择项单选修改
	var proSelect = function (_selectType, _guid) {
		$http.post('libs/php/changeCart.php', {
			account: $scope.account,
			guid: _guid,
			select: _selectType
		}).success(function (_response) {
			var res = typeof _response == 'string' ? JSON.parse(_response) : _response;
			console.log(res.message);
		});
	};

	//全选按钮
	$scope.allcheck = function () {
		var arr = 0;
		if ($('.allcheck>.fa-circle-o')) {
			$('.checked>i').addClass('fa-check-circle').removeClass('fa-circle-o');

			$.each($('.count'), function (_index, _obj) {
				var sumprice = $(_obj).html() * $(_obj).closest('div').siblings('.price').find('span').html();
				arr += sumprice;
			});
			$scope.payforCount = arr.toFixed(2);
		}

		if ($('.allcheck>i').hasClass('fa-check-circle')) {
			$('.checked>i').removeClass('fa-check-circle').addClass('fa-circle-o');
			$scope.payforCount = '0.00';
		}

		$('.allcheck>i').toggleClass('fa-circle-o').toggleClass('fa-check-circle');
	};

	//减少商品数量
	$scope.minusCart = function (event, _guid) {

		var minuscount = $(event.target).parent('span').siblings('.count').html();
		if (minuscount == 1) {
			$(event.target).parent('span').siblings('.count').html(1);
		} else {
			var _number = minuscount - 1;

			$http.post('libs/php/changeCart.php', {
				account: $scope.account,
				guid: _guid,
				number: _number
			}).success(function (_response) {
				var res = typeof _response == 'string' ? JSON.parse(_response) : _response;
				if (res.state) {
					$(event.target).parent('span').siblings('.count').html(_number);
					if ($(event.target).closest('li').siblings('.checked').find('i').hasClass('fa-check-circle')) {
						$scope.payforCount = parseInt($scope.payforCount - _price).toFixed(2);
					}
				} else {
					alert(res.message);
				}
			});
		}
	};

	//增加商品数量
	$scope.plusCart = function (event, _guid) {

		var pluscount = $(event.target).parent('span').siblings('.count').html();
		var _number = parseInt(pluscount) + 1;

		$http.post('libs/php/changeCart.php', {
			account: $scope.account,
			guid: _guid,
			number: _number
		}).success(function (_response) {
			var res = typeof _response == 'string' ? JSON.parse(_response) : _response;
			if (res.state) {
				$(event.target).parent('span').siblings('.count').html(_number);
				if ($(event.target).closest('li').siblings('.checked').find('i').hasClass('fa-check-circle')) {
					$scope.payforCount = (parseInt($scope.payforCount) + parseInt(_price)).toFixed(2);
				}
			} else {
				alert(res.message);
			}
		});
	};

	//删除商品
	$scope.delCart = function (_event, _guid) {
		$http.post('libs/php/delcart.php', {
			account: $scope.account,
			guid: _guid
		}).success(function (_response) {
			var res = typeof _response == 'string' ? JSON.parse(_response) : _response;
			if (res.state) {
				$(_event.target).closest('ul').remove();
			} else {
				alert(res.message);
			}
		});
	};

	//选择付款方式
	$('.payfortype').click(function () {
		$('.payforcover').addClass('item-hidden');

		$('.payforcover>div>span').click(function () {
			$('.payfortype').text($(this).text());
			$('.payforcover').removeClass('item-hidden');
		});
	});
}]);