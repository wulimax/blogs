# PHP请求方法

```php
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
            if(is_array($host) && !is_string($host)){
                @curl_setopt($ch, CURLOPT_HTTPHEADER, $host);
                unset($host);
            }
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
```

