$(function(){
	var _obj = {
		baseDom:'.products1>ul>li',
		cloneSize: 20,
		url: 'libs/data/products.txt',
		pageContainer: '#pagination-demo1',
		page: true
	};
	$('.products1').cloneDom(_obj);
	

//	$(document).click(function(){
		// $.get('', function(_response){
		// 	products1.newObj.data = _response;
		// 	products1.refresh();
		// })
		// products1.newObj.data = [
		// 	{"id": 1, "proName": "thinkpad t001", "price": "5", "img": "http://www.oschina.net/img/logo.svg?date=20160803"},
		// 	{"id": 1, "proName": "thinkpad t001", "price": "5", "img": "http://www.oschina.net/img/logo.svg?date=20160803"},
		// 	{"id": 1, "proName": "thinkpad t001", "price": "5", "img": "http://www.oschina.net/img/logo.svg?date=20160803"},
		// 	{"id": 1, "proName": "thinkpad t001", "price": "5", "img": "http://www.oschina.net/img/logo.svg?date=20160803"},
		// 	{"id": 1, "proName": "thinkpad t001", "price": "5", "img": "http://www.oschina.net/img/logo.svg?date=20160803"},
		// 	{"id": 1, "proName": "thinkpad t001", "price": "5", "img": "http://www.oschina.net/img/logo.svg?date=20160803"}
		// ];
		
//	})
})