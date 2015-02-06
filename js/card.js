var scenes = [];
var file = null;

var canvas = null;
var ctx = null;
var cWidth = 0;
var cHeight = 0;

var pWidth = 0;
var pHeight = 0;
var pLeft = 0;
var pTop = 0;

var mc = null;
var image = null;
var zoom = 1;

function init(){
	canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
	cWidth = canvas.width;
	cHeight = canvas.height;
	
	pWidth = cWidth;
	pHeight = cHeight;
	
	var hitarea = document.getElementById('hitarea');
	mc = new Hammer(hitarea);	
	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	var pinch = new Hammer.Pinch();
	var rotate = new Hammer.Rotate();
	// we want to detect both the same time
	//pinch.recognizeWith(rotate);
	// add to the Manager
	mc.add([pinch]);
	
	image = document.getElementById('image');
	scenes = document.getElementsByClassName('scene');
}

function selectPhoto(){
	var photofile = document.getElementById('photofile');
	
	var fReader = new FileReader();
	fReader.onloadend = function(e){
		image.src = e.target.result;
		for(var i = 0, len = scenes.length; i < len; i++){
			scenes[i].className = 'scene opacity';
		}
	}
	file = photofile.files[0];
	fReader.readAsDataURL(file);
	
	initPhoto();
}
	
function initPhoto(){	
	image.style.top = '0px';
	image.style.left = '0px';
	zoom = 1;
	
	image.onload = function(){
		mc.on("tap", function(ev) {
			for(var i = 0, len = scenes.length; i < len; i++){
				scenes[i].className = 'scene opacity';
			}
		});
		/*移动*/
		var top = 0;
		var left = 0;	
		mc.on("panmove", function(ev) {
			image.style.top = top + ev.deltaY + 'px';
			image.style.left = left + ev.deltaX + 'px';
		});
		mc.on("panend", function(ev) {
			top = top + ev.deltaY;
			left = left + ev.deltaX;
			
			pTop = top;
			pLeft = left;
		});
		/*缩放*/
		mc.on("pinchin", function(ev) {
			if(image.offsetWidth > cWidth){
				image.style.width = image.offsetWidth * 0.98 +'px';
				zoom = zoom * 0.98;
			}
		});
		mc.on("pinchout", function(ev) {
			image.style.width = image.offsetWidth * 1.02 +'px';
			zoom = zoom * 1.02;
		});
	};
}

function preview(){
	for(var i = 0, len = scenes.length; i < len; i++){
		scenes[i].className = 'scene';
	}
}

function upload(){
	if(file == null) {
		alert('你还没有上传照片');
		return false;
	}
	if(!confirm('你确定要分享吗？')) return false;
	
	/*获得场景的id(scene1|scene2|scene3)*/
	var id = document.getElementsByClassName('swiper-slide-active')[0].id;
	
	/*获截图*/
	ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.drawImage(image, -pLeft/zoom, -pTop/zoom, pWidth/zoom, pHeight/zoom, 0, 0, cWidth, cHeight);
	
	var dataURL = canvas.toDataURL();
	//这个就是截图的dataURL
	alert(dataURL);
	return false;
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '');//第二个参数是请求地址
	var boundary = '----------ei4GI3gL6gL6ae0ei4cH2Ef1gL6GI3';
	xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary='+ boundary);	
	xhr.onload = function() {
		alert('success');
	};
	xhr.send(file);
}

