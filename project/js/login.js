$(function(){
	if(username){
		$('#username').val(getCookie("username"));//显示用户名
		$('#password').val(getCookie("password"));//显示密码
	}
	
	
	$('#submit').click(function(){//保存用户名和密码
		
		if(getCookie("username")&&$('#username').val() == getCookie("username") && $('#password').val() == getCookie("password")){
			if($(':checkbox')[0].checked){
				var d = new Date();
				d.setDate(d.getDate()+10);
				setCookie("username",$('#username').val(),d);
				setCookie("password",$('#password').val(),d);
			}else{
				removeCookie("username");
				removeCookie("password");
			}
			alert('登录成功！')
			window.location.href = "index.html";
		}else{
			if(confirm("该用户未注册，马上去注册")){
				window.location.href = "register.html";
			}
		}
		
		if($('#username').val() == ""){
			alert("请输入用户名");
		}
		if($('#password').val() == ""){
			alert("请输入密码");
		}
		
	})
});
