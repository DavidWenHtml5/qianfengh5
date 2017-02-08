$(function(){
	//放大功能
	$(function(){    	
	  	$(".bigimage").jqueryzoom({
		  xzoom: 500,
		  yzoom: 500,
		  preload: 1,
		  offset:20,
		  position: "right",
		  lens:true
	  	});
    })
	
	$('.cut').click(function(){
		if($('.quantity').val() == 1){
			$('.quantity').val(1);
		}else{
			$('.quantity').val($('.quantity').val()-1);
		}
	})
	
	$('.add').click(function(){
		$('.quantity').val(parseInt($('.quantity').val()) + 1);
	})
	
	$('.addtocart').click(function(){
		
		var imgsrc = $('img','.jqzoom')[0].src;
		var title = $('h2','.goods-price').html();
		var price = $('.myprice').html();
		var numb = $('.quantity').val();
		var d = new Date;
		d.setDate(d.getDate()+7);
		
		setCookie('imgsrc',imgsrc,d);
		setCookie('title',title,d);
		setCookie('price',price,d);
		setCookie('numb',numb,d);
		
		alert('成功加入购物车')
	})
	
	
})
