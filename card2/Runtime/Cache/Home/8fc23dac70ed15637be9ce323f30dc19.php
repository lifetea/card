<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
<meta name="screen-orientation" content="portrait">
<meta name="x5-orientation" content="portrait">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="browsermode" content="application">
<meta name="x5-page-mode" content="app">
<meta name="description" content="拜大年">
<meta name="author" content="Lee">
<title>艺人驾到</title>
<link type="text/css" rel="stylesheet" href="src/card.css" />
<script type="text/javascript" src="src/hammer.min.js"></script>
<script type="text/javascript" src="src/card.js"></script>
</head>
<body>
	<div class="container" id="container2">
		<audio src="src/newYear.mp3" autoplay="autoplay" loop="loop"></audio>
		<canvas id="myCanvas">不支持HTML5 canvas</canvas>
		<!-- 新页面默认是who.jpg，如果是分享的就写分享的图片地址 -->
		<div id="photo"><img src="<?php echo ($pic); ?>" /></div>
		<input  id="userId" value="<?php echo ($id); ?>"  type="hidden" />
		<a href="javascript:;"  id="shareicon"  class="shareicon"><img src="src/images/shareicon.png"/></a>
		<div id="scene"></div>
		<div id="hitarea" class="hide"></div>
		
		<div id="rotateRight" class="hide" onclick="rotateRight();"></div>
		<div id="rotateLeft" class="hide" onclick="rotateLeft();"></div>
		<div id="bingo" class="hide" onclick="clipPhoto();"></div>
		
		<div class="cloud">
			<div class="toolbar">
				<a href="javascript:;" class="takephoto"><input id="photofile" type="file" accept="image/*" onchange="selectPhoto();" /></a>
				<a href="http://www.baidu.com"  class="download"  ">下载App</a>
				<a href="javascript:;" class="share" onclick="share();">分享</a>
			</div>
		</div>
	</div>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<!--  
<?php echo ($data["string"]); ?>|
<?php echo ($data["url"]); ?>|
<?php echo ($data["jsapi_ticket"]); ?>

-->
<script type="text/javascript">
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '<?php echo ($data["appId"]); ?>', // 必填，公众号的唯一标识
    timestamp: <?php echo ($data["timestamp"]); ?>, // 必填，生成签名的时间戳
    nonceStr:'<?php echo ($data["nonceStr"]); ?>', // 必填，生成签名的随机串
    signature:'<?php echo ($data["signature"]); ?>',// 必填，签名，见附录1
    jsApiList: ['checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
wx.ready(function(){
	
});
wx.error(function(res){

    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});
</script>	
</body>
</html>