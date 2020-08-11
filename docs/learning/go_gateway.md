## GO反向代理

```go
package main

import (
	// "fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
	"time"
	// "bytes"
	"io"
	"io/ioutil"
	"github.com/json-iterator/go"
	"strconv"
)
type Server struct {
	name string 
	port string
	host string 
}
// 定义redis链接池
var redisclient *redis.Client

func main() {
	http.HandleFunc("/", indexHandler)
	log.Fatal(http.ListenAndServe(":18080", nil))
}

// handler echoes r.URL.Path
func indexHandler(w http.ResponseWriter, req *http.Request) {
	if req.RequestURI == "/favicon.ico" {
        io.WriteString(w, "Request path Error")
        return
	}
    //验证token是否
	
	// for k, v := range req.Header {
	// 	fmt.Fprintf(w, "Header[%q] = %q\n", k, v)
	// }
	
	//拉去服务网关,请求地址
	hosturl,port,comma := getServiceHost(req.URL.Path)
	remote, err := url.Parse("http://" + hosturl+":"+port)
    if err != nil {
        panic(err)
    }
	proxy := httputil.NewSingleHostReverseProxy(remote)
	req.URL.Path = comma
	req.URL.Host = hosturl
	proxy.ServeHTTP(w, req)
	
	
}

func  isUrlfilelist(url string) int {

}

// 获取后端请求url
func  getServiceHost(url string) (string , string,string) {
	arr := strings.Split(url,"/");
	sname := strings.ToLower(arr[1])
	comma :=  string([]rune(url)[len(sname)+1 : len(url)]) 
	var g1 map[string]string 
	consuldata := Get("http://127.0.0.1:8500/v1/agent/services", g1)
	json := jsoniter.ConfigCompatibleWithStandardLibrary
	reader := strings.NewReader(consuldata)
	decoder := json.NewDecoder(reader)
	params := make(map[string]interface{})
	err := decoder.Decode(&params)
	if err != nil {
	    return "","",""
	} else {
	  hoste , port :=	PrintJsonByAssertion(params , sname)
	  if hoste == ""{
         return "","",""
	  }else{
         return hoste, port,comma
	  }
	}
}


//解析consul返回的路由数据进行路由
func PrintJsonByAssertion(m map[string]interface{}, urlname string) (string , string){
     arr := make(map[string]Server, 3)
	 OuterLoop :
	  for _, v := range m {
		switch vv := v.(type) {
		case map[string]interface{}:
			 var tmps  Server 
			for index, item := range vv {
				switch ite := item.(type) {
				case string:
					if index == "Service"  {
						tmps.name = strings.ToLower(ite)
					}else if index == "Address"   {
						tmps.host = ite
					}
				case float64:
					if index == "Port"  {
							tmps.port =  strconv.FormatFloat(ite, 'g', -1, 64)
					}
				}
			}
			arr[tmps.name] = tmps
		default:
			continue OuterLoop
		}
	}
	if  _, key := arr[urlname];key {
		return arr[urlname].host , arr[urlname].port
	}else{
		return "",""
	}
    
}

//发送get请求
func Get(url string, head map[string]string) string {
    // 超时时间：5秒
    client := &http.Client{Timeout: 5 * time.Second}
	resp, err := http.NewRequest("GET", url,nil)
	if err != nil {
		panic(err)
	}
	if len(head) != 0 {
		for k, v := range head {
			resp.Header.Add(k,v)
		}
	}
	response, _ := client.Do(resp)
	defer response.Body.Close()
	b, _ := ioutil.ReadAll(response.Body)
	return string(b)
}

// 初始化redis链接池
func init(){
    redisclient = redis.NewClient(&redis.Options{
        Addr:     "116.196.85.49", // Redis地址
        Password: 544869,  // Redis账号
        DB:       0,   // Redis库
        PoolSize: 3,  // Redis连接池大小
        MaxRetries: 3,              // 最大重试次数
        IdleTimeout: 10*time.Second,            // 空闲链接超时时间
    })
    pong, err := client.Ping().Result()
    if err == redis.Nil {
        logger.Info("Redis异常")
    } else if err != nil {
        logger.Info("失败:", err)
    } else {
        logger.Info(pong)
    }
}
```

