/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	module.exports = __webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	
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

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */
/***/ function(module, exports) {

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

/***/ },
/* 9 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);