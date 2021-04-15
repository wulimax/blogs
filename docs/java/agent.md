## javaagent

应用场景1 :  如果不想改变类的的基础上通过javaagent 进行代码增强

一般 javaagent会伴生java 应用启动 启动参数为 -javaagent:[agent包路径]

```java
   // 此方法会先于main 方法前执行  
   public static void premain(String args, Instrumentation instrumentation){
        System.out.println("===premain===");
    }
```

#### 统计方法执行时间

```txt
在引入 javassist 的jar包的时候，尽可能的选择高版本的jar包
<dependency>
    <groupId>javassist</groupId>
    <artifactId>javassist</artifactId>
    <version>{version}</version>
</dependency>

```

```java
public static void premain(String arg, Instrumentation instrumentation) {

        final String config = arg;
 
        // 使用 javassist ,在运行时修改 class 字节码，就是 插桩
        final ClassPool pool = new ClassPool();
        pool.appendSystemPath();
 
        instrumentation.addTransformer(new ClassFileTransformer() {
            @Override
            public byte[] transform(ClassLoader loader, String className, Class<?> classBeingRedefined, ProtectionDomain protectionDomain, byte[] classfileBuffer) throws IllegalClassFormatException {
 
                if (className == null || !className.replaceAll("/",".").startsWith(config)) {
                    return null;
                }
 
                try {
                    className = className.replaceAll("/", ".");
                    CtClass ctClass = pool.get(className);
                    // 获得类中的所有方法
                    for (CtMethod declaredMethod : ctClass.getDeclaredMethods()) {
                        newMethod(declaredMethod);
                    }
                    return ctClass.toBytecode();
                } catch (Exception e) {
                    e.printStackTrace();
                }
 
                return null;
            }
        });
 
 
    }
 
    //复制原有的方法（类似于使用 agent ）
    private static CtMethod newMethod(CtMethod oldMethod) {
        CtMethod copy = null;
        try {
            //1. 将方法进行复制
            copy = CtNewMethod.copy(oldMethod, oldMethod.getDeclaringClass(), null);
            //类似于使用动态代理
            copy.setName(oldMethod.getName() + "$agent");
            //类文件中添加 sayHello$agent 方法
            oldMethod.getDeclaringClass().addMethod(copy);
 
            //2. 改变原有的方法,将 原有的 方法进行重写操作
            if (oldMethod.getReturnType().equals(CtClass.voidType)) {
                oldMethod.setBody(String.format(voidSource, oldMethod.getName()));
            } else {
                oldMethod.setBody(String.format(source, oldMethod.getName()));
            }
        } catch (CannotCompileException | NotFoundException e) {
            e.printStackTrace();
        }
        return copy;
 
    }
 
    /**
     * 参数的封装
     * $$ ======》 arg1, arg2, arg3
     * $1 ======》 arg1
     * $2 ======》 arg2
     * $3 ======》 arg3
     * $args ======》 Object[]
     */
    //有返回值得方法
 final static String source = "{ long begin = System.currentTimeMillis();\n" +
            "        Object result;\n" +
            "        try {\n" +
            "            result = ($w)%s$agent($$);\n" + //s% 将参数传递到下一个方法，然后使用 s% 传递的参数进行替换操作, $w 表示的是在进行return的时候会强制的进行类型转换
            "        } finally {\n" +
            "            long end = System.currentTimeMillis();\n" +
            "            System.out.println(end - begin);\n" +
            "        }\n" +
            "        return ($r) result;}";
 
    //没有返回值的方法
    final static String voidSource = "{long begin = System.currentTimeMillis();\n" +
            "        try {\n" +
            "            %s$agent($$);\n" +
            "        } finally {\n" +
            "            long end = System.currentTimeMillis();\n" +
            "            System.out.println(end - begin);\n" +
            "        }}";

```



