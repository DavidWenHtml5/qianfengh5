$(function(){

	$('#head').load('../common.html?_= #headertop-wrap',function(){
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
	})
	$('#headsub').load('../common.html?_= #reg-header-wrap',function(){
		$('a','.reg-logo-l').attr('href',"../index.html");
	});
	
	$('#footer').load('../common.html #set-footer-wrap');
	
	//全选
	$('#checkall').click(function(){
		if($('#checkall')[0].checked != true){
			$('.checked').attr('checked',false)
			$('.total').html('0.00')
		}else{
			$('.checked').attr('checked',true)
			thetotal();
		}
	})	
	
	//打印购物车内容
	for(var i=0;i<50;i++){
		if(getCookie("id"+i)){
			var obj = JSON.parse(getCookie('id'+i));
			console.log(obj)			
			var $tr = $('<tr></tr>').appendTo('.productlist');
			$('<td class="check"><input type="checkbox" checked="true" class="checked"/></td>').appendTo($tr);
			$('<td class="product"><a href="details.html"><img src="'+obj.imgsrc+'"/></a><a href="details.html">'+obj.title+'</a></td>').appendTo($tr);
			$('<td class="number"><a href="javascript:;" class="cut"></a><input type="text" name="" class="quantity" value="'+obj.numb+'" /><a href="javascript:;" class="add"></a></td>').appendTo($tr);
			$('<td class="price"><span>'+obj.price+'</span></td>').appendTo($tr);
			$('<td class="subtotal"><span>'+(obj.numb*obj.price).toFixed(2)+'</span></td>').appendTo($tr);
			$('<td class="delete"><a href="javascript:;">删除</a></td>').appendTo($tr);			
		}
	}
			
	//加减商品数量
	$('.cut').click(function(){
		if($(this).siblings('.quantity').val() == 1){
			$(this).siblings('.quantity').val(1);
			
		}else{
			var cut = $(this).siblings('.quantity').val($(this).siblings('.quantity').val() - 1);
			var pri = $(this).parent().siblings('.price').find('span').html()
			
			var num = cut.val()
			$(this).parent().siblings('.subtotal').find('span').html((cut.val()*parseInt(pri)).toFixed(2));
			thetotal();
			
			removeCookie('numb')
			var d = new Date;
			d.setDate(d.getDate()+7);
			setCookie('numb',num,d)
		}
	})
	
	$('.add').click(function(){
		
		var add = $(this).siblings('.quantity').val(parseInt($(this).siblings('.quantity').val()) + 1);
		var pri = $(this).parent().siblings('.price').find('span').html()
	
		var num = add.val()
		$(this).parent().siblings('.subtotal').find('span').html((add.val()*parseInt(pri)).toFixed(2));
		
		thetotal();
		
		removeCookie('numb')
		var d = new Date;
		d.setDate(d.getDate()+7);
		setCookie('numb',num,d)
	})
	
	//总数
	function thetotal(){
		totala = [];
		if($('#checkall')[0].checked == true){
			for(var i = 0;i < $('.checked').length;i++){
				totala.push($($('.checked')[i]).parent().siblings('.subtotal').find('span').html());
			}
			
			var total = 0;
			for(var k = 0;k < $('.checked').length; k++){
				total += parseInt(totala[k]);
			}
			
			$('.total').html(total.toFixed(2))
		}else{
			$('.total').html('0.00')
		}		
	}
	
	thetotal();
	
	$('.checked').click(function(){
		if($(this)[0].checked != true){
			$('.total').html(($('.total').html() - $(this).parent().siblings('.subtotal').find('span').html()).toFixed(2));
		}else{
			$('.total').html((parseInt($('.total').html()) + parseInt($(this).parent().siblings('.subtotal').find('span').html())).toFixed(2));
		}
		
	})
	
})