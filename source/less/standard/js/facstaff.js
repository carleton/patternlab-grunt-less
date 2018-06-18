$(document).ready(function(){
	var wrapper = $('#facultyStaff');
	var facStaff = wrapper.children('.facStaff');
	var names = facStaff.children('.facStaffName');
	wrapper.addClass('dynamic');
	if(!(wrapper.hasClass('collapsed') || wrapper.hasClass('open')))
		wrapper.addClass('collapsed');
	var nameSize = function(){
		if(wrapper.hasClass('collapsed'))
		{
			var largest = 0;
			names.css('height','auto').each(function(e){
				height = $(this).height();
				if(height > largest)
					largest = height;
				if($(this).siblings('.facStaffImage, .facStaffImageReplacement').length < 1){
					$(this).before('<div class="facStaffImageReplacement"></div>');
				};
			});
			names.css('height', largest + 'px');
		}
	};
	var doInfoWidth = function(){
		var blocks = facStaff.filter('.open');
		blocks.each(function(){
			$(this).children('.facStaffInfoWrapper').css('width', wrapper.width()).css('margin-left', $(this).position().left * -1);
		});
	};
	var facStaffExpandEnable = function(){
		facStaff.children('.facStaffImage, .facStaffImageReplacement, .facStaffName').click(function(e){
			e.preventDefault();
			state = 'closed';
			if($(this).parent().hasClass('open'))
				state = 'open';
			facStaff.removeClass('open');
			if('closed' == state)
			{
				var facStaffInfoWrapper = $(this).parent().children('.facStaffInfoWrapper');
				facStaffInfoWrapper.css('overflow','hidden').css('height',0);
				$(this).parent().addClass('open');
				doInfoWidth();
				itemHeight = facStaffInfoWrapper.children('.facStaffName').outerHeight() + facStaffInfoWrapper.children('.facStaffInfoWrapper2').outerHeight();
				completion = function(){
					facStaffInfoWrapper.css('overflow','visible').css('height','auto');
				};
				// Use the itemHeight as the duration to ensure all open at same speed: 1ms/px
				facStaffInfoWrapper.animate({height: itemHeight}, itemHeight, 'linear', completion);
			}
		});
	};
	expander = $('<a href="#" class="expander">List View</a>');
	expander.click(function(e){
		e.preventDefault();
		wrapper.removeClass('collapsed').addClass('open');
		names.css('height','auto');
		facStaff.find('.facStaffInfoWrapper').css('width','auto').css('margin-left',0);
		// Remove click-to-expand in List View so profile and photo links work properly
		facStaff.find('.facStaffImage, .facStaffImageReplacement, .facStaffName').off('click');
	});
	collapser = $('<a href="#" class="collapser">Grid View</a>');
	collapser.click(function(e){
		e.preventDefault();
		facStaff.removeClass('open');
		wrapper.addClass('collapsed').removeClass('open');
		nameSize();
		doInfoWidth();
		// Re-enable click-to-expand
		facStaffExpandEnable();
	});
	if(wrapper.children('.facStaffNavLinks').length > 0)
		wrapper.children('.facStaffNavLinks').append(expander).append(collapser);
	else if(wrapper.children('#deptInfo').length > 0)
		wrapper.children('#deptInfo').append(expander).append(collapser);
	else
		wrapper.prepend(expander).prepend(collapser);
	wrapper.find('.expander, .collapser').wrapAll('<span class="expandCollapse"></span>');
	$(window).resize(doInfoWidth);
	facStaff.each(function(){
		$(this).children('.facStaffName').clone().prependTo($(this).children('.facStaffInfoWrapper'));
	});
	$(window).resize(nameSize);
	$(window).load(function(){
		nameSize();

		if (wrapper.hasClass('collapsed')) {
			facStaffExpandEnable();
		}
	});
});
