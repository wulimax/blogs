问题是这样的: 客户端是c写的 后端是php 但是新的要求是把客户端用java写替换c

php使用hex2bin()编码  ,bin2hex()解码 

从菜鸟网及n多个博客站看到的是这两个函数式用了 16进制跟ASCII 相互转换用的

注意 注意 注意 看官网 :

​	官网解释是 : 16进制跟二进制相互转换使用的

```java
private static String hexStr =  "0123456789ABCDEF";
private static String[] binaryArray =
            {"0000","0001","0010","0011",
                    "0100","0101","0110","0111",
                    "1000","1001","1010","1011",
                    "1100","1101","1110","1111"};

    /**
     *
     * @param str
     * @return 转换为二进制字符串
     */
    public static String bytes2BinaryStr(byte[] bArray){
        String outStr = "";
        int pos = 0;
        for(byte b:bArray){
            //高四位
            pos = (b&0xF0)>>4;
            outStr+=binaryArray[pos];
            //低四位
            pos=b&0x0F;
            outStr+=binaryArray[pos];
        }
        return outStr;

    }
    /**
     *  对标PHP bin2hex()方法
     * @param bytes
     * @return 将二进制转换为十六进制字符输出
     */
    public static String bin2hex(byte[] bytes){

        String result = "";
        String hex = "";
        for(int i=0;i<bytes.length;i++){
            //字节高4位
            hex = String.valueOf(hexStr.charAt((bytes[i]&0xF0)>>4));
            //字节低4位
            hex += String.valueOf(hexStr.charAt(bytes[i]&0x0F));
            result +=hex+" ";
        }
        return result;
    }
    /**
     *  对标PHP hex2bin()方法
     * @param hexString
     * @return 将十六进制转换为字节数组
     */
    public static byte[] hex2bin(String hexString){
        //hexString的长度对2取整，作为bytes的长度
        int len = hexString.length()/2;
        byte[] bytes = new byte[len];
        byte high = 0;//字节高四位
        byte low = 0;//字节低四位

        for(int i=0;i<len;i++){
            //右移四位得到高位
            high = (byte)((hexStr.indexOf(hexString.charAt(2*i)))<<4);
            low = (byte)hexStr.indexOf(hexString.charAt(2*i+1));
            bytes[i] = (byte) (high|low);//高地位做或运算
        }
        return bytes;
    }
```

