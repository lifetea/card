<?php
function wx_get_token() {
	$token1 = S('access_token');
	if (!$token1) {
		//$res = file_get_contents('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.'wx1c5619b4d24d1301'.'&secret='.'            ');
		//$res = json_decode($res, true);
		//$token = $res['access_token'];
		$token1 = '11';
		// ע�⣺������Ҫ����ȡ����token������������д�����ݿ��У�
		// ����Ƶ���ķ���https://api.weixin.qq.com/cgi-bin/token��ÿ���д�������
		// ͨ���˽ӿڷ��ص�token����Ч��ĿǰΪ2Сʱ������ʧЧ��JS-SDKҲ�Ͳ������ˡ�
		// ��ˣ����ｫtokenֵ����1Сʱ����2СʱС������ʧЧ���ٴӽӿڻ�ȡ�µ�token������
		// �Ϳ��Ա���tokenʧЧ��
		// S()��ThinkPhp�Ļ��溯�������ʹ�õ��ǲ�ThinkPhp��ܣ�����ʹ����Ļ��溯������ʹ�����ݿ������档
		S('access_token', $token1, 3600);
	}
	return $token;
}

?>