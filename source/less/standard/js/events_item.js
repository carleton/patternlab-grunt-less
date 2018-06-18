$(document).ready(function(){

dates = $('#calendar .eventDetails .dates');
dates.hide();

explanation = $('#calendar .eventDetails .explanation');

if(explanation.length > 0)
{
	showText = 'Show all dates';
	hideText = 'Hide all dates';
	toggler = $('<span class="datesToggler show"> <a href="#">' + showText + '</a></span>');
	toggler.find('a').click(function(e){
		if(dates.is(':hidden'))
		{
			dates.show(400);
			toggler.find('.datesToggler').removeClass('show').addClass('hide');
			$(this).empty().append( hideText );
			e.preventDefault();
		}
		else
		{
			dates.hide(400);
			toggler.find('.datesToggler').removeClass('hide').addClass('show');
			$(this).empty().append( showText );
			e.preventDefault();
		}
	});
	toggler.appendTo(explanation);
}

regList = $('#slotInfo>ul>li');
if(regList.length > 8)
{
	count = 0;
	shower = $('<li class="shower"><a href="#"><strong>Show more dates</strong></a></li>');
	shower.find('a').click(function(e){
		regList.show();
		shower.hide();
		e.preventDefault();
	});
	regList.each(function(){
		count++;
		if(count > 7)
		{
			if(8 == count)
				$(this).before(shower);
			$(this).hide();
		}
	});
}

backWrapper = $('.backWrapper');
if(backWrapper.length > 0)
{
	pageTitle = $('.contentHead div.pageTitle');
	if(pageTitle.length > 0)
	{
		pageTitle.prependTo(backWrapper);
		$('.contentHead').remove();
		// should we also remove the page content, or move below the title/back button?
	}
}

});