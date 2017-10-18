<!doctype html>
<html>
<head>
<title>Typographic Preview</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<?php
include_once('reason_header.php');
reason_include_once('classes/head_items.php');
include_once(CARL_UTIL_INC.'basic/less_funcs.php');

$typography = 'default';
$head_items = new headItems();
$head_items->add_default_less_function('colorContrastYIQ', 'less_contrast_color_yiq');
$typographies = scandir(dirname(__FILE__).'/typography/');
if(!empty($_GET['typography']) && in_array($_GET['typography'].'.less', $typographies))
{
	$typography = $_GET['typography'];
}
$head_items->add_default_less_variable('typography',$typography);
$head_items->add_stylesheet('/global_stock/css/standard/typographic_preview.less');
echo $head_items->get_head_item_markup();

$typography_pretty = str_replace(array('_','-'),array(' _ ',' - '),$typography);
$typography_pretty = ucwords($typography_pretty);
$typography_pretty = str_replace(array(' _ ',' - '),array(' ','/'),$typography_pretty);

?>
</head>
<body>
<div id="wrapper">
<div id="carletonStandardThemePreviewText"><?php echo htmlspecialchars($typography_pretty); ?></div>
</div>
</div>
</body>
</html>