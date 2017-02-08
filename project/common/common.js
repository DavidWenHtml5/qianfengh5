$(function(){
	//注册和登录页面的头部及脚部，主页和分页的脚部
	$('#register-header').load('common.html?_= #reg-header-wrap');
	$('#footer').load('common.html #set-footer-wrap');
	
	//主页和分页的头部
	$('#head').load('common.html?_= #theheader',function(){
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
				window.location.href = "html/list_page.html";
			}
		})
		
		$('.login').click(function(){
			window.location.href = "login.html";
		})
		
		$('.register').click(function(){
			window.location.href = "register.html";
		})
		
		$('.shoppingcar').click(function(){
			window.location.href = "html/shoppingcar.html";
		})
		
		$('img','.two-bar-codes').attr('src',"images/index/app.jpg")
		
		$('a','.logo').click(function(){
			window.location.href = "index.html";
		})
	});
	
	//底部导航
	$('#foot-service').load('common.html?_= #footer-service-wrap');
	
	//底部链接
	$('#foot-links').load('common.html?_= #footer-links-wrap');
	
	//友情链接
	$('#friend-links').load('common.html?_= #friend-link-wrap');
	
	
})