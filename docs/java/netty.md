### Netty 之UDP双向通讯

#### 服务端:

```java
#主启动类
public class NettyUDP {
    public static void main(String[] args) throws InterruptedException
    {
        Bootstrap b = new Bootstrap();
        EventLoopGroup group = new NioEventLoopGroup();
        b.group(group)
                .channel(NioDatagramChannel.class)
                .handler(new EchoSeverHandler());

        // 服务端监听在9999端口
        b.bind(9999).sync().channel().closeFuture().await();
    }
}
#具体业务处理类
public class EchoSeverHandler  extends SimpleChannelInboundHandler<DatagramPacket> {
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, DatagramPacket packet)
            throws Exception {

        // 读取收到的数据
        ByteBuf buf = (ByteBuf) packet.copy().content();
        byte[] req = new byte[buf.readableBytes()];
        buf.readBytes(req);
        String body = new String(req, CharsetUtil.UTF_8);
        System.out.println("【NOTE】>>>>>> 收到客户端的数据："+body);

        // 回复一条信息给客户端
        ctx.writeAndFlush(new DatagramPacket(
                Unpooled.copiedBuffer("Hello，我是Server， 回复: "+body
                        , CharsetUtil.UTF_8)
                , packet.sender())).sync();
    }
}
```

客户端:

```java
#主要启动类
public class EchoClient {

    public static void main(String[] args) throws Exception
    {
        // 初始化本地UDP的Socket
        LocalUDPSocketProvider.getInstance().initSocket();
        // 启动本地UDP监听（接收数据用的）
        LocalUDPDataReciever.getInstance().startup();

        // 循环发送数据给服务端
        while(true)
        {
            // 要发送的数据
            String toServer = "Hi，我是客户端，我的时间戳"+System.currentTimeMillis();
            byte[] soServerBytes = toServer.getBytes("UTF-8");

            // 开始发送
            boolean ok = UDPUtils.send(soServerBytes, soServerBytes.length);
            if(ok)
               System.out.println("EchoClient 发往服务端的信息已送出.");
            else
               System.out.println("EchoClient 发往服务端的信息没有成功发出！！！");

            // 3000秒后进入下一次循环
            Thread.sleep(3000);
        }
    }
}
/**
 * 监听
 */
public class LocalUDPDataReciever {

    private static final String TAG = LocalUDPDataReciever.class.getSimpleName();
    private static LocalUDPDataReciever instance = null;
    private Thread thread = null;

    public static LocalUDPDataReciever getInstance()
    {
        if (instance == null)
            instance = new LocalUDPDataReciever();
        return instance;
    }

    public void startup()
    {
        this.thread = new Thread(new Runnable()
        {
            public void run()
            {
                try
                {
                    System.out.println( "本地UDP端口侦听中，端口=" + ConfigEntity.localUDPPort + "...");

                    //开始侦听
                    LocalUDPDataReciever.this.udpListeningImpl();
                }
                catch (Exception eee)
                {
                    System.out.println("本地UDP监听停止了(socket被关闭了?)," + eee.getMessage());
                }
            }
        });
        this.thread.start();
    }

    private void udpListeningImpl() throws Exception
    {
        while (true)
        {
            byte[]  data = new byte[1024];
            // 接收数据报的包
            DatagramPacket packet = new DatagramPacket(data,data.length);

            DatagramSocket localUDPSocket = LocalUDPSocketProvider.getInstance().getLocalUDPSocket();
            if ((localUDPSocket == null) || (localUDPSocket.isClosed()))
                continue;

            // 阻塞直到收到数据
            localUDPSocket.receive(packet);

            // 解析服务端发过来的数据
            String pFromServer = new String(packet.getData(), 0 , packet.getLength(), "UTF-8");
            System.out.println( "【NOTE】>>>>>> 收到服务端的消息："+pFromServer);
        }
    }
}
/**
 * 发送
 */
public class LocalUDPSocketProvider {
    private static final String TAG = LocalUDPSocketProvider.class.getSimpleName();
    private static LocalUDPSocketProvider instance = null;
    private DatagramSocket localUDPSocket = null;

    public static LocalUDPSocketProvider getInstance()
    {
        if (instance == null)
            instance = new LocalUDPSocketProvider();
        return instance;
    }

    public void initSocket()
    {
        try
        {
            // UDP本地监听端口（如果为0将表示由系统分配，否则使用指定端口）
            this.localUDPSocket = new DatagramSocket(ConfigEntity.localUDPPort);
            ConfigEntity.localUDPPort = this.localUDPSocket.getLocalPort();
            System.out.println("客户端系统分配的端口号 "+ ConfigEntity.localUDPPort);
            // 调用connect之后，每次send时DatagramPacket就不需要设计目标主机的ip和port了
            // * 注意：connect方法一定要在DatagramSocket.receive()方法之前调用，
            // * 不然整send数据将会被错误地阻塞。这或许是官方API的bug，也或许是调
            // * 用规范就应该这样，但没有找到官方明确的说明
            this.localUDPSocket.connect(
                    InetAddress.getByName(ConfigEntity.serverIP), ConfigEntity.serverUDPPort);
            this.localUDPSocket.setReuseAddress(true);
            System.out.println( "客户端 new DatagramSocket()已成功完成.");
        }
        catch (Exception e)
        {
            System.out.println( "localUDPSocket创建时出错，原因是：" + e.getMessage());
        }
    }

    public DatagramSocket getLocalUDPSocket()
    {

        return this.localUDPSocket;
    }
}
/**
 *   发送数据工具类
 */
public class UDPUtils {
  
    public static boolean send(byte[] data, Integer length){
        DatagramPacket packet = new DatagramPacket(data,data.length);

        DatagramSocket localUDPSocket = LocalUDPSocketProvider.getInstance().getLocalUDPSocket();
        try {
            localUDPSocket.send(packet);
            return  true;
        } catch (IOException e) {
            return  false;
        }
    }
}
/**
*配置文件
*/
public class ConfigEntity {
    static  Integer localUDPPort = 0 ; //本地启动端口号
    static  String serverIP =  "127.0.0.1";  //服务器地址
    static  Integer serverUDPPort = 9999;  //服务器端口号
}


```

