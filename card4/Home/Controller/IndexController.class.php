<?php
namespace Home\Controller;
use Think\Controller;
include "../Common/test.php";
// $jssdk = new JSSDK("yourAppID", "yourAppSecret");
class IndexController extends Controller {
    public function index(){
    	$jssdk = new \Org\Util\JSSDK();
    	$signPackage = $jssdk->getSignPackage();
    	//echo $jssdk->getJsApiTicket();
    	//echo $jssdk->hello();
    	$this->assign('data',$signPackage);
    	$pic = '';
    	$val = '';
    	if($_GET['id']){
    		$pic ="http://card.greenco.com.cn/uploads/avatar/". $_GET['id'].".jpg";
    	}else{
    		$pic = "res/images/who.jpg";
    	}
    	if($_GET['val']){
    		$val = urldecode ($_GET['val']); 
    	}else{
    		$val = "新年快乐！恭喜发财！健康快乐";
    	}
    	session('id',time());
    	$this->assign('id',session('id'));
    	$this->assign('val',$val);
    	$this->assign('pic',$pic);
		$this->display();
    }
}