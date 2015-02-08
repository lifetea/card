var file = null;

var canvas = null;
var ctx = null;
var cWidth = 0;
var cHeight = 0;

var pLeft = 0;
var pTop = 0;

var mc = null;
var image = null;
var zoom = 1;

var textarea = null;
var textwrap = null;

window.onload = function() { 
	init();
}

function init(){
	var container = document.getElementsByClassName('container')[0];
	cWidth = container.offsetWidth;
	cHeight = container.offsetHeight * 0.6;
	
	canvas = document.getElementById("myCanvas");
	canvas.width = cWidth;
	canvas.height = cHeight;
    ctx = canvas.getContext("2d");
	
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
}

function selectPhoto(){
	var photofile = document.getElementById('photofile');
	
	var fReader = new FileReader();
	fReader.onloadend = function(e){
		image.src = e.target.result;
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
		document.getElementById('scene').className = 'hide';
		document.getElementById('hitarea').className = '';
		document.getElementById('bingo').className = '';
		
		if(image.offsetWidth > cWidth){
			zoom = zoom * cWidth / image.offsetWidth;
			image.style.width = cWidth +'px';
		}
		
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
			if(image.offsetWidth > 200){
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

function clipPhoto(){
	document.getElementById('scene').className = '';
	document.getElementById('hitarea').className = 'hide';
	document.getElementById('bingo').className = 'hide';
}

function initText(){
	textarea = document.getElementById('textarea');
	textwrap = document.getElementById('textwrap');
	var textmc = new Hammer(textwrap);	
	textmc.on("tap", function(ev) {
		textarea.style.display = 'block';
	});
}
function preview2(){
	if(textarea == null) return false;
	if(textwrap == null) return false;
	
	textarea.style.display = 'none';
	textwrap.childNodes[0].innerHTML = textarea.value;
}

function upload(){
	if(file == null) {
		alert('你还没有上传照片');
		return false;
	}
	if(!confirm('你确定要分享吗？')) return false;
	
	/*获截图*/
	ctx.clearRect(0, 0, cWidth, cHeight);
	/*计算截图数据*/
	var il = pLeft > 0 ? 0 : -pLeft/zoom;
	var it = pLeft > 0 ? 0 : -pTop/zoom;
	
	var cl = pLeft > 0 ? pLeft : 0;
	var ct = pTop > 0 ? pTop : 0;
	
	var w = image.offsetWidth;
	var h = image.offsetHeight;
	
	var pw = 0;
	if(pLeft < 0){
		pw = (w + pLeft) < cWidth ? (w + pLeft) : cWidth;
	}else{
		pw = (w + pLeft) < cWidth ? w : cWidth - pLeft;
	}
	
	var ph = h > cHeight ? cHeight : h;
	
	ctx.drawImage(image, il, it, pw/zoom, ph/zoom, cl, ct, pw, ph);
	
	var dataURL = canvas.toDataURL();
	//这个就是截图的dataURL
	//alert(dataURL);
	//你可以用下面这句看到截图后的图片
	//document.body.innerHTML = '<img src="'+dataURL+'" />';

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

