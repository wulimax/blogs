leetcode 211 题:

   设计一个支持以下两种操作的数据结构：

void addWord(word)
bool search(word)
search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。 . 可以表示任何一个字母。

代码:

```php
class WordDictionary {
    private $T1 = [];
    private $L1 = [];
    private $R1 = [];

    /**
     * Initialize your data structure here.
     */
    function __construct() {
       
    }
  
    /**
     * Adds a word into the data structure.
     * @param String $word
     * @return NULL
     */
    public function addWord($word) {
        if(strlen($word) > 0){
       if(strlen($word) == 1){ 
             $this->addWordT1($word);
         }else{
            $this->addWordL1($word);
           $this->addWordR1($word);
         }
        }
    }
    public function addWordT1($word){
        if(!isset($this->T1[$word])){
             $this->T1[] = $word;
        }
    }
    public function addWordL1($word){
        $zl1 = substr($word, 0,1);
        $zl2 = substr($word, 0,2);
        if(isset($this->L1[$zl1])){
         $zl1Data = $this->L1[$zl1];
        }else{
          $zl1Data = [];
        }
        if(isset($zl1Data[$zl2])){
            $zl2Data = $zl2Data[$zl2];
        }else{
            $zl2Data = [];
        }
        if(!isset($zl2Data[$word])){
        $this->L1[$zl1][$zl2][] = $word;
        }
    }
    public function addWordR1($word){
        $zl1 = substr($word, strlen($word)-1,1);
        $zl2 = substr($word, strlen($word)-2,2);
        if(isset($this->R1[$zl1])){
         $zl1Data = $this->R1[$zl1];
        }else{
          $zl1Data = [];
        }
        if(isset($zl1Data[$zl2])){
            $zl2Data = $zl2Data[$zl2];
        }else{
            $zl2Data = [];
        }
        if(!isset($zl2Data[$word])){
         $this->R1[$zl1][$zl2][] = $word;
        }
    }
  
    /**
     * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
     * @param String $word
     * @return Boolean
     */
    public function search($word) {
       if(strlen($word) == 1){ 
           if($word == '.' && count($this->T1) > 0){ return true; }
           return $this->searchT1($word);
            } 
       if(strpos($word,'.') !== false){ 
        // 左边不包含 .
         if(strpos(substr($word, 0,2),'.') === false){  return $this->searchL1($word);}
         if(strpos(substr($word, strlen($word)-2,2),'.') === false){ return $this->searchR1($word);  }

          foreach ($this->L1 as $value) {
              foreach ($value as $item) {
                 if($this->searchbli($word,$item)){ return true; }
              }
                
            }  
          return false;
       }else{
           return $this->searchL1($word);
        }
       
    }
    public function searchT1($word){
       foreach ($this->T1 as $key => $value) {
         if($word == $value){ return true; }
       }
        return false;
    }
    public function searchL1($word){
          $zl1 = substr($word, 0,1);
          $zl2 = substr($word, 0,2);
          if(isset($this->L1[$zl1][$zl2][$word])){return true; }
          if(!isset($this->L1[$zl1][$zl2])){ 
            return false;
           }else{
           return $this->searchbli($word,$this->L1[$zl1][$zl2]);
          }

    }
    public function searchR1($word){
         $zl1 = substr($word, strlen($word)-1,1);
        $zl2 = substr($word, strlen($word)-2,2);
          if(!isset($this->R1[$zl1][$zl2])){ 
          	return false; 
          }else{
           return $this->searchbli($word,$this->R1[$zl1][$zl2]);
          }
    }
    //遍历数组
    public function searchbli($word,$wordarr){
        if(strpos($word,'.') === false){
            foreach ($wordarr as  $value) {
              if($value == $word){ return true;}
             }
         }
       foreach ($wordarr as  $value) {
              if($this->ifstring($word,$value)){ return true;}
             }
             return false;

    }

    function ifstring($word,$isword){
        $l = strlen($word);
        $r = strlen($isword);
        if($l != $r){return false;}
        $leng = $l > $r?$l:$r;
        for($i =0;$i<$leng;$i++){
            $tmp = substr($word, $i,1);
            $tmp1 = substr($isword, $i,1);
            if($tmp == $tmp1){
            	 if($i== $leng-1){ return true; }
             continue; 
         }
            if($tmp == '.'){
             if($i== $leng-1){ return true; }
             continue;
              }
            if($tmp != $tmp1){ return false; }
        }
    return false;
    }

}
```

