# PHP实现lru算法

``` php
/**使用PHP实现lru 算法 删除最长最少*/
class LruCache
{
    private $lru_value = [];
    private $max_size = 7;

    function __construct($siez) {
    	if(!empty($siez)){
    		$this->max_size = $siez;
    	}
    }

    /**set缓存方法*/
    public function set($key,$value){
    
      if(empty($key) || empty($value)){ return false; }
      /**判断缓存是否在数组中存在**/
      if(array_key_exists($key,$this->lru_value)){
           unset($this->lru_value[$key]); //删除key;
      } 
      /**查看是否超过maxsiex设置**/
      if(count($this->lru_value) > $this->max_size){
      	array_shift($this->lru_value);
      }
       /**添加key**/
       $this->lru_value[$key] = $value;
       return $key;
    }

    /**get缓存方法*/
    public function get($key){
    	if(empty($key)){return false;}
    	// $key =md5($key);
    	$ret_value = false;
    	if(array_key_exists($key,$this->lru_value)){
          $ret_value = $this->lru_value[$key];
    	}
    	if($ret_value){
    		unset($this->lru_value[$key]);
    		$this->lru_value[$key] = $ret_value;
    	}
    	return $ret_value;

    }
    /**打印缓存方法*/
    public function getAll(){
    	var_dump($this->lru_value);
    }
    /**动态扩展方法*/
}
```

