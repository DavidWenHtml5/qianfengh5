$(function(){

	$('#head').load('../common.html?_= #theheader',function(){
		//显示城市列表
		$('.city-in').hover(function(){
			$('.choosecity').stop().show(500);
		},function(){
			$('.choosecity').stop().hide(500);
		});
		
		$('.choosecity').hover(function(){
			$('.choosecity').stop().show();
		},function(){
			$('.choosecity').stop().hide(500);
		});
		
		//点击选择所在城市
		$('.choosecity').find('span').click(function(){
			$('.city-in').html($(this).html());
			$('.showcity').html($('.city-in').html());
			$('.choosecity').stop().hide(500);
		})
		
		//显示顶部右上方的列表项的下拉列表
		$('.h-list').hover(function(){
			$(this).addClass('select');
		},function(){
			$(this).removeClass('select');
		})
		
		//点击选择搜索类型
		$('li','.search-type').click(function(){
			$(this).addClass('active').siblings('li').removeClass('active');
		})
		
		//搜索框焦点事件
		$('#search-text').focusin(function(){
			if($('#search-text').val() == "请输入关键词"){
				$('#search-text').val("");
			}
		}).blur(function(){
			if($('#search-text').val() == ""){
				$('#search-text').val("请输入关键词");
			}
		})
		
		//点击搜索
		$('#search-button').click(function(){
			if($('#search-text').val() != "请输入关键词" && $('#search-text').val() != ""){
				window.location.href = "../html/list_page.html";
			}
		})
		
		$('.login').click(function(){
			window.location.href = "../login.html";
		})
		
		$('.register').click(function(){
			window.location.href = "../register.html";
		})
		
		$('.shoppingcar').click(function(){
			window.location.href = "shoppingcar.html";
		})
				
		$('img','.two-bar-codes').attr('src',"../images/index/app.jpg");		
		
		$('a','.logo').click(function(){
			window.location.href = "../index.html";
		})
	});
	
	
	$('#foot-links').load('../common.html?_= #footer-links-wrap');
	
	$('#footer').load('../common.html #set-footer-wrap');
	
	//二级导航栏
	$('.subnav-title','.subnav').hover(function(){
		$('.subnavlist').addClass('subnavlistshow');		
	},function(){
		$('.subnavlist').removeClass('subnavlistshow');
	}).siblings('.subnavlist').hover(function(){
		$(this).addClass('subnavlistshow');
	},function(){
		$(this).removeClass('subnavlistshow');
	}).find('.subnavlist2').hover(function(){		
		$('.subnavlist2').removeClass('subnavlist2hover');
		$(this).addClass('subnavlist2hover');
		$('.subnavlist2-ul').removeClass('subnavlist2-ul-show');
		$('.subnavlist2-ul').eq($(this).index()).addClass('subnavlist2-ul-show');
	},function(){
		$('.subnavlist2').removeClass('subnavlist2hover');
		$('.subnavlist2-ul').removeClass('subnavlist2-ul-show');
	})
	
	$('.subnavlist2-ul').hover(function(){
		$('.subnavlist').addClass('subnavlistshow');
		$('.subnavlist2').eq($(this).index()).addClass('subnavlist2hover');
		$(this).addClass('subnavlist2-ul-show');
	},function(){
		$('.subnavlist').removeClass('subnavlistshow');
		$('.subnavlist2').eq($(this).index()).removeClass('subnavlist2hover');
		$('.subnavlist2-ul').removeClass('subnavlist2-ul-show');
	})
	
	
	$('li','.proclamationlist').hover(function(){
		$('li','.proclamationlist').removeClass('orderhover');
		$(this).addClass('orderhover');
		$('li','.proclamationlist').find('div').removeClass('show');
		$(this).find('div').addClass('show');
	})
	
	//左列表点击事件
	$('.mainleftlist li p').click(function(){
		$(this).find('i').toggleClass('fa-plus').toggleClass('fa-minus');
		$(this).siblings('ul').toggleClass('mainleftlistshow');
	})
	
	//ajax生成产品列表
	var productlist = function(_pageindex, _isgenerate){
		$.get('list.json', {'_': Math.random(), page: _pageindex}, function(response){
			var obj = response;
			var objre = response.result;
			
			var startPage = obj.pageSize * (_pageindex - 1);  
        	var endPage = startPage + obj.pageSize - 1; 
        	
        	 for (var i = 0; i < obj.pageSize; i++) {  
            	$('.mainright-product>ul').append('<li class="li-tag"></li>');
           	}
        	 
        	 for (var j = startPage, k = 0; j < endPage, k < obj.pageSize; j++, k++) {  
                if( j == obj.totalCount){  
                    break;       // 当遍历到最后一条记录时，跳出循环  
                }

				var lgproductwrap = $('<div class="lg-product-wrap"></div>').appendTo( $('.li-tag').eq(k));
				var lgproduct = $('<div class="lg-product"></div>').appendTo(lgproductwrap);
				var lgproductup = $('<div class="lg-product-up"></div>').appendTo(lgproduct);
				var lgproductdown = $('<div class="lg-product-down"></div>').appendTo(lgproduct);
				$('<a href="details.html" class="lg-product-banner" title="' + objre[j].title + '"><img src="'+ objre[j].src + '"/></a>').appendTo(lgproductup);
				$('<p class="title" idnum="'+objre[j].id+'"><a href="details.html" title="'+ objre[j].title +'">'+ objre[j].title +'</a></p>').appendTo(lgproductdown);
				$('<p><em class="price">'+objre[j].price+'</em><em class="o-price">'+objre[j].oprice+'</em></p>').appendTo(lgproductdown);
				$('<ul class="sell-stat clear"><li><a href="javascript:;">0</a>'+objre[j].sell+'</li><li><a href="javascript:;">0</a>'+objre[j].comment+'</li><li class="sell-stat-last"><a href="javascript:;">287</a>'+objre[j].concern+'</li></ul>').appendTo(lgproductdown);
				$('<a href="javascript:;" class="addcart" title="'+objre[j].addcart+'">'+objre[j].addcart+'</a>').appendTo(lgproductwrap);
								
            }       	 
        	addcar();
		})
	}
	
	//产品列表换页导航
	var page = function(_pageindex, _isgenerate){
		$.get('list.json', {'_': Math.random(), page: _pageindex}, function(response){
			var obj = response;

			var pageCount = obj.totalCount % obj.pageSize > 0 ? parseInt(obj.totalCount / obj.pageSize) + 1 :  parseInt(obj.totalCount / obj.pageSize);
			var pageFlag = '';
			if(!_isgenerate){
				return false;
			}
			for(var i = 1; i <= pageCount; i++){
				pageFlag += ('<span>' + i + '</span>');
			}
			$(pageFlag).appendTo('.pageing');
			
			$('span','.pageing').eq(0).css('background-color','#fff');
			
			$('span','.pageing').click(function(){
				$('span','.pageing').css('background-color','#eee');
				$(this).css('background-color','#fff');				
			})
			
			$('.product-totle').html('共 '+obj.totalCount+'个产品')
			
		});	
	};
	
	productlist(1,true)
	page(1, true);
	
	$('.pageing').on('click', function(evt){
		$('.mainright-product>ul').html("");
		productlist($(evt.target).text());
	});
	
	
	function addcar(){
		$('.addcart').click(function(){
			
			var id = $(this).siblings('.lg-product').find('.lg-product-down>.title').attr('idnum')
			var imgsrc = $(this).siblings('.lg-product').find('.lg-product-up>a>img')[0].src;
			var title = $(this).siblings('.lg-product').find('.lg-product-down>p>a').html();
			var price = $(this).siblings('.lg-product').find('.lg-product-down>p>.price').html();
			var numb = 1;
			
			var keyvalue = {
			"imgsrc":imgsrc,
			"title":title,
			"price":price,
			"numb":numb
			}
			
			var str = JSON.stringify(keyvalue)
			
			var d = new Date;
			d.setDate(d.getDate()+7);
			
			setCookie('id'+id,str,d);
		})
	}	
			
	
})
