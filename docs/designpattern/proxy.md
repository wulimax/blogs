# 代理模式
------

写一些自己关于代理模式的理解
代理模式中有两个词 一个叫代理对象 一个叫被代理对象 
[在不改变被代理对象的基础上对被代理对象进行增强]
```java

/**
 * 给人定义一个基本接口
 */
public interface Person {
    public void speak();
}
public class PersonModel  implements Person{
    @Override
    public void speak() {
        System.out.println("我学会说话了");
    }
}
```
## 1. 静态代理
### 1.1 继承方式
### 1.2 聚合方式
```java
public class StaticPerson implements Person {

    private PersonModel personModel;

    public StaticPerson(PersonModel personModel){
        this.personModel = personModel;
    }
    @Override
    public void speak() {
        System.out.println("静态代理开始");
        personModel.speak();
        System.out.println("静态代理结束");
    }

    public static void main(String[] args){
        StaticPerson staticPerson = new StaticPerson(new PersonModel());
        staticPerson.speak();
    }


}
```
## 2. 动态代理(jdk)
```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * 通过jdk的方式进行动态d代理
 */
public class DynamicPerson{

    /**
     * 要代理的对象
     */
   private Object object;

    public DynamicPerson(Object subject)
    {
        this.object = subject;
    }





    public Object getProxyInstance(){
        return Proxy.newProxyInstance(this.object.getClass().getClassLoader(), this.object.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("我被代理了");
                return method.invoke(object,args);
            }
        });
    }

    public static void main(String[] args){
       PersonModel personModel = new PersonModel();
       DynamicPerson dynamicPerson = new DynamicPerson(personModel);
       Person person=  (Person) dynamicPerson.getProxyInstance();
       person.speak();

    }
}
```
## 3. 动态代理(CGLIB)

```java

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

public class CglibPerson implements MethodInterceptor {

    private Object object;
    public CglibPerson(Object o){
        this.object = o;
    }
    public Object getProxyInstance(){
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(this.object.getClass());
        enhancer.setCallback(this);
        return enhancer.create();
    }

    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        System.out.println("cglib代理开始");
        method.invoke(this.object,objects);
        System.out.println("cglib代理结束");
        return null;
    }

    public static void main(String[] args){
        PersonModel personModel = new PersonModel();
        CglibPerson cglibPerson = new CglibPerson(personModel);
         personModel = (PersonModel) cglibPerson.getProxyInstance();
         personModel.speak();
    }

}

```