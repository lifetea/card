﻿﻿﻿﻿﻿﻿var file = null;
var userId = null;
var canvas = null;
var ctx = null;
var cWidth = 0;
var cHeight = 0;

var image = null;
var srcWidth = 0;
var srcHeight = 0;

var mc = null;
var zoom = 1;
var angle = 0;
var translateX = 0;
var translateY = 0;
var isFirst = true;
var isPinch = false;

window.onload = function() { 
	init();
}

function init(){
	userId = getId();
	var container = document.getElementsByClassName('container')[0];
	cWidth = container.offsetWidth;
	cHeight = container.offsetHeight;
	
	canvas = document.getElementById("myCanvas");
	canvas.width = cWidth;
	canvas.height = cHeight;
    ctx = canvas.getContext("2d");
	
	var hitarea = document.getElementById('hitarea');
	mc = new Hammer(hitarea);	
	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	var pinch = new Hammer.Pinch();
	mc.add([pinch]);
}

function selectPhoto(){
	var photofile = document.getElementById('photofile');
	
	var fReader = new FileReader();
	fReader.onloadend = function(e){
		image = new Image();
		image.src = e.target.result;
		initPhoto();
	}
	file = photofile.files[0];
	fReader.readAsDataURL(file);
}
	
function initPhoto(){	
	zoom = 1;
	angle = 0;
	
	translateX = isFirst == true ? cWidth * 0.5 : -translateX;
	translateY = isFirst == true ? cHeight * 0.5 : -translateY;
	
	image.onload = function(){	
		document.getElementById('photo').className = 'hide';
		document.getElementById('scene').className = 'hide';
		document.getElementById('gifHack').className = 'hide';
		document.getElementById('hitarea').className = '';
		document.getElementById('rotateRight').className = '';
		document.getElementById('rotateLeft').className = '';
		document.getElementById('bingo').className = '';
		
		srcWidth = image.width;	
		srcHeight = image.height;
		
		if(srcWidth > cWidth) zoom = cWidth / srcWidth;
		
		ctx.translate(translateX, translateY);
		if(srcWidth>srcHeight){
			angle += 90;
		}		
		drawImage();
		isFirst = false;
		translateX = 0;
		translateY = 0;
		
		var left = 0;
		var top = 0;
		/*移动*/
		mc.on("panmove", function(ev) {
			if(isPinch) return false;
			ctx.translate(ev.deltaX - left, ev.deltaY - top);
			drawImage();
			left = ev.deltaX;
			top = ev.deltaY;
		});
		mc.on("panend", function(ev) {
			if(isPinch) return false;
			translateX = ev.deltaX;
			translateY = ev.deltaY;
			left = 0;
			top = 0;
		});
		/*缩放*/
		mc.on("pinchstart", function(ev) {
			isPinch = true;
		});
		mc.on("pinchin", function(ev) {
			zoom = zoom * 0.98;
			drawImage();
		});
		mc.on("pinchout", function(ev) {
			zoom = zoom * 1.02;
			drawImage();
		});
		mc.on("pinchend", function(ev) {
			isPinch = false;
		});
	};
}

function rotateRight(){
	angle += 10;
	drawImage();
}
function rotateLeft(){
	angle -= 10;
	drawImage();
}

function drawImage() {
    ctx.clearRect(-cWidth * 0.5 - srcWidth * 0.5, -cHeight * 0.5 - srcHeight * 0.5, cWidth + srcWidth, cHeight + srcHeight);
	ctx.save();
    ctx.scale(zoom, zoom);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(image, -srcWidth * 0.5, -srcHeight * 0.5);
    ctx.restore();
}

function clipPhoto(){
	document.getElementById('scene').className = '';
	document.getElementById('gifHack').className = '';
	document.getElementById('hitarea').className = 'hide';
	document.getElementById('rotateRight').className = 'hide';
	document.getElementById('rotateLeft').className = 'hide';
	document.getElementById('bingo').className = 'hide';
	upload();
}


function share(){
	if(file == null) {
		swal("温馨提示", "您还没有上传照片")
		return false;
	}
	document.getElementById('shareicon').style.display = 'block';
	//if(!confirm('你确定要分享吗？')) return false;
}

function upload(){
	var fd = new FormData();
	var dataURL = canvas.toDataURL("image/png");
	//这个就是截图的dataURL
	//alert(dataURL);
	//你可以用下面这句看到截图后的图片
	//document.body.innerHTML = '<img src="'+dataURL+'" />';
	
	fd.append("photofile", dataURL2blob(dataURL));
	fd.append("id", userId);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'upload.php');//第二个参数是请求地址
	xhr.upload.onprogress = function(e) {
	    if (e.lengthComputable) {
	      var percentComplete = (e.loaded / e.total) * 100;
	      console.log(percentComplete + '% uploaded');
	    }
  	};
	xhr.onload = function() {
		shareTimeline();
		shareAppMessage();
	}
//	html2canvas(document.getElementById('photo'), {
//		  onrendered: function(canvas) {
//			  var dataURL = canvas.toDataURL("image/png");
//			  fd.append("photofile", dataURL2blob(dataURL));
//			  //document.body.innerHTML = '<img src="'+dataURL+'" />';
//		  },
//	});
	xhr.send(fd);	
}

function dataURL2blob(dataURL){
	dataURL=dataURL.split(',')[1];
	dataURL=window.atob(dataURL);
	var ia = new Uint8Array(dataURL.length);
	for (var i = 0; i < dataURL.length; i++) {
	    ia[i] = dataURL.charCodeAt(i);
	};
	var blob=new Blob([ia], {type:"image/jpg"});
	return blob;
}

function shareTimeline(){
    wx.onMenuShareTimeline({
	      title: "艺人驾到 祝您羊年大吉，生意兴隆!",
	      link: window.conf["link"]+userId,
	      imgUrl: 'http://card.greenco.com.cn/src/images/yiren.png',
	      trigger: function (res) {
	        //alert('用户点击分享到朋友圈');
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
}

function shareAppMessage(){
	wx.onMenuShareAppMessage({
	    title: "艺人驾到 祝您羊年大吉，生意兴隆!",
	    desc: '大秤分金虚席以待，足不出户生意兴隆。艺人驾到让你有钱，任性！',
	    link: window.conf["link"]+userId,
	    imgUrl: 'http://card.greenco.com.cn/src/images/yiren.png',
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
}

function getId(){
	var  a = document.getElementById("userId")
	return a.value;
}
