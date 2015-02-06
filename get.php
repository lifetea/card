<?php
function wx_get_token() {
	$token1 = S('access_token');
	if (!$token1) {
		//$res = file_get_contents('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.'wx1c5619b4d24d1301'.'&secret='.'            ');
		//$res = json_decode($res, true);
		//$token = $res['access_token'];
		$token1 = '11';
		// 注意：这里需要将获取到的token缓存起来（或写到数据库中）
		// 不能频繁的访问https://api.weixin.qq.com/cgi-bin/token，每日有次数限制
		// 通过此接口返回的token的有效期目前为2小时。令牌失效后，JS-SDK也就不能用了。
		// 因此，这里将token值缓存1小时，比2小时小。缓存失效后，再从接口获取新的token，这样
		// 就可以避免token失效。
		// S()是ThinkPhp的缓存函数，如果使用的是不ThinkPhp框架，可以使用你的缓存函数，或使用数据库来保存。
		S('access_token', $token1, 3600);
	}
	return $token;
}

?>