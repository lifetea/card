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
    	if($_GET['id']){
    		$pic ="http://card.greenco.com.cn/uploads/avatar/". $_GET['id']."jpg";
    	}
    	echo $pic;
    	$this->assign('pic',$pic);
		$this->display();
    }
//     public function hello(){
//     	echo "hello";
//     }
}