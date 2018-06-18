$(document).ready(function(){
	if($('#imageGallery #gallerySearchField').length < 1)
		return;
	val = $('#imageGallery #gallerySearchField').val();
	if(val.length < 1)
	{
		var inputs = $('#searchWrapper form input, #searchWrapper form .colon')
		$('#searchWrapper').addClass('collapsed');
		inputs.hide();
		$('#searchWrapper label').click(function(e) {
			$('#searchWrapper').removeClass('collapsed');
			inputs.show(333);
		});
	}
});