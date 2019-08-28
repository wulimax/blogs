根据php 经典加密类 discuz authcode 的java 版本

php版本

```php
/**
 *
 * @param string $string    明文或密文字符串
 * @param string $operation    DECODE表示解密,其它表示加密
 * @param string $key    密钥
 * @param int $expiry    密文有效期,0代码永不过期
 * @return string
 */
function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0) {
    // 动态密匙长度，相同的明文会生成不同密文就是依靠动态密匙
    $ckey_length = 4;
    // 密匙
    $key = md5 ( $key ? $key : $GLOBALS ['discuz_auth_key'] );
    // 密匙a会参与加解密
    $keya = md5 ( substr ( $key, 0, 16 ) );
    // 密匙b会用来做数据完整性验证
    $keyb = md5 ( substr ( $key, 16, 16 ) );
    // 密匙c用于变化生成的密文
    $keyc = $ckey_length ? ($operation == 'DECODE' ? substr ( $string, 0, $ckey_length ) : substr ( md5 ( microtime () ), - $ckey_length )) : '';
    // 参与运算的密匙
    $cryptkey = $keya . md5 ( $keya . $keyc );
    $key_length = strlen ( $cryptkey );
    // 明文，前10位用来保存时间戳，解密时验证数据有效性，10到26位用来保存$keyb(密匙b)，解密时会通过这个密匙验证数据完整性
    // 如果是解码的话，会从第$ckey_length位开始，因为密文前$ckey_length位保存 动态密匙，以保证解密正确
    $string = $operation == 'DECODE' ? base64_decode ( substr ( $string, $ckey_length ) ) : sprintf ( '0d', $expiry ? $expiry + time () : 0 ) . substr ( md5 ( $string . $keyb ), 0, 16 ) . $string;
    $string_length = strlen ( $string );
    $result = '';
    $box = range ( 0, 255 );
    $rndkey = array ();
    // 产生密匙簿
    for($i = 0; $i <= 255; $i ++) {
        $rndkey [$i] = ord ( $cryptkey [$i % $key_length] );
    }
    // 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度
    for($j = $i = 0; $i < 256; $i ++) {
        $j = ($j + $box [$i] + $rndkey [$i]) % 256;
        $tmp = $box [$i];
        $box [$i] = $box [$j];
        $box [$j] = $tmp;
    }
    // 核心加解密部分
    for($a = $j = $i = 0; $i < $string_length; $i ++) {
        $a = ($a + 1) % 256;
        $j = ($j + $box [$a]) % 256;
        $tmp = $box [$a];
        $box [$a] = $box [$j];
        $box [$j] = $tmp;
        // 从密匙簿得出密匙进行异或，再转成字符
        $result .= chr ( ord ( $string [$i] ) ^ ($box [($box [$a] + $box [$j]) % 256]) );
    }
    if ($operation == 'DECODE') {
        // substr($result, 0, 10) == 0 验证数据有效性
        // substr($result, 0, 10) - time() > 0 验证数据有效性
        // substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0,
        // 16) 验证数据完整性
        // 验证数据有效性，请看未加密明文的格式
        if ((substr ( $result, 0, 10 ) == 0 || substr ( $result, 0, 10 ) - time () > 0) && substr ( $result, 10, 16 ) == substr ( md5 ( substr ( $result, 26 ) . $keyb ), 0, 16 )) {
            return substr ( $result, 26 );
        } else {
            return '';
        }
    } else {
        // 把动态密匙保存在密文里，这也是为什么同样的明文，生产不同密文后能解密的原因
        // 因为加密后的密文可能是一些特殊字符，复制过程可能会丢失，所以用base64编码
        return $keyc . str_replace ( '=', '', base64_encode ( $result ) );
    }
}
```

java版:

