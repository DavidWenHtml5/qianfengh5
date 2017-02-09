$(function(){
	//显示和隐藏返回顶部按钮
	$('.scrolltop').parent().scroll(function(){
//		console.log(123)
	//返回顶部
		if($('.scrolltop').parent()[0].scrollTop > 300){
			$('.scrolltop').addClass('totop');
		}else{
			$('.scrolltop').removeClass('totop');
		}
	});
	
	$('.scrolltop').click(function(){
		$(this).parent()[0].scrollTop = 0;
	});
//	
	$('.more').click(function(){
		$('.morelist').toggleClass('item-hidden');
	});	
	
});

var cloneDom = function(opts){
	//默认配置
	var _default = {
		baseDom: null,
		url: null, // 权重次于 data， 如果 data 为空，url 不为空的情况下，则 ajax 请求 url 解析出 data
		data: [], // 权重最高，如果 data 不为空则直接当数据源使用
		cloneSize: 0,
		page: false, //如果 page = true 的情况，要实现分页
		pageContainer: null
	};
	var $this = this;
	//对象合并，生成一个全新的对象,
	//后面的对象属性替换前面对象已有的属性，如果是新属性，则添加
	//深度克隆	
	$this.newObj = $.extend(_default, opts);
	
	//确定数据源
	var init = function(_callback){
		//如果数据源为空则不执行其它操作
		if(!$this.newObj.data && !$this.newObj.url){
			return false;
		}
		//如果 baseDom为空 或者 cloneSize 小于 0， 则不执行其它操作
		if(!$this.newObj.baseDom || $this.newObj.cloneSize < 1){
			return false;
		}
		//如果 data 不为空则把 data 当数据源操作
		if($this.newObj.data[0]){
			$this.newObj.data = !$this.newObj.data instanceof Array ? [$this.newObj.data] : $this.newObj.data;
		} else if($this.newObj.url)	{
			$.get($this.newObj.url + '?_=' + Math.random(), function(_response){
				$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;
				//solution1
				if(_callback && typeof _callback == 'function'){
					_callback();
				}
			});
		}
		return true;
	};

	var generateHtml = function(_page){
		
		_page = _page || 1;
		//计算每页显示的数量
		var _pageSize = $this.newObj.cloneSize;
		//每页显示的数组最小下标
		var _min = (_page - 1) * _pageSize;
		//每页显示的数组最大下标
		var _max = _page * _pageSize -1;

		if(!$this.newObj.data[0]){
			return false;
		}
		$($this.newObj.baseDom).not(':first-child').remove();
		for(var i = _min; i <= _max; i++){
			if($this.newObj.data[i]){
				var _cloneDom = $($this.newObj.baseDom).eq(0).clone().appendTo($($this.newObj.baseDom).parent());
				// _cloneDom[0].cartData = $this.newObj.data[i];
				_cloneDom.data('model', $this.newObj.data[i]).data('guid', $this.newObj.data[i].guid || Guid.NewGuid().ToString());
				$.each($('[dombind]', _cloneDom), function(_index, _element){
					//dk-bind='pirce * count'
					if($(_element).attr('dombind').indexOf('*') > -1){
						//小计
						var _subtotal = 1;
						//['price', 'count']
						$.each($(_element).attr('dombind').split('*'), function(_i, _a){
							_subtotal *= $this.newObj.data[i][$.trim(_a)];
						});
						$(_element).text(_subtotal);
						return true;
					}				
					
					if($(_element).is('img')){
						$(_element).attr('src', $this.newObj.data[i][$(_element).attr('dombind')]);
					}else if($(_element).attr('dombind') == 'id'){
						$(_element).attr('href',$(_element).attr('href') + "?id=" + $this.newObj.data[i][$(_element).attr('dombind')]);
					}else if($(_element).attr('dombind') == 'title'){
						$(_element).attr('title', $this.newObj.data[i][$(_element).attr('dombind')]);
						$(_element).text($this.newObj.data[i][$(_element).attr('dombind')]);
					}else if($(_element).attr('dombind') == 'price'){
						$(_element).text('￥' + $this.newObj.data[i][$(_element).attr('dombind')]);
					}else{
						$(_element).text($this.newObj.data[i][$(_element).attr('dombind')]);
					}
				});
			}
		}
		$($this.newObj.baseDom).eq(0).remove();
	};

	var dkpage = function(){
		$($this.newObj.pageContainer).pagination({
            dataSource: $this.newObj.data,
            pageSize: $this.newObj.cloneSize,
            callback: function (response, pagination) {
            	$this.refresh(pagination.pageNumber);
            }
       });
	};

	this.refresh = function(_page){
		//如果数据源 data 为空，而且 url 不为空，则定为需要 ajax 请求数据源
		if(!this.newObj.data[0] && this.newObj.url){
			//调用初始化方法并把生成 html 方法当回调函数执行
			init(function(){
				generateHtml(_page);
				if($this.newObj.page){
					dkpage();
				}					
			});
		} else if(this.newObj.data && !this.newObj.data instanceof Array){
			//直接调用数据初始化方法
			var _init = init();
			if(_init){
				//调用生成 html 的方法
				generateHtml(_page);
				if($this.newObj.page){
					dkpage();
				}
			}	
		} else if(this.newObj.data && this.newObj.data instanceof Array){
			generateHtml(_page);
		}
	};

	this.refresh(1);
};

//表示全局唯一标识符 (GUID)。

function Guid(g){

     var arr = new Array(); //存放32位数值的数组

    

     if (typeof(g) == "string"){ //如果构造函数的参数为字符串

         InitByString(arr, g);

     }

     else{

         InitByOther(arr);

     }

     //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。

     this.Equals = function(o){

         if (o && o.IsGuid){

              return this.ToString() == o.ToString();

         }

         else{

              return false;

         }

     };

     //Guid对象的标记

     this.IsGuid = function(){};

     //返回 Guid 类的此实例值的 String 表示形式。

     this.ToString = function(format){

         if(typeof(format) == "string"){

              if (format == "N" || format == "D" || format == "B" || format == "P"){

                   return ToStringWithFormat(arr, format);

              }

              else{

                   return ToStringWithFormat(arr, "D");

              }

         }

         else{

              return ToStringWithFormat(arr, "D");

         }

     };

     //由字符串加载

     function InitByString(arr, g){

         g = g.replace(/\{|\(|\)|\}|-/g, "");

         g = g.toLowerCase();

         if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1){

              InitByOther(arr);

         }

         else{

              for (var i = 0; i < g.length; i++){

                   arr.push(g[i]);

              }

         }

     }

     //由其他类型加载

     function InitByOther(arr){

         var i = 32;

         while(i--){

              arr.push("0");

         }

     }

     /*

     根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。

     N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

     D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

     B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}

     P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

     */

     function ToStringWithFormat(arr, format){

         switch(format){

              case "N":

                   return arr.toString().replace(/,/g, "");

              case "D":

                   var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20,32);

                   str = str.replace(/,/g, "");

                   return str;

              case "B":

                   var str = ToStringWithFormat(arr, "D");

                   str = "{" + str + "}";

                   return str;

              case "P":

                   var str = ToStringWithFormat(arr, "D");

                   str = "(" + str + ")";

                   return str;

              default:

                   return new Guid();

         }

     }

}

//Guid 类的默认实例，其值保证均为零。

Guid.Empty = new Guid();

//初始化 Guid 类的一个新实例。

Guid.NewGuid = function(){

     var g = "";

     var i = 32;

     while(i--){

         g += Math.floor(Math.random()*16.0).toString(16);

     }

     return new Guid(g);

};