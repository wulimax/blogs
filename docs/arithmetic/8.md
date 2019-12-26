## 餐盘栈

此题每天通过 leetcode ,只提供思路

题目: 

我们把无限数量 ∞ 的栈排成一行，按从左到右的次序从 0 开始编号。每个栈的的最大容量 capacity 都相同。

实现一个叫「餐盘」的类 DinnerPlates：

DinnerPlates(int capacity) - 给出栈的最大容量 capacity。
void push(int val) - 将给出的正整数 val 推入 从左往右第一个 没有满的栈。
int pop() - 返回 从右往左第一个 非空栈顶部的值，并将其从栈中删除；如果所有的栈都是空的，请返回 -1。
int popAtStack(int index) - 返回编号 index 的栈顶部的值，并将其从栈中删除；如果编号 index 的栈是空的，请返回 -1。

```java
public class DinnerPlates {

    private int capacity;
    private int size;
    private ListNode root;
    private ListNode tmp;
    private int nsize;

    public DinnerPlates(int capacity) {
        this.capacity = capacity;
        this.size  = 0;
        this.root = null;
        this.nsize =0;
    }
    /**节点**/
    public static class ListNode {
        int nodesize;
        int[]  val;
        ListNode next;
        ListNode(int x) {
            this.val = new int[x];
            nodesize  = 0;
        }

        @Override
        public String toString() {
          StringBuilder stringBuilder = new StringBuilder();
           for (int i =0 ;i< val.length;i++){
               stringBuilder.append(val[i]);
               if(i < val.length-1){ stringBuilder.append("->"); }
           }
           return  stringBuilder.toString();
        }
    }
    public void push(int val) {
         if(root == null){
             tmp = new ListNode(this.capacity);
             tmp.val[0] = val;
             tmp.nodesize = 1;
             nsize +=1;
             root =tmp;
         }else{
             while (tmp !=null){
                 //小于最大
                 if(tmp.nodesize < capacity){
                   tmp.val[tmp.nodesize] = val;
                   tmp.nodesize +=1;
                   break;
                  }
                 if(tmp.next == null){
                     ListNode tmpe = new ListNode(this.capacity);
                     nsize +=1;
                     tmpe.val[0] = val;
                     tmpe.nodesize = 1;
                     tmp.next = tmpe;
                     break;
                 }
                 tmp = tmp.next;
             }
             tmp = root;//复位
         }

    }

    public int pop() {
        if(nsize == 0){ return -1; }
        if(nsize > 1){
            for (int i=0;i<nsize-1;i++){
                tmp = tmp.next;
            }
        }
     if(tmp == null || tmp.nodesize == 0){ return -1; }
     int res = 0;

     for (int i=0;i <tmp.val.length;i++){
         if(tmp.val[i] !=0){
             res = tmp.val[i];
             tmp.val[i] = 0;
             tmp.nodesize -=1;
             break;
         }
     }
     if(tmp.nodesize ==0){  remove(nsize);}
     tmp = root;
     return res;
    }
   //int popAtStack(int index) - 返回编号 index 的栈顶部的值，并将其从栈中删除；如果编号 index 的栈是空的，请返回
    public int popAtStack(int index) {
        if(root == null){ return -1; }
        if(index > nsize){ return  -1; }
        if(nsize > 1){
            for (int i= 0;i<index;i++){
                tmp = tmp.next;
            }
        }
        if(tmp.nodesize == 0){ return remove(index); }
        int esc = tmp.val[tmp.nodesize-1];
        if(esc == 0){ tmp = root; return  remove(index); }

        tmp.val[tmp.nodesize-1] = 0;
        tmp.nodesize -=1;
        if(tmp.nodesize ==0){  remove(index); }
        tmp = root;
        return  esc;
    }
    /**删除栈*/
    public int remove(int index){
        if(root == null){ return -1; }
        if(index > nsize){ return  -1; }
        tmp = root;
         if(nsize > 2){
             for (int i= 0;i<index-1;i++){
              tmp = tmp.next;
           }
        }
        if(tmp.next == null){
            return -1;
        }
        if(tmp.next.next == null){
            nsize -=1;
            tmp.next = null;
            tmp = root;
            return -1;
        }
        ListNode tmpe =tmp.next.next;
        tmp.next = tmpe;
        nsize -=1;
        tmp = root;
        return -1;

    }

    @Override
    public String toString() {
        if(tmp == null){ return  ""; }
       StringBuilder stringBuilder = new StringBuilder();
        while (tmp !=null){
            for (int i =0 ;i<tmp.val.length;i++){
                stringBuilder.append(tmp.val[i]);
                if(i < tmp.val.length -1){
                    stringBuilder.append("->");
                }
            }
            stringBuilder.append("\n");
            tmp = tmp.next;
        }
       tmp = root;
       return stringBuilder.toString();
    }
}

```

