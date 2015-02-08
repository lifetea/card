<?php
namespace Home\Controller;
use Think\Controller;
include "../Common/test.php";
// $jssdk = new JSSDK("yourAppID", "yourAppSecret");
class IndexController extends Controller {
    public function index(){
    	$jssdk = new \Org\Util\JSSDK();
    	echo $jssdk->getAccessToken();
    	echo "<br/>";
    	//echo $jssdk->getJsApiTicket();
    	echo "<br/>";
    	//echo $jssdk->hello();
		//$this->display();
    }
//     public function hello(){
//     	echo "hello";
//     }
}