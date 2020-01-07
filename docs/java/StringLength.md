## java中String有没有长度限制

​      最近在做关于ecg/ppg信号处理的相关问题, 遇到了一个小问题 测试的时候IDEA抛出了一个 常量字符串过长的问题

下面我就从一个小白的角度分析一下

​      new String('......')

```java 
public String(String original) {
        this.value = original.value;
        this.hash = original.hash;
    }
 /** 上面定义的value是一个char类型的常量 */
    private final char value[];  
//字符串在常量池中的存储是 2^16-1=65535
//null栈两个 所以可用的是65533
```

