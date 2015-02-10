var file = null;

var canvas = null;
var ctx = null;
var cWidth = 0;
var cHeight = 0;

var image = null;
var srcWidth = 0;
var srcHeight = 0;

var zoomDelta = 0.02;

var mc = null;
var zoom = 1;
var angle = 0;

window.onload = function() { 
	init();
}

function init(){
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
	var rotate = new Hammer.Rotate();
	pinch.recognizeWith(rotate);
	mc.add([pinch, rotate]);
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
	
	image.onload = function(){	
		document.getElementById('photo').className = 'hide';
		document.getElementById('scene').className = 'hide';
		document.getElementById('hitarea').className = '';
		document.getElementById('bingo').className = '';
		
		srcWidth = image.width;	
		srcHeight = image.height;
		
		if(srcWidth > cWidth) zoom = cWidth / srcWidth;
		
		ctx.translate(cWidth * 0.5, cHeight * 0.5);
		drawImage();
		
		/*移动*/
		mc.on("panmove", function(ev) {
			ctx.translate(ev.deltaX * 0.05, ev.deltaY * 0.05);
			drawImage();
		});
		/*缩放*/
		mc.on("pinchin", function(ev) {
			zoom -= zoomDelta;
			if(zoom <= 0) zoom = zoomDelta;
			drawImage();
		});
		mc.on("pinchout", function(ev) {
			zoom += zoomDelta;
			drawImage();
		});
		/*旋转*/
		mc.on("rotatemove", function(ev) {
			if(ev.rotation > 0) angle = angle + 0.5;
			if(ev.rotation < 0) angle = angle - 0.5;
			drawImage();
		});
	};
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
	document.getElementById('hitarea').className = 'hide';
	document.getElementById('bingo').className = 'hide';
}

function upload(){
	if(file == null) {
		alert('你还没有上传照片');
		return false;
	}
	if(!confirm('你确定要分享吗？')) return false;
	
	clipPhoto();
	
	/*获截图*/
	var dataURL = canvas.toDataURL();
	//这个就是截图的dataURL
	//alert(dataURL);
	//你可以用下面这句看到截图后的图片
	document.body.innerHTML = '<img src="'+dataURL+'" />';

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