```java


import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import org.springframework.stereotype.Component;
import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
import java.util.Random;

@Component
public class AesEncryptUtils {

    private enum DiscuzAuthcodeMode {
        Encode, Decode
    };


    /// <summary>
    /// 从字符串的指定位置截取指定长度的子字符串
    /// </summary>
    /// <param name="str">原字符串</param>
    /// <param name="startIndex">子字符串的起始位置</param>
    /// <param name="length">子字符串的长度</param>
    /// <returns>子字符串</returns>
    private String CutString(String str, int startIndex, int length) {
        if (startIndex >= 0) {
            if (length < 0) {
                length = length * -1;
                if (startIndex - length < 0) {
                    length = startIndex;
                    startIndex = 0;
                } else {
                    startIndex = startIndex - length;
                }
            }
            if (startIndex > str.length()) {
                return "";
            }
        } else {
            if (length < 0) {
                return "";
            } else {
                if (length + startIndex > 0) {
                    length = length + startIndex;
                    startIndex = 0;
                } else {
                    return "";
                }
            }
        }
        if (str.length() - startIndex < length) {

            length = str.length() - startIndex;
        }
        return str.substring(startIndex, startIndex + length);
    }

    /// <summary>
    /// 从字符串的指定位置开始截取到字符串结尾的了符串
    /// </summary>
    /// <param name="str">原字符串</param>
    /// <param name="startIndex">子字符串的起始位置</param>
    /// <returns>子字符串</returns>
    public   String CutString(String str, int startIndex) {
        return CutString(str, startIndex, str.length());
    }

    /// <summary>
    /// 返回文件是否存在
    /// </summary>
    /// <param name="filename">文件名</param>
    /// <returns>是否存在</returns>
    public boolean FileExists(String filename) {
        File f = new File(filename);
        return f.exists();
    }

    /// <summary>
    /// MD5函数
    /// </summary>
    /// <param name="str">原始字符串</param>
    /// <returns>MD5结果</returns>
//    public static String MD5(String str) {
//        return md5.getMD5ofStr(str);
//    }

    /// <summary>
    /// 字段串是否为Null或为""(空)
    /// </summary>
    /// <param name="str"></param>
    /// <returns></returns>
    public boolean StrIsNullOrEmpty(String str) {
        //#if NET1
        if (str == null || str.trim().equals("")) {
            return true;
        }
        return false;
    }

    /// <summary>
    /// 用于 RC4 处理密码
    /// </summary>
    /// <param name="pass">密码字串</param>
    /// <param name="kLen">密钥长度，一般为 256</param>
    /// <returns></returns>
    private byte[] GetKey(byte[] pass, int kLen) {
        byte[] mBox = new byte[kLen];
        for (int i = 0; i < kLen; i++) {
            mBox[i] = (byte) i;
        }
        int j = 0;
        for (int i = 0; i < kLen; i++) {
            j = (j + (int) ((mBox[i] + 256) % 256) + pass[i % pass.length])
                    % kLen;
            byte temp = mBox[i];
            mBox[i] = mBox[j];
            mBox[j] = temp;
        }
        return mBox;
    }

    /// <summary>
    /// 生成随机字符
    /// </summary>
    /// <param name="lens">随机字符长度</param>
    /// <returns>随机字符</returns>
    public  String RandomString(int lens) {
        char[] CharArray = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k',
                'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
                'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
        int clens = CharArray.length;
        String sCode = "";
        Random random = new Random();
        for (int i = 0; i < lens; i++) {
            sCode += CharArray[Math.abs(random.nextInt(clens))];
        }
        return sCode;
    }

    /// <summary>
    /// 使用 Discuz authcode 方法对字符串加密
    /// </summary>
    /// <param name="source">原始字符串</param>
    /// <param name="key">密钥</param>
    /// <param name="expiry">加密字串有效时间，单位是秒</param>
    /// <returns>加密结果</returns>
    public  String authcodeEncode(String source, String key, int expiry) {
        return authcode(source, key, DiscuzAuthcodeMode.Encode, expiry);

    }

    /// <summary>
    /// 使用 Discuz authcode 方法对字符串加密
    /// </summary>
    /// <param name="source">原始字符串</param>
    /// <param name="key">密钥</param>
    /// <returns>加密结果</returns>
    public  String authcodeEncode(String source, String key) {
        return authcode(source, key, DiscuzAuthcodeMode.Encode, 0);

    }

    /// <summary>
    /// 使用 Discuz authcode 方法对字符串解密
    /// </summary>
    /// <param name="source">原始字符串</param>
    /// <param name="key">密钥</param>
    /// <returns>解密结果</returns>
    public  String authcodeDecode(String source, String key) {
        return authcode(source, key, DiscuzAuthcodeMode.Decode, 0);

    }

    /// <summary>
    /// 使用 变形的 rc4 编码方法对字符串进行加密或者解密
    /// </summary>
    /// <param name="source">原始字符串</param>
    /// <param name="key">密钥</param>
    /// <param name="operation">操作 加密还是解密</param>
    /// <param name="expiry">加密字串过期时间</param>
    /// <returns>加密或者解密后的字符串</returns>
    private  String authcode(String source, String key,
                                   DiscuzAuthcodeMode operation, int expiry) {
        try {
            if (source == null || key == null) {
                return "";
            }
            int ckey_length = 0;
            String keya, keyb, keyc, cryptkey, result;
            key = MD52(key);
            keya = MD52(CutString(key, 0, 16));
            keyb = MD52(CutString(key, 16, 16));
            keyc = ckey_length > 0 ? (operation == DiscuzAuthcodeMode.Decode ? CutString(
                    source, 0, ckey_length)
                    : RandomString(ckey_length))
                    : "";
            cryptkey = keya + MD52(keya + keyc);
            if (operation == DiscuzAuthcodeMode.Decode) {
                byte[] temp;
                temp = Base64.decode(CutString(source, ckey_length));
                result = new String(RC4(temp, cryptkey));
                if (CutString(result, 10, 16).equals(CutString(MD52(CutString(result, 26) + keyb), 0, 16))) {
                    return CutString(result, 26);
                } else {
                    temp = Base64.decode(CutString(source+"=", ckey_length));
                    result = new String(RC4(temp, cryptkey));
                    if (CutString(result, 10, 16).equals(CutString(MD52(CutString(result, 26) + keyb), 0, 16))) {
                        return CutString(result, 26);
                    } else {
                        temp = Base64.decode(CutString(source+"==", ckey_length));
                        result = new String(RC4(temp, cryptkey));
                        if (CutString(result, 10, 16).equals(CutString(MD52(CutString(result, 26) + keyb), 0, 16))) {
                            return CutString(result, 26);
                        }else{
                            return "2";
                        }
                    }
                }
            } else {
                source = "0000000000" + CutString(MD52(source + keyb), 0, 16)
                        + source;

                byte[] temp = RC4(source.getBytes("UTF-8"), cryptkey);
                return keyc + Base64.encode(temp);
//                return keyc + Base64.encodeBytes(temp);
            }
        } catch (Exception e) {
            return "";
        }

    }

    // / <summary>
    // / RC4 原始算法
    // / </summary>
    // / <param name="input">原始字串数组</param>
    // / <param name="pass">密钥</param>
    // / <returns>处理后的字串数组</returns>
    private  byte[] RC4(byte[] input, String pass) {
        if (input == null || pass == null)
            return null;
        byte[] output = new byte[input.length];
        byte[] mBox = GetKey(pass.getBytes(), 256);
        // 加密
        int i = 0;
        int j = 0;
        for (int offset = 0; offset < input.length; offset++) {
            i = (i + 1) % mBox.length;
            j = (j + (int) ((mBox[i] + 256) % 256)) % mBox.length;
            byte temp = mBox[i];
            mBox[i] = mBox[j];
            mBox[j] = temp;
            byte a = input[offset];
            //byte b = mBox[(mBox[i] + mBox[j] % mBox.Length) % mBox.Length];
            // mBox[j] 一定比 mBox.Length 小，不需要在取模
            byte b = mBox[(toInt(mBox[i]) + toInt(mBox[j])) % mBox.length];

            output[offset] = (byte) ((int) a ^ (int) toInt(b));
        }

        return output;
    }

    public  String MD52(String MD5) {
        StringBuffer sb = new StringBuffer();
        String part = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] md5 = md.digest(MD5.getBytes());

            for (int i = 0; i < md5.length; i++) {
                part = Integer.toHexString(md5[i] & 0xFF);
                if (part.length() == 1) {
                    part = "0" + part;
                }
                sb.append(part);
            }

        } catch (NoSuchAlgorithmException ex) {
        }
        return sb.toString();

    }

    public static int toInt(byte b) {
        return (int) ((b + 256) % 256);
    }

    public long getUnixTimestamp() {
        Calendar cal = Calendar.getInstance();
        return cal.getTimeInMillis() / 1000;
    }
    
}
```

