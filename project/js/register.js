$(function(){
	$('.phone-reg').addClass('now');
	$('.email').hide();
	$('.phone-reg').click(function(){
		$(this).addClass('now').siblings('.email-reg').removeClass('now');
		$('.email').hide();
		$('.email-check').hide();
		$('.phone').show();
		$('.phone-check').show();
	})
	$('.email-reg').click(function(){
		$(this).addClass('now').siblings('.phone-reg').removeClass('now');
		$('.phone').hide();
		$('.phone-check').hide();
		$('.email').show();
		$('.email-check').show();
	})
	
	
	$('#username').blur(function(){
		var pattern = /^[a-zA-Z_][a-zA-Z0-9_]/;
		if(pattern.test($('#username').val())){
			$('.username-check').html("");
		}else{
			$('.username-check').html("用户名输入不合法");
		}
	});
	
	$('#email').blur(function(){
		var pattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(pattern.test($('#email').val())){
			$('.email-check').html("");
		}else{
			$('.email-check').html("邮箱地址输入不合法");
		}
	});
	
	$('#password').blur(function(){
		var pattern = /[a-zA-Z0-9]{6,20}$/;
		var low = /[a-zA-Z0-9]{6,10}$/;
		var middle = /[a-zA-Z0-9]{11,15}$/;
		var high = /[a-zA-Z0-9]{16,20}$/;
					
		if(pattern.test($('#password').val())){
			
			if(low.test($('#password').val())){
				$('.password-check').css({width:'85px',background:"red",color:'white'});
				$('.password-check').html("低");
			}
			
			if(middle.test($('#password').val())){
				$('.password-check').css({width:'170px',background:"orange"});
				$('.password-check').html("中");
			}
			
			if(high.test($('#password').val())){
				$('.password-check').css({width:'255px',background:"green"});
				$('.password-check').html("高");
			}
		}else{
			$('.password-check').html("密码输入不合法,最少6位");
		}
		
	});
	
	$('#repassword').blur(function(){
		
		if($('#password').val() != $('#repassword').val()){
			$('.repassword-check').html("两次密码输入不一致");
		}else{
			$('.repassword-check').html("");
		}
	});
	
	
	$('#phone').blur(function(){	

		var pattern = /^[1]\d{10}$/;
		if(pattern.test($('#phone').val())){
			$('.phone-check').html("");
		}else{
			$('.phone-check').html("手机号输入不合法");
		}
	});

	$('.showCode').click(function(){//验证码
		var code = "";
		for(var i=0;i<4;i++){
		var isNum = parseInt(Math.random()*10)%2; 
			if(isNum){//生成一个数字
				code += parseInt(Math.random()*10);
			}else{//大写字母
				code += String.fromCharCode(parseInt(Math.random()*26)+65);
			}
		}
		$('.showCode').html(code);
		$('.showCode').css('fontSize','20px')
	});
	
	$('#code').blur(function(){	
		
		if($('#code').val().toUpperCase() == $('.showCode').html()){
			$('.code-check').html("");
		}else{
			$('.code-check').html("验证码输入错误！");
		}
	});
	
	$('#submit').click(function(){//保存用户名和密码
		
		if($('#username').val() == "" || $('#password').val() == "" || $('#repassword').val() == "" || $('#code').val() == ""){
			alert('输入框内容不能为空！');
		}else if($('.phone-reg').hasClass('now') && $('#phone').val() == ""){
			alert('手机不能为空！');
		}else if($('.email-reg').hasClass('now') && $('#email').val() == ""){
			alert('邮箱不能为空！');
		}else if($('.username-check').html() != "" || $('.email-check').html() != "" || $('.password-check').html() == "密码输入不合法" || $('.repassword-check').html() != "" || $('.phone-check').html() != "" || $('.code-check').html() != ""){
			alert('输入内容有错误！')
		}else if($('#code').val().toUpperCase() != $('.showCode').html()){
			alert("验证码输入错误！")
		}else{
			if(getCookie("username") == $('#username').val()){
				alert('该用户已注册');
			}else{
				var d = new Date();
				d.setDate(d.getDate()+1);
				setCookie("username",$('#username').val(),d);
				setCookie("password",$('#password').val(),d);
				if(confirm("注册成功，跳转到登录页面")){
					window.location.href = "login.html";
				}								
			}			
		}
	})
})
