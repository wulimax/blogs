## 先说一下要求:

提交过来前需要都处理为正整数，并且每个32位整数取低位3字节作为一个数据点，4000组3字节连续拼一起，然后整体base64编码

字节处理不涉及进制 所有数据都是Byte表达

先看一下java的实现代码

```java
  double t = (double) a;//接受的数据是 -371659.0
 Integer m = Math.abs(Integer.valueOf((int) t));  //先将double转成 int
 byte[] bytes = ByteBuffer.allocate(4).putInt(m).array();  //将int转成 byte[]
/**结果**/
[0,5,-85,-53]
```

php代码

```php
$value = abs(intval($value));//接受的数据是 -371659.0 将double转成 int
$tmp = toByteb($value);
/**
     * 转换一个int为byte数组
     * @param $byt 目标byte数组
     * @param $val 需要转换的字符串
     * @author Zikie
     */
public static function toByteb($val)
    {
        $byt    = [];
        $byt[0] = ($val & 0xff);
        $byt[1] = ($val >> 8 & 0xff);
        $byt[2] = ($val >> 16 & 0xff);
        $byt[3] = ($val >> 24 & 0xff);
        return $byt;
    }
//输出结果
[203,171,5,0] 
```

发现结果不一样,到底该信谁呢,  测试发现java 的可以通过  

php的方法错在那了, 先看看java的方法怎么实现的

```java
//ByteBuffer.allocate(4).putInt(m).array();
//  ByteBuffer.allocate()
    public static ByteBuffer allocate(int capacity) {
        if (capacity < 0)
            throw new IllegalArgumentException();
             //调用了另一方class ,到这个对象中寻找putInt()方法
        return new HeapByteBuffer(capacity, capacity);
    }   
//putInt()方法
   public ByteBuffer putInt(int x) {
       // 感觉像是调到了无底洞
        Bits.putInt(this, ix(nextPutIndex(4)), x, bigEndian);
        return this;
    }
// 继续找
 static void putInt(ByteBuffer bb, int bi, int x, boolean bigEndian) {
        if (bigEndian)
            putIntB(bb, bi, x);
        else
            putIntL(bb, bi, x);
    }
//继续找
 static void putIntB(ByteBuffer bb, int bi, int x) {
        bb._put(bi    , int3(x));
        bb._put(bi + 1, int2(x));
        bb._put(bi + 2, int1(x));
        bb._put(bi + 3, int0(x));
    }
//找到了
 private static byte int3(int x) { return (byte)(x >> 24); }
    private static byte int2(int x) { return (byte)(x >> 16); }
    private static byte int1(int x) { return (byte)(x >>  8); }
    private static byte int0(int x) { return (byte)(x      ); }
```

  看了一下每多大区别啊 回顾一下知识扫盲

1、因为byte占8个bit位.int占32个bit位,将int转成byte相当与强制截取int的二进制数的后8位,由于多余的部分byte空间装不下,因此干掉多余部分，取其后8位b位 转成10进制的值就是结果,

2、如果截下来的8位数的第一位（从左往右，术语叫做高位）是1，表示此数是负数，那么最终的结果就是 把这8位先转为十进制数然后再减去256就是最终的值

3、相反如果高位是0，代表正数，那么直接把这8位转为十进制数就是这个byte货色的结果

4、可以理解成 **java 他按高位有符号处理的 php 按高位无符号处理的**

```php
function toByte($numdata) //$num 可以传数字
{
    $num=decbin($numdata);  //decbin 是php自带的函数，可以把十进制数字转换为二进制
    /**不够32前缀补零*/
    $a = '';
    for ($i =0;$i<32-strlen($num);$i++){
       $a .='0';
    }
    $num = $a.decbin($numdata);
    $resdata = [];
    for($i=0;$i<4;$i++){
      $tmp=substr($num,8*$i,8); //取后8位
   	 $sign=substr($tmp,0,1); //截取 第一位 也就是高位，用来判断到底是负的还是正的
    	if($sign==1)  //高位是1 代表是负数 ,则要减去256
    	{   	
         $resdata[$i] = bindec($tmp)-256; //bindec 也是php自带的函数，可以把二进制数转为十进制
    	}
    	else
    	{
         $resdata[$i] = bindec($tmp);
    	}
    }
  return $resdata;
    
}
```

参考文章:http://www.hishenyi.com/archives/178 https://blog.csdn.net/fenglailea/article/details/82871746