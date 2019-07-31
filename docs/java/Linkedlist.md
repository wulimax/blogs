### 双向数据链表 

为了优化查询导致写的复杂度上升

```java

/**
 * 自定义LinkedList
 */
public class LinkList<E> {

    private Node<E> data; //存储链表
    private Node<E> first;//头部节点
    private Node<E> last;//尾部节点
    private int size;
    /**
    *存储元素节点
    */
    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;
        Node(E element,Node<E> next) {
            this.item = element;
            this.next = next;
        }
        Node(E element,Node<E> next,Node<E> prev) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
        @Override
        public String  toString(){ return item.toString(); }
    }

    /**
     * 构造
     */
    public  LinkList(){
        this.first = new Node<>(null,null);
        this.size = 0;
    }

    /**
     * 获取链表个数
     * @return
     */
    public int getSize(){
        return this.size;
    }

    /**
     * 判断链表是否为空
     * @return
     */
    public boolean isEmpty(){
        return this.size ==0;
    }


    /**
     * 添加元素
     * @param index  添加位置
     * @param e     添加元素
     */
    public void  add(int index,E e){
        if(index <0 || index >this.size){ throw new IllegalArgumentException("out index"); }
        Node pre = this.first;
        for(int i = 0 ; i<index;i++){
            pre = pre.next;
        }
        pre.next =  new Node(e,pre.next,pre);
        if(index == size){
            this.last = pre.next;
        }else{
         this.last = get(size);
        }
        this.size++;
       }
        /**
         * 向头部添加元素
         * @param e
         */
        public void addFirse(E e){
             add(0,e);
        }

    /**
     * 向链表尾部追加元素
     * @param e
     */
    public void addLast(E e){
        add(size,e);
    }

    /**
     * 根据索引删除
     * @param index
     */
    public void remove(int index){
        Node ro = get(index);
        Node po = ro.prev;
        Node no = ro.next;
        po.next = no;
        no.prev  =po;
        this.size--;
        this.last = get(this.size);
    }

    /**
     * 根据元素删除
     * @param e
     */
    public void  removeE(E e){
        remove(find(e));
    }

    /**
     * 更新数据
     * @param index
     * @param e
     */
     public void save(int index,E e){
        get(index).item =e;
     }
    /**
     * 获取元素方法
     * @param index
     * @return
     */
    public Node get(int index){

        if (index < (size >> 1)) {
            Node<E> x = this.first.next;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }

    /**
     * 查询元素所在索引
     * @param e
     * @return
     */
    public int find(E e){
        int x = -1;
        Node c = this.first.next;
        for (int i=0;i<size;i++){
            if(c.item ==e){ return i; }
            c = c.next;
        }
        return x ;
    }
    public boolean contains(E e){
          return find(e) ==-1?false:true;
    }

    /**
     * 重写打印方法
     * @return
     */
    @Override
    public String toString(){
        StringBuilder res = new StringBuilder();//一个可变的字符序列。 此类提供与StringBuffer的API，但不保证同步
        //使用指定的格式字符串和参数返回格式化的字符串
        res.append(String.format("Array:size= %d ",this.size));
        res.append("[");
        Node x = this.first;
        for(Node cur =  this.first.next ; cur !=null ;cur = cur.next)
           res.append(cur+"->");
        res.append("NULL");
        return res.toString();
    }

}

```

