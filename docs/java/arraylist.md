封装一个 动态数组 类

```java
package com.jdk.data.structures.jdkdatastructures.wlimax;

/**
 * 自定义数组类
 * @param <E>
 */
public class LiArrayList<E> {
    private E[] data;
    private int size;

    /**
     * 构造函数
     * @param s 指定数组大小
     */
    public LiArrayList(int s){
       //Objec是任意类的父类
       //将任意类 强制类型转换 转换成 E类型  E代表未知
       this.data =  (E[]) new Object[s];
       this.size = 0;
    }

    /**
     * 默认构造函数
     */
    public LiArrayList(){ this(10); }

    /**
     * 获取数组元素个数
     * @return
     */
    public int getSize(){ return this.size; }

    /**
     * 获取数组长度
     * @return
     */
    public int getCapacity(){ return  this.data.length; }

    /**
     * 判断是否为空
     * @return
     */
    public boolean isEmpty(){  return this.size ==0; }

    /**
     * 末尾追加元素
     * @param e
     */
    public void addList(E e){ add(this.size,e); }

    /**
     * 头部追加元素
     * @param e
     */
    public void addFirst(E e){ add(0,e); }

    /**
     * 元素追加到指定位置
     * @param index 索引
     * @param e 元素
     */
    public void add(int index,E e){
       if(index <0 || index > this.size){ throw  new IllegalArgumentException("index error"); }
       if(this.size == this.data.length){
          //进行数组扩容
          resize(2 * this.data.length);
       }

       for (int i=this.size-1;i>=index;i--){
           this.data[i+1] = this.data[i];
       }
        this.data[index] = e;
        this.size++;
    }

    /**
     * 数组扩容
     * @param newCapacity 扩容大小
     */
    private void resize(int newCapacity){
       E[] newData = (E[])new Object[newCapacity];
       for(int i =0;i<this.size;i++){
        newData[i] = this.data[i];
       }
        this.data = newData;
    }

    /**
     * 检查元素是否存在
     * @param e
     * @return
     */
    public boolean contains(E e){
       for (int i =0;i<this.size;i++){
          if(this.data[i].equals(e))return true;
       }
       return  false;
    }

    /**
     * 返回元素对应的索引
     * @param e
     * @return
     */
   public int find(E e){
      for (int i =0;i<this.size;i++){
         if(this.data[i] == e)return i;
      }
      return  -1;
   }

    /**
     * 删除对应索引
     * @param index
     * @return
     */
   public E remove(int index){
      if(index < 0 || index > this.size){ throw  new IllegalArgumentException("index error"); }
      E res = this.data[index];
      for (int i=index+1;i<this.size;i++){
          this.data[i-1] = this.data[i];
      }
       this.size--;
       this.data[this.size] = null; //需要被垃圾回收的对象
      if(this.size == this.data.length/2){ resize(data.length/2); }
      return res;
   }

    /**
     * 头部删除
     * @return
     */
   public E removeFirst(){ return remove(0); }

    /**
     * 尾部删除
     * @return
     */
   public E removeList(){ return remove(this.size-1); }

    /**
     * 删除指定元素
     * @param e
     */
   public void removeElement(E e){
       int  index = find(e);
       if(index != -1){ remove(index); }
   }

    /**
     * 获取指定索引的元素
     * @param index
     * @return
     */
    E get(int index){
       if(index<0|| index>=this.size){ throw new IllegalArgumentException("get index error"); }
       return this.data[index];
   }
    /**
     * 获取指定索引的元素
     * @param index
     * @param e
     */
    void set(int index,E e){
      if(index<0|| index>=this.size){ throw new IllegalArgumentException("set index error"); }
        this.data[index] = e;
   }

    @Override
    public String toString(){
       StringBuilder res = new StringBuilder();//一个可变的字符序列。 此类提供与StringBuffer的API，但不保证同步
       //使用指定的格式字符串和参数返回格式化的字符串
       res.append(String.format("Array:size= %d , capacity= %d\n",this.size,this.data.length));
       res.append("[");
       for(int i= 0;i<this.size;i++){
          res.append(this.data[i]);
          if(i !=this.size-1)
             res.append(", ");
       }
       res.append("]");
       return res.toString();
    }

}

```

