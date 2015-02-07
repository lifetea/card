<?php
namespace Home\Controller;
use Think\Controller;
include "../Common/test.php";
// $jssdk = new JSSDK("yourAppID", "yourAppSecret");
class IndexController extends Controller {
    public function index(){
//     	function wx_get_token() {
//     		$token = S('access_token');
//     		if (!$token) {
//     			$res = file_get_contents('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1c5619b4d24d1301&secret=97df1cbc025cedb005924b0871b9280e');
//     			$res = json_decode($res, true);
//     			$token = $res['access_token'];
//     			 // 注意：这里需要将获取到的token缓存起来（或写到数据库中）
//     			// 不能频繁的访问https://api.weixin.qq.com/cgi-bin/token，每日有次数限制
//     			// 通过此接口返回的token的有效期目前为2小时。令牌失效后，JS-SDK也就不能用了。
//     			// 因此，这里将token值缓存1小时，比2小时小。缓存失效后，再从接口获取新的token，这样
//     			// 就可以避免token失效。
//     			// S()是ThinkPhp的缓存函数，如果使用的是不ThinkPhp框架，可以使用你的缓存函数，或使用数据库来保存。
//     			S('access_token', $token, 3600);
//     		}
//     		return $token;
//     	}
//         //$this->show('<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} body{ background: #fff; font-family: "微软雅黑"; color: #333;font-size:24px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.8em; font-size: 36px } a,a:hover,{color:blue;}</style><div style="padding: 24px 48px;"> <h1>:)</h1><p>欢迎使用 <b>ThinkPHP</b>！</p><br/>版本 V{$Think.version}</div><script type="text/javascript" src="http://ad.topthink.com/Public/static/client.js"></script><thinkad id="ad_55e75dfae343f5a1"></thinkad><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script>','utf-8');
//     	echo  wx_get_token();
//     	 = new Test();
    	$jssdk = new \Org\Util\JSSDK();
    	echo $jssdk->getAccessToken();
    	echo "<br/>";
    	//echo $jssdk->getJsApiTicket();
    	echo "<br/>";
    	echo $jssdk->hello();
		//$this->display();
    }
    public function hello(){
    	echo "hello";
    }
}