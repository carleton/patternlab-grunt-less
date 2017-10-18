$(document).ready(function(){
	var persistent = $('.publication .persistent');
	persistent.before('<div class="persistentToggler"><a href="#">Browse Tags &amp; Search</a></div>');
	$('.persistentToggler>a').click(function(e){
		e.preventDefault();
		if(persistent.hasClass('closed')){
			persistent.removeClass('closed');
			$(this).addClass('open');
		}
		else
		{
			persistent.addClass('closed');
			$(this).removeClass('open');
		}
	});
	persistent.addClass('closed');
});