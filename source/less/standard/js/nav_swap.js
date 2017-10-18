$(document).ready(function(e){
	var nav=$('#minisiteNavigation');
	var subNav=$('#navigation .subNavElements');
	if(nav.length && subNav.length){
		var navWrap=$('#navigation');
		var blurbNavSwap=function(){
			if(navWrap.css('float')!='left' && nav.css('float')!='left' && subNav.css('float')!='left'){
				if(nav.is(':first-child')){
					nav.insertAfter(subNav);
				}
			}
			else {
				if(!nav.is(':first-child')){
					subNav.insertAfter(nav);
				}
			}
		};
		blurbNavSwap();$(window).resize(blurbNavSwap);
	}
});