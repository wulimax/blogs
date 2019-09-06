## 微信解密方法

​    获取用户流程  小程序/公众号 

  前端获取code ,跟加密后的数据, 使用code 去腾讯后台获取解密 数据的key ,但是比较坑的是官方没有提供java版本的解密方法 ,只有c++,php,node,python的

```php

class WXBizDataCrypt
{
    private $appid;
	private $sessionKey;

	/**
	 * 构造函数
	 * @param $sessionKey string 用户在小程序登录后获取的会话密钥
	 * @param $appid string 小程序的appid
	 */
	public function __construct( $appid, $sessionKey)
	{
		$this->sessionKey = $sessionKey;
		$this->appid = $appid;
	}


	/**
	 * 检验数据的真实性，并且获取解密后的明文.
	 * @param $encryptedData string 加密的用户数据
	 * @param $iv string 与用户数据一同返回的初始向量
	 * @param $data string 解密后的原文
     *
	 * @return int 成功0，失败返回对应的错误码
	 */
	public function decryptData( $encryptedData, $iv)
	{
		if (strlen($this->sessionKey) != 24) {
			return 41001;
		}
		$aesKey=base64_decode($this->sessionKey);

        
		if (strlen($iv) != 24) {
			return 41002;
		}
		$aesIV=base64_decode($iv);

		$aesCipher=base64_decode($encryptedData);

		$result=openssl_decrypt( $aesCipher, "AES-128-CBC", $aesKey, 1, $aesIV);

		$dataObj=json_decode( $result );
		if( $dataObj  == NULL )
		{
			return 41003;
		}
		if( $dataObj->watermark->appid != $this->appid )
		{
			return 41003;
		}
		$data = $result;
		return $data;
	}

}


```



```java
public class WxDecrytUtils {
    //----------------------------微信解密------------------

    public String decrypt(String encryptedData, String sessionKey, String iv)  {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
            BASE64Decoder base64Decoder = new BASE64Decoder();
            byte[] _encryptedData = base64Decoder.decodeBuffer(encryptedData);
            byte[] _sessionKey = base64Decoder.decodeBuffer(sessionKey);
            byte[] _iv = base64Decoder.decodeBuffer(iv);
            SecretKeySpec secretKeySpec = new SecretKeySpec(_sessionKey, "AES");
            IvParameterSpec ivParameterSpec = new IvParameterSpec(_iv);
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec);
            byte[] original = cipher.doFinal(_encryptedData);
            byte[] bytes = decode(original);
            String originalString = new String(bytes, "UTF-8");
            return originalString;
        } catch (Exception ex) {
            return null;
        }
    }
        Charset CHARSET = Charset.forName("utf-8");
        private int BLOCK_SIZE = 32;
        /**
         * 获得对明文进行补位填充的字节.
         *
         * @param count 需要进行填充补位操作的明文字节个数
         * @return 补齐用的字节数组
         */
       private  byte[] encode(int count) {
            // 计算需要填充的位数
            int amountToPad = BLOCK_SIZE - (count % BLOCK_SIZE);
            if (amountToPad == 0) {
                amountToPad = BLOCK_SIZE;
            }
            // 获得补位所用的字符
            char padChr = chr(amountToPad);
            String tmp = new String();
            for (int index = 0; index < amountToPad; index++) {
                tmp += padChr;
            }
            return tmp.getBytes(CHARSET);
        }

        /**
         * 删除解密后明文的补位字符
         *
         * @param decrypted 解密后的明文
         * @return 删除补位字符后的明文
         */
        private static byte[] decode(byte[] decrypted) {
            int pad = (int) decrypted[decrypted.length - 1];
            if (pad < 1 || pad > 32) {
                pad = 0;
            }
            return Arrays.copyOfRange(decrypted, 0, decrypted.length - pad);
        }

        /**
         * 将数字转化成ASCII码对应的字符，用于对明文进行补码
         *
         * @param a 需要转化的数字
         * @return 转化得到的字符
         */
        private  char chr(int a) {
            byte target = (byte) (a & 0xFF);
            return (char) target;
        }
}

```

