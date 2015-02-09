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
	
	var dataURL = snapshot();
	//这个就是截图的dataURL
	//alert(dataURL);
	//你可以用下面这句看到截图后的图片
//	document.body.innerHTML = '<img src="'+dataURL+'" />';

	var fd = new FormData();
	fd.append("photofile", dataURL2blob(dataURL));
	fd.append("id", getId());
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
//		document.title = "在这里给大家拜年了";
//		var proView = document.getElementById("proView");
//		proView.src="uploads/snapshot/"+getId()+".jpg";
	}
	xhr.send(fd);	
	/*
	fd.append("id", getId());
	//getCookie("id")

*/	
}

function snapshot(){
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
	
	var dataURL = canvas.toDataURL("image/jpeg");
	
	return dataURL;
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
	      link: 'http://card.greenco.com.cn/index.php?id='+getId(),
	      imgUrl: 'http://card.greenco.com.cn/uploads/avatar/'+getId()+'.jpg',
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
}

function addCookie(name,value,expiresHours){ 
	var cookieString=name+"="+escape(value); 
	//判断是否设置过期时间 
	if(expiresHours>0){ 
		var date=new Date(); 
		date.setTime(date.getTime+expiresHours*3600*1000); 
		cookieString=cookieString+"; expires="+date.toGMTString(); 
	} 
	document.cookie=cookieString; 
}
function getCookie(name){ 
	var strCookie=document.cookie; 
	var arrCookie=strCookie.split("; "); 
	for(var i=0;i<arrCookie.length;i++){ 
	var arr=arrCookie[i].split("="); 
	if(arr[0]==name)return arr[1]; 
	} 
	return ""; 
}
function getId(){
	var id = getCookie("id");
	if(!id){
		var timestamp = new Date().getTime(); 
		addCookie("id",timestamp+'',12);
	}
	return getCookie("id");
}