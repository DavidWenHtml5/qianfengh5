$(function(){
	//商品换页效果
	$('li','.floorproducttype').hover(function(){
		$(this).siblings('li').removeClass('hover');
		$(this).addClass('hover');
		$(this).parent().siblings('.floorproduct').removeClass('show');
		$($(this).parent().siblings('.floorproduct')[$(this).index()]).addClass('show');
	})
	
	//底部广告移动
	$('.changebrand').find('.left').click(function(){		
		var $ul = $(this).parent().siblings('ul');
		if($ul[0].offsetLeft <= -($ul.find('li').length-10)*$ul.find('li')[0].offsetWidth){
			$ul[0].style.left = -($ul.find('li').length-10)*$ul.find('li')[0].offsetWidth + "px";
		}else{
			$ul[0].style.left = $ul[0].offsetLeft - $ul.find('li')[0].offsetWidth +"px";
		}
	})
	
	$('.changebrand').find('.right').click(function(){
		var $ul = $(this).parent().siblings('ul');
		if($ul[0].offsetLeft >= 0){
			$ul[0].style.left = 0;
		}else{
			$ul[0].style.left = $ul[0].offsetLeft + $ul.find('li')[0].offsetWidth +"px";
		}
	})
	
	//banner运动
	
	var index = 0;
	var k = $('li','.bannerlist').length;
	var lastIndex = 0;
	timer = setInterval(function(){
		index++;
		show();
	},4000)
	
	
	function show(){
		reset();
	
		if(index < 0){
			index = k - 1;
		}else if(index > k - 1){
			index = 0;
		}
		
		$('li','.bannerlist').eq(index).animate({opacity:1},2000);				
		$('li','.bannernav').removeClass('banneractive');
		$('li','.bannernav').eq(index).addClass('banneractive');	
		
		lastIndex = index;
	}
	
	function reset(){
		$('li','.bannerlist').eq(lastIndex).animate({opacity:0},4000);
	}
	
	var timer;
	$('li','.bannerlist').find('a').on('mouseenter',function(){
			clearInterval(timer);
		}).on('mouseleave',function(){
			timer = setInterval(function(){
				index++;
				show();
			},4000);
	})
	
	$('li','.bannernav').click(function(){
		clearInterval(timer);
		index = $(this).index();
		show();
		timer = setInterval(function(){
			index++;
			show();	
		},4000)
				
				
	})
	
	//二级导航栏
	$('.subnavlist2').hover(function(){
		$('.subnavlist2').removeClass('subnavlist2hover');
		$(this).addClass('subnavlist2hover');
		$('.subnavlist2-ul').removeClass('subnavlist2-ul-show');
		$('.subnavlist2-ul').eq($(this).index()).addClass('subnavlist2-ul-show');
	},function(){
		$('.subnavlist2').removeClass('subnavlist2hover');
		$('.subnavlist2-ul').removeClass('subnavlist2-ul-show');
	})
	
	$('.subnavlist2-ul').hover(function(){
		$('.subnavlist2').eq($(this).index()).addClass('subnavlist2hover');
		$(this).addClass('subnavlist2-ul-show');
	},function(){
		$('.subnavlist2').eq($(this).index()).removeClass('subnavlist2hover');
		$('.subnavlist2-ul').removeClass('subnavlist2-ul-show');
	})
	
	$('li','.proclamationlist').hover(function(){
		$('li','.proclamationlist').removeClass('orderhover');
		$(this).addClass('orderhover');
		$('li','.proclamationlist').find('div').removeClass('show');
		$(this).find('div').addClass('show');
	})
	
});
