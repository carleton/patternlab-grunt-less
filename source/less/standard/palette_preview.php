<!doctype html>
<html>
<head>
<title>Palette Preview</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<?php
include_once('reason_header.php');
reason_include_once('classes/head_items.php');
include_once(CARL_UTIL_INC.'basic/less_funcs.php');

$head_items = new headItems();
$head_items->add_default_less_function('colorContrastYIQ', 'less_contrast_color_yiq');
$palettes = scandir(dirname(__FILE__).'/palettes/');
if(!empty($_GET['palette']) && in_array($_GET['palette'].'.less', $palettes))
{
	$head_items->add_default_less_variable('palette',$_GET['palette']);
}
else
{
	$head_items->add_default_less_variable('palette','default');
}
$head_items->add_stylesheet('/global_stock/css/standard/palette_preview.less');
echo $head_items->get_head_item_markup();
?>
</head>
<body>
<div id="wrapper">
<div id="base1" class="colorBlock"></div>
<div id="base2" class="colorBlock"></div>
<div class="texts">
<span id="accent1" class="textBlock">A</span>
<span id="accent2" class="textBlock">B</span>
<span id="text" class="textBlock">C</span>
</div>
</div>
</body>
</html>