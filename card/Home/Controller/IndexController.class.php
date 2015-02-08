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
		$this->display();
    }
//     public function hello(){
//     	echo "hello";
//     }
}