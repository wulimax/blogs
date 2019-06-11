## 钉钉消息推送

```php
class DingDing{
    /****开发钉钉通知系统********************************************/
    protected    $AgentId= ;
    protected    $AppKey= '';
    protected    $AppSecret= '';
    private $token = null;
    private $user_table = null;
    /**公共请求方法**/
    public function post_url($url, $post = '', $host = '', $referrer = '', $cookie = '', $proxy = -1, $sock = false, $useragent = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1)')
    {//'192.3.25.99:7808'
        if (empty($post) && empty($host) && empty($referrer) && empty($cookie) && ($proxy == -1 || empty($proxy)) && empty($useragent)) return @file_get_contents($url);
        $method = empty($post) ? 'GET' : 'POST';

        if (function_exists('curl_init') && empty($cookie)) {
            $ch = @curl_init();
            @curl_setopt($ch, CURLOPT_URL, $url);
            if ($proxy != -1 && !empty($proxy)) @curl_setopt($ch, CURLOPT_PROXY, 'http://' . $proxy);
            @curl_setopt($ch, CURLOPT_REFERER, $referrer);
            @curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
            @curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE_PATH);
            @curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE_PATH);
            @curl_setopt($ch, CURLOPT_HEADER, 0);
            @curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            @curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            @curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
            @curl_setopt($ch, CURLOPT_TIMEOUT, 60);
            @curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

            if ($method == 'POST') {
                @curl_setopt($ch, CURLOPT_POST, 1);
                @curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
            }

            $result = @curl_exec($ch);
            @curl_close($ch);
        }

        if ($result === false && function_exists('file_get_contents')) {
            $urls = parse_url($url);
            if (empty($host)) $host = $urls['host'];
            $httpheader = $method . " " . $url . " HTTP/1.1\r\n";
            $httpheader .= "Accept: */*\r\n";
            $httpheader .= "Accept-Language: zh-cn\r\n";
            $httpheader .= "Referer: " . $referrer . "\r\n";
            if ($method == 'POST') $httpheader .= "Content-Type: application/x-www-form-urlencoded\r\n";
            $httpheader .= "User-Agent: " . $useragent . "\r\n";
            $httpheader .= "Host: " . $host . "\r\n";
            if ($method == 'POST') $httpheader .= "Content-Length: " . strlen($post) . "\r\n";
            $httpheader .= "Connection: Keep-Alive\r\n";
            $httpheader .= "Cookie: " . $cookie . "\r\n";

            $opts = array(
                'http' => array(
                    'method' => $method,
                    'header' => $httpheader,
                    'timeout' => 60,
                    'content' => ($method == 'POST' ? $post : '')
                )
            );
            if ($proxy != -1 && !empty($proxy)) {
                $opts['http']['proxy'] = 'tcp://' . $proxy;
                $opts['http']['request_fulluri'] = true;
            }
            $context = @stream_context_create($opts);
            $result = @file_get_contents($url, 'r', $context);
        }

        if ($sock && $result === false && function_exists('fsockopen')) {
            $urls = parse_url($url);
            if (empty($host)) $host = $urls['host'];
            $port = empty($urls['port']) ? 80 : $urls['port'];

            $httpheader = $method . " " . $url . " HTTP/1.1\r\n";
            $httpheader .= "Accept: */*\r\n";
            $httpheader .= "Accept-Language: zh-cn\r\n";
            $httpheader .= "Referer: " . $referrer . "\r\n";
            if ($method == 'POST') $httpheader .= "Content-Type: application/x-www-form-urlencoded\r\n";
            $httpheader .= "User-Agent: " . $useragent . "\r\n";
            $httpheader .= "Host: " . $host . "\r\n";
            if ($method == 'POST') $httpheader .= "Content-Length: " . strlen($post) . "\r\n";
            $httpheader .= "Connection: Keep-Alive\r\n";
            $httpheader .= "Cookie: " . $cookie . "\r\n";
            $httpheader .= "\r\n";
            if ($method == 'POST') $httpheader .= $post;
            $fd = false;
            if ($proxy != -1 && !empty($proxy)) {
                $proxys = explode(':', $proxy);
                $fd = @fsockopen($proxys[0], $proxys[1]);
            } else {
                $fd = @fsockopen($host, $port);
            }
            @fwrite($fd, $httpheader);
            @stream_set_timeout($fd, 60);
            $result = '';
            while (!@feof($fd)) {
                $result .= @fread($fd, 8192);
            }
            @fclose($fd);
        }

        return $result;
    }
    /**文件缓存管管理
     * @param $key
     * @param $value
     * @param $time 默认十分钟
     */
    public function rediscache($key = '',$value='',$time= 600){
        if(empty($key)){return false;}
        $file_path = '/web/log/dingding.txt';
        $cacheData = [];
        $resData = null;
        if(!is_file($file_path)){ return false; }
        foreach ($this->readTxt($file_path) as $item){
            $item = json_decode($item,true);
            if($item['time']< time()){ continue; }
            $item[$item['key']]['value'] = $item['value'];
            $item[$item['key']]['time'] = $item['time'];
            $item[$item['key']]['key'] = $item['key'];
        }
            // 删除
        if($time == 0){ unset($cacheData[$key]); $resData = true;}
            //查询
        if(empty($value) && !empty($key)){
            $resData = isset($cacheData[$key])?$cacheData[$key]:null;
        }
            //写入
        if(!empty($value) && !empty($key)){
            $cacheData[$key]['key'] = $key;
            $cacheData[$key]['value'] = $value;
            $cacheData[$key]['time'] = time()+$time;
            $resData = true;
        }
         $string = '';
        foreach ($cacheData as $item){
            $string .= json_encode($item,320).PHP_EOL;
        }
        file_put_contents($file_path, $string);
        //默认false
        return $resData;
    }
    /**
    *$value 发送内容
    *$tile 发送人
    **/
    public function index($value='',$tile=){
       $userid = $this->getAlluser($tile);
       if(empty($tile)){
           $user_lit = [];
           foreach ($userid as $item){
               if($item['pname'] != '默认发送给指定的人'){ continue; }
               array_push($user_lit,$item['userid']);
           }
           return $this->putMq(implode(',',$user_lit),$value);
       }else{
          return $this->putMq(implode(',',$userid),$value);
       }

    }
    private function getToken(){
        if(!empty($this->token)){ return $this->token; }
        $resdata = $this->rediscache('dingdingtoken');
        if($resdata){ return $resdata; }
        $url  = 'https://oapi.dingtalk.com/gettoken?appkey='.$this->AppKey.'&appsecret='.$this->AppSecret;
        $resdata =$this->post_url($url);
        $resdata = json_decode($resdata,true);
        if($resdata['errcode'] ==0 && isset($resdata['access_token'])){
            $this->rediscache('dingdingtoken',$resdata['access_token'],7000);
        }
        $this->token = $resdata['access_token'];
        return $resdata['access_token'];
    }
    /**获取所有用户名,手机号,部门,部门id**/
    private function getAlluser($req){
        $userArr = $this->user_table;
        if(empty($userArr)){ $userArr = $this->rediscache('dingding:userall');}
        if(!$userArr) {
            $url = 'https://oapi.dingtalk.com/department/list?access_token=' . $this->getToken();
            $resdata = $this->post_url($url);
            $resdata = json_decode($resdata, true);
            if ($resdata['errcode'] != 0) {
                return false;
            }
            $userArr = [];
            foreach ($resdata['department'] as $itme) {
                $url = 'https://oapi.dingtalk.com/user/listbypage?access_token=' . $this->getToken() . '&department_id=' . $itme['id'] . '&offset=0&size=100';
                $dpt = $this->post_url($url);
                $dpt = json_decode($dpt, true);
                if ($dpt['errcode'] != 0) {
                    continue;
                }
                foreach ($dpt['userlist'] as $value) {
                    $userArr[$value['userid']]['username'] = $value['name'];
                    $userArr[$value['userid']]['userid'] = $value['userid'];
                    $userArr[$value['userid']]['mobile'] = $value['mobile'];
                    $userArr[$value['userid']]['pid'] = $itme['id'];
                    $userArr[$value['userid']]['pname'] = $itme['name'];
                }
            }

            $this->rediscache('dingding:userall', json_encode($userArr, 320));
            $this->user_table = $userArr;
        }
        if(!is_array($userArr)){ $userArr = json_decode($userArr,true); }
        $resData = [];
        if(!empty($req)){
            if(is_array($req)){
                foreach ($userArr as $item){
                    foreach ($req as $value){
                        if(is_string($value) && $value ==$item['username']){array_push($resData,$item['userid']);}
                        if(is_numeric($value) && $value ==$item['mobile']){array_push($resData,$item['userid']);}
                    }
                }
            }
            if(is_numeric($req)){
                foreach ($userArr as $item){
                    if($req ==$item['mobile']){array_push($resData,$item['userid']);}
                }
            }
            if(is_string($req)){
                foreach ($userArr as $item){
                    if($req ==$item['username']){array_push($resData,$item['userid']);}
                }
            }
        }
        return empty($resData)?$userArr:$resData;
    }
    /**发送钉钉消息**/
    private function putMq($userid_list='',$value =''){
        if(empty($userid_list) || empty($value)){return false;}
        $url = 'https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2?access_token='.$this->getToken();
        $data['agent_id'] = $this->AgentId;
        $data['userid_list'] = $userid_list;
        $data['msg']['msgtype'] = 'text';
        $data['msg']['text']['content'] = $value;
        $data['msg'] = json_encode($data['msg'],320);
        return $this->post_url($url,$data);

    }
    /**读取本地文件内容
    *$filepath 文件路径
    */
    public  function readTxt($filepath)
    {
        $handle = fopen($filepath, 'rb');
        while (feof($handle)===false) {
            # code...
            yield fgets($handle);
        }
        fclose($handle);
    }

}
```

