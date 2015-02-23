<?php if (!defined('THINK_PATH')) exit();?> <!DOCTYPE html>
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
<title>安居客</title>
<link type="text/css" rel="stylesheet" href="res/card.css" />
<script type="text/javascript" src="res/hammer.min.js"></script>
<script type="text/javascript" src="res/card.js"></script>
<link type="text/css" rel="stylesheet" href="res/sweet-alert.css" />

</head>
<body>
	<div class="container">
		<audio src="res/newYear.mp3" autoplay="autoplay" loop="loop"></audio>
		<canvas id="myCanvas" width="200" height="200">不支持HTML5 canvas</canvas>
		
		<div id="photo"><img src="<?php echo ($pic); ?>" /></div>
		<input  id="userId" value="<?php echo ($id); ?>"  type="hidden" />
		<a href="javascript:;"  id="shareicon"  class="shareicon"><img src="res/images/shareicon.png"/></a>
		<div id="scene"></div>
		<div id="gifHack" style="background: url('res/images/bg-1.png') no-repeat;background-size: 100% auto;" ></div>
		<div id="textwrap">
			<textarea placeholder="<?php echo ($val); ?>"   maxlength="14" id="textarea" name="text"></textarea>
		</div>
		
		<div id="toolbar">
			<a href="javascript:;" class="takephoto"><input id="photofile" type="file" accept="image/*" onchange="selectPhoto();" /></a>
			<a href="javascript:;" class="share" onclick="share();">分享</a>
		</div>
		
		<div id="hitarea" class="hide"></div>
		
		<div id="rotateRight" class="hide" onclick="rotateRight();"></div>
		<div id="rotateLeft" class="hide" onclick="rotateLeft();"></div>
		<div id="bingo" class="hide" onclick="clipPhoto();"></div>
	</div>
	<script type="text/javascript" src="res/sweet-alert.min.js"></script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript">
	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
	window.conf ={
			"link":"http://card.greenco.com.cn/card4.php?id="
		};
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
		var id =getQueryString("id");
		wx.onMenuShareAppMessage({
		    title: "安居客祝你羊年大吉，一站到家！",
		    desc: '安居客APP，有钱任性，随时找房，买卖房屋，最快平台！',
		    link: window.conf["link"]+id,
		    imgUrl: 'http://card.greenco.com.cn/res/images/anjukelogo.png',
		    trigger: function (res) {
		      //alert('用户点击发送给朋友');
		    },
		    success: function (res) {
		      //alert('已分享');
		    },
		    cancel: function (res) {
		      //alert('已取消');
		    },
		    fail: function (res) {
		      alert(JSON.stringify(res));
		    }
		  });
		
	    wx.onMenuShareTimeline({
		      title: "安居客祝你羊年大吉，一站到家！",
		      link: window.conf["link"]+id,
		      imgUrl: 'http://card.greenco.com.cn/res/images/anjukelogo.png',
		      trigger: function (res) {
		        //alert('用户点击分享到朋友圈');
		      },
		      success: function (res) {
		        alert('已分享');
		      },
		      cancel: function (res) {
		        //alert('已取消');
		      },
		      fail: function (res) {
		        alert(JSON.stringify(res));
		      }
		    });
	});
	wx.error(function(res){
	
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	
	});

	</script>
	<?php require_once 'cs.php';echo '<img src="'._cnzzTrackPageView(1254424340).'" width="0" height="0"/>';?>
</body>
</html>