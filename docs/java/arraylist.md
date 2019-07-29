封装一个 动态数组 类

```java
public class LiArrayList<E> {
    private E[] data;  //E 代表泛型 data 存放
    private int size; //存放的下一个值的指针

    /**
     * 构造函数
     * @param s
     */
    public LiArrayList(int s){
       //Objec是任意类的父类
       //将任意类 强制类型转换 转换成 E类型  E代表未知
       data =  (E[]) new Object[s];
       size = 0;
    }
    //初始值为数组大小为10
    public LiArrayList(){ this(10); }

    /**
     * 数组元素个数
     * @return
     */
    public int getSize(){ return this.size; }

    public int getCapacity(){ return  data.length; }

    public boolean isEmpty(){  return size ==0; }


    public void addList(E e){ add(size,e); }
    public void addFirst(E e){ add(0,e); }
    public void add(int index,E e){
       if(index <0 || index >size){ throw  new IllegalArgumentException("index error"); }
       if(size == data.length){
          //进行数组扩容
          resize(2 * data.length);
       }

       for (int i=size-1;i>=index;i--){
          data[i+1] = data[i];
       }
       data[index] = e;
       size++;
    }
    //数组扩容
    private void resize(int newCapacity){
       E[] newData = (E[])new Object[newCapacity];
       for(int i =0;i<size;i++){
        newData[i] = data[i];
       }
       data = newData;
    }
    //检查是否存在
    public boolean contains(E e){
       for (int i =0;i<size;i++){
          if(data[i].equals(e))return true;
       }
       return  false;
    }
    //查找对应k的索引
   public int find(E e){
      for (int i =0;i<size;i++){
         if(data[i] == e)return i;
      }
      return  -1;
   }
   public E remove(int index){
      if(index < 0 || index > size){ throw  new IllegalArgumentException("index error"); }
      E res = data[index];
      for (int i=index+1;i<size;i++){
         data[i-1] = data[i];
      }
      size--;
      data[size] = null; //需要被垃圾回收的对象
      if(size == data.length/2){ resize(data.length/2); }
      return res;
   }
   public E removeFirst(){ return remove(0); }
   public E removeList(){ return remove(size-1); }
   public void removeElement(E e){
       int  index = find(e);
       if(index != -1){ remove(index); }
   }

    E get(int index){
       if(index<0|| index>=size){ throw new IllegalArgumentException("get index error"); }
       return data[index];
   }
    void set(int index,E e){
      if(index<0|| index>=size){ throw new IllegalArgumentException("set index error"); }
      data[index] = e;
   }

    @Override
    public String toString(){
       StringBuilder res = new StringBuilder();//一个可变的字符序列。 此类提供与StringBuffer的API，但不保证同步
       //使用指定的格式字符串和参数返回格式化的字符串
       res.append(String.format("Array:size= %d , capacity= %d\n",size,data.length));
       res.append("[");
       for(int i= 0;i<size;i++){
          res.append(data[i]);
          if(i !=size-1)
             res.append(", ");
       }
       res.append("]");
       return res.toString();
    }

}

```

