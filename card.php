<?php session_start(); ?>
<!DOCTYPE html>
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
<title>艺人驾到祝大家新春快乐，三羊开泰！</title>
<link type="text/css" rel="stylesheet" href="css/idangerous.swiper.css" />
<link type="text/css" rel="stylesheet" href="css/card.css?v=3.0" />
	<script type="text/javascript" src="js/idangerous.swiper.min.js"></script>
	<script type="text/javascript" src="js/hammer.min.js"></script>
	<script type="text/javascript" src="js/card.js?v=3.1"></script>
</head>
<body>
<?php 
	/*
	if(!isset($_COOKIE["id"])){
		setcookie("id", ''.time(), time()+36000);
	}
	$str = "http://localhost/card/card.php?id=".$_COOKIE["id"];
	//echo  $str;
    //echo time();
	if(isset($_GET['id']) && !isset($_SESSION['preId'])){
		  $_SESSION['preId']=$_GET['id'];
		echo  $_SESSION['preId'];
	}else{
		 
	}
	if(($_SESSION['load'])!=1){
		$_SESSION['load']=1;
		header($str); 
		exit;
	}
*/
?>
	<div class="container">
		<audio src="newYear.mp3" autoplay="autoplay" loop="loop"></audio>
		<canvas id="myCanvas" width="200" height="200">不支持HTML5 canvas</canvas>
		<div id="photo"><img src="" id="image" /></div>
		<!-- 轮播 -->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<!-- 财神 -->
				<div class="swiper-slide" id="scene1"> 
					<img class="animate" src="images/bg3_2_1.gif"/>
					<div class="scene"></div>
				</div>
				<!-- 如花 -->
				<div class="swiper-slide" id="scene2"> 
					<img class="animate" src="images/bg3_2_2.gif"/>
					<div class="scene"></div>
				</div>
				<!-- 武媚娘 -->
				<div class="swiper-slide" id="scene3"> 
					<img class="animate" src="images/bg3_2_3.gif"/>
					<div class="scene"></div>
				</div>
			</div>
		</div>
		
		<div class="cloud"><a href="#" class="download">下载APP</a></div>
		<div id="hitarea"></div>
		<div class="pagination"></div>
		
		<div class="toolbar">
			<a href="javascript:;" class="takephoto"><input id="photofile" type="file" accept="image/*" onchange="selectPhoto();" /></a>
			<a href="javascript:;" class="share" onclick="upload();">分享</a>
		</div>
			
	</div>

	<script type="text/javascript">
	window.onload = function() {
		var mySwiper = new Swiper('.swiper-container',{
			mode:'horizontal',
			pagination: '.pagination',
			loop: true
		});  
	  
		init();
		
		//动画
		// var scene1 = document.getElementById('scene1');
		// var cvses = document.getElementsByClassName('lighter');
		// var imageIndex = [3, 1, 2, 3, 1];
		// for(var k = 0; k < cvses.length; k++){
		// 	bgAnimate(cvses[k], imageIndex[k], scene1.offsetWidth, scene1.offsetHeight);
		// }
	}
	</script>
</body>
</html>