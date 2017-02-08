var dkFrm = function(dkScope){
	var dkForElements = $('[dk-for]');
	if(!dkForElements[0]){
		return false;
	}
	$.each(dkForElements, function(_index, _element){
		var dkForAttr = $(_element).attr('dk-for'); // dkModels
		if(dkScope[dkForAttr]){
			// dkScope[dkForAttr] === dkScope.dkModels
			for(var i = 0; i < dkScope[dkForAttr].length; i++){
				var $obj = dkScope[dkForAttr][i];
				var $subNav = $obj['subNav'];
				console.log($subNav);
				//$('<a></a>').text($obj.title).attr('href', $obj.url).attr('flag', $obj.id).appendTo(dkForElements);
				var $clone = $(_element).clone().insertAfter($(_element));
				var $dkBind = $('[dk-bind]', $clone).attr('dk-bind'); // aa.a
				var $dkHref = $('[dk-href]', $clone).attr('dk-href');
				$('[dk-bind]', $clone).text($obj['aa']['a']);//$obj.title
				$('[dk-href]', $clone).attr('href', $obj[$dkHref]);//$obj.url
			}
			$(_element).remove();
		}			
	})
						
}

$(function(){



	
}) 