目的 搜索引擎从sphinx 切换到 es 为了不使业务变动太多 所有封装 继承 [sphinx 部分接口](https://github.com/wulimax/fs2/blob/master/sphinx/README.md)

```php
 <?php

 /**elasticesarch 封装类
  * Class elasticsearch
  */
 final class elasticsearch
{
    private static  $esobj;
    private $host = null;
    public function __construct($host =null)
    {
        if(empty(self::$esobj)){self::$esobj = @curl_init();} //静态化链接方式
        $this->host = ($host ==null)?$this->host:$host;
    }

    public  function post_url($url, $data = '',$method = 'GET',$others=[])
    {
        $header = isset($others['header']) ?$others['$header']:['Content-Type: application/json'];
        $referrer = isset($others['referrer'])?$others['referrer']:'';
        $useragent = isset($others['useragent'])?$others['useragent']:'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1)';
        $cookie = isset($others['cookie'])?$others['cookie']:'';
        $proxy = isset($others['proxy'])?$others['proxy']: -1;
        $sock = isset($others['sock'])?$others['sock']:false;
        //curl 方式
        if (function_exists('curl_init') && empty($cookie)) {
            if(empty(self::$esobj)){self::$esobj = @curl_init();} //静态化链接方式
            $ch = self::$esobj;
            if($method == 'GET' && !empty($data)){
                if(is_string($data)){
                    $url = $url.'?'.$data;
                }else{
                    $querystring = http_build_query($data);
                    $url = $url.'?'.$querystring;
                }
            }
            @curl_setopt($ch, CURLOPT_URL, $url);
            if ($proxy != -1 && !empty($proxy)) @curl_setopt($ch, CURLOPT_PROXY, 'http://' . $proxy);
            @curl_setopt($ch, CURLOPT_REFERER, $referrer);//在HTTP请求头中"Referer: "的内容。
            @curl_setopt($ch, CURLOPT_USERAGENT, $useragent);//在HTTP请求中包含一个"User-Agent: "头的字符串。
            @curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE_PATH); //链接后保存cookie信息
            @curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE_PATH); //cookie保存类型
            @curl_setopt($ch, CURLOPT_HEADER, 0);  //
            @curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            @curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);//启用时会将服务器服务器返回的"Location: "放在header中递归的返回给服务器，使用CURLOPT_MAXREDIRS可以限定递归返回的数量。
            @curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);//	在尝试连接时等待的秒数。设置为0，则无限等待。
            @curl_setopt($ch, CURLOPT_TIMEOUT, 60); //允许 cURL 函数执行的最长秒数。
            @curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);//允许程序选择想要解析的 IP 地址类别
            @curl_setopt($ch, CURLOPT_HTTPHEADER, $header);	//设置 HTTP 头字段的数组
            if($method == 'POST'){
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST,'POST');     // 请求方式
                curl_setopt($ch, CURLOPT_POST, true);        // post提交
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);   // post的变量
            }
            if($method == 'PUT'){
                curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "PUT");
                curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
            }
            if($method == 'DELETE'){
                curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
                curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
            }

            $result = @curl_exec($ch);
            // 释放资源  --暂时不释放资源
            @curl_close($ch);
        }
        //file_get_contents 方式
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
            if ($method == 'POST') $httpheader .= "Content-Length: " . strlen($data) . "\r\n";
            $httpheader .= "Connection: Keep-Alive\r\n";
            $httpheader .= "Cookie: " . $cookie . "\r\n";

            $opts = array(
                'http' => array(
                    'method' => $method,
                    'header' => $httpheader,
                    'timeout' => 60,
                    'content' =>  $data
                )
            );
            if ($proxy != -1 && !empty($proxy)) {
                $opts['http']['proxy'] = 'tcp://' . $proxy;
                $opts['http']['request_fulluri'] = true;
            }
            $context = @stream_context_create($opts);
            $result = @file_get_contents($url, 'r', $context);
        }
        //打开文件方式
        if ($sock && $result === false && function_exists('fsockopen')) {
            $urls = parse_url($url);
            if (empty($header)) $header = $urls['host'];
            $port = empty($urls['port']) ? 80 : $urls['port'];

            $httpheader = $method . " " . $url . " HTTP/1.1\r\n";
            $httpheader .= "Accept: */*\r\n";
            $httpheader .= "Accept-Language: zh-cn\r\n";
            $httpheader .= "Referer: " . $referrer . "\r\n";
            if ($method == 'POST') $httpheader .= "Content-Type: application/x-www-form-urlencoded\r\n";
            $httpheader .= "User-Agent: " . $useragent . "\r\n";
            $httpheader .= "Host: " . $host . "\r\n";
            if ($method == 'POST') $httpheader .= "Content-Length: " . strlen($data) . "\r\n";
            $httpheader .= "Connection: Keep-Alive\r\n";
            $httpheader .= "Cookie: " . $cookie . "\r\n";
            $httpheader .= "\r\n";
            if ($method == 'POST') $httpheader .= $data;
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
    private function analysis(&$result){
        $result = json_decode($result,true);
        $resData = [];
        if(isset($result['hits']['hits'])){
            foreach ($result['hits']['hits'] as $key=> $item){
                $resData['hits'][$key] = $item['_source'];
            }

        }
        if(isset($result['aggregations']) ){
            foreach ($result['aggregations'] as $key=>$item){
                $resData['aggs'][$key] = $item['buckets'];
            }
        }
        unset($result);
        return $resData;
    }

     /**封装常规查询api

     $where['group_key'] = String	--分组查询
     $where['group_key_order'] = String	--	分组查询排序方式 DESC ASC
      * @param $where
      */
    public function es_api(&$where){
        if(is_string($where)){ return $this->exsql($where); }
        $reqdata = [];
        $reqdata['size'] = 20;//默认取二十条数据
        //过滤查询 == start
        if(isset($where['key'])){ //in
            foreach ($where['key'] as $key=>$item){
                if(is_array($item)){$reqdata['query']['bool']['must']['terms'][$key] = $item;}
                if(is_string($item)){$reqdata['query']['bool']['must']['term'][$key] = $item;}
            }
        }
        if(isset($where['not_key'])){ //not in
            foreach ($where['not_key'] as $key=>$item){
                if(is_array($item)){$reqdata['query']['bool']['must_not']['terms'][$key] = $item;}
                if(is_string($item)){$reqdata['query']['bool']['must_not']['term'][$key] = $item;}
            }
        }
        if(isset($where['or_key'])){ //or in
            foreach ($where['or_key'] as $key=>$item){
                if(is_array($item)){$reqdata['query']['bool']['should']['terms'][$key] = $item;}
                if(is_string($item)){$reqdata['query']['bool']['should']['term'][$key] = $item;}
            }
        }
        //范围查询
        if(isset($where['or_min']) && isset($where['or_key']) && $where['or_max']){
            $reqdata['query']['bool']['must']['range'][$where['or_key']]['gt'] = $where['or_min'];//大于
            $reqdata['query']['bool']['must']['range'][$where['or_key']]['lt'] = $where['or_max'];//小于
        }
        if(isset($where['not_or_min']) && isset($where['not_or_key']) && $where['not_or_max']){ //范围查询
            $reqdata['query']['bool']['must_not']['range'][$where['not_or_key']]['gt'] = $where['not_or_min'];//大于
            $reqdata['query']['bool']['must_not']['range'][$where['not_or_key']]['lt'] = $where['not_or_max'];//小于
        }
        if(isset($where['range'])){
            foreach ($where['range'] as $key=>$item){
                $reqdata['query']['bool']['must']['range'][$key]['gt'] = $item;
                $reqdata['query']['bool']['must']['range'][$key]['lt'] = $item;
            }
        }
        if(isset($where['sorting'])){
            if(is_array($where['sorting'])){$reqdata['sort'][$where[0]]['order'] = $where[1];}
            if(is_string($where['sorting'])){
                $where['sorting'] = explode(' ',trim($where['sorting']));
                $reqdata['sort'][$where[0]]['order'] = $where[1];
            }
        }
        //分组查询
        if(isset($where['group_key'])){
            $reqdata['aggs'][$where['group_key']]['terms']['field'] = $where['group_key'];
        }

        //过滤查询 == end
        //模糊搜索条件
        if(isset($where['search_key']) && isset($where['search_value'])){$reqdata['query']['match'][$where['search_key']] = $where['search_value'];}
        //返回字段
        if(isset($where['field'])){
            if(is_array($where['field'])){$reqdata['_source'] = $where['field'];}
            if(is_string($where['field'])){ $where['field'] = explode(',',$where['field']);}
            $this->exwstr($where['field'],$reqdata,$where);//分析查询
            if(!empty($where['field'])){ $reqdata['_source'] = $where['field'];}
        }
        //分页
        if(isset($where['limit']) || isset($where['size']) ){ $reqdata['size'] = isset($where['limit'])?$where['limit']:$where['size'];}
        if(isset($where['start']) || isset($where['from'])){ $reqdata['from'] = isset($where['start'])?$where['start']:$where['from'];}

        //基础请求封装
        $url = $this->host;
        $method  = 'POST';
        if(isset($where['method'])){ $method = $where['method']; }
        if(!isset($where['index'])){ return false; }
        if(isset($where['host'])){ $url = $where['host']; }
        if(substr($url, -1) != '/'){ $url .='/'; }
        $url .= $where['index'];
        if(isset($where['search'])){
            $url .= '/'.$where['search'];
        }else{
            $url .= '/_search';
        }
        $result = $this->post_url($url,json_encode($reqdata,320),$method);
        return $this->analysis($result);
    }

     /**解析数组
      * @param $wdata
      */
    private function exwstr(&$wdata,&$reqdata,&$where){
        foreach ($wdata as $key=> $item){
            $item = strtolower($item);
            if(strpos($item,'(') === false){continue;}
            $cardinality = '';
            //存在运算操作
            if(strpos($item,'sum') !== false ){$cardinality = 'sum';}
            if(strpos($item,'avg') !== false ){$cardinality = 'avg';}
            //去重
            if(strpos($item,'distinct') !== false ){ $cardinality  = 'cardinality';}
            if(strpos($item,'min') !== false ){ $cardinality  = 'min';}
            if(strpos($item,'max') !== false ){ $cardinality  = 'max';}
            $newstr =  explode(' ',$item);
            if(strpos($item,' as ') !== false){
                preg_match_all("/[^(*)]+/",$item,$str_ary);
                if(isset($where['group_key'])){
                    $reqdata['aggs'][$where['group_key']]['aggs'][trim($newstr[2])][$cardinality]['field'] = trim($str_ary[0][1]);
                }else{
                    $reqdata['aggs'][trim($newstr[2])][$cardinality]['field'] = trim($str_ary[0][1]);
                }
            }else{
                preg_match_all("/[^(*)]+/",$item,$str_ary);
                if(isset($where['group_key'])){
                    $reqdata['aggs'][$where['group_key']]['aggs'][trim($newstr[2])][$cardinality]['field'] = trim($str_ary[0][1]);
                }else{
                    $reqdata['aggs'][trim($str_ary[0][1])][$cardinality]['field'] = trim($str_ary[0][1]);
                }
            }
            //处理完删除元素
            unset($wdata[$key]);
        }
    }

     /**处理sql
      * @param $where
      */
    private function exsql(&$sql){
        $url = $this->host.'_xpack/sql?format=json';
        $xml_data= '{"query": '.'"'.$sql.'"'.'}';
        $response = $this->post_url($url,$xml_data,'POST');
        $res=json_decode($response,true);
        $data = [];
        foreach ($res['rows'] as $key=>$val){
            foreach ($res['columns'] as $k=>$v){
                $data[$key][$v['name']] = $val[$k];
            }
        }
        return $data;
    }
 }
```

