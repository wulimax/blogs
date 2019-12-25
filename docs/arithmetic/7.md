## 两数相加

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

```java
public class Solution {
 
    public static class ListNode {
      int val;
      ListNode next;
      ListNode(int x) { val = x; }
    }

    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode listNode = null ;
        ListNode listNode2 = null;
        int kes = 0;
        while (l1 != null  || l2 != null){
            int e = kes;
            ListNode tmp;
            if(l1 !=null){ e +=l1.val; }
            if(l2 !=null){ e +=l2.val; }
            if(e >=10){ e = e-10;kes = 1; }else{ kes =0; }
            if(listNode == null){
                listNode = new ListNode(e);
                listNode2 = listNode;
                if(l1 !=null  ){ l1 = l1.next; }
                if(l2 != null){ l2 = l2.next; }
                if(l1 == null && l2 ==null && kes !=0){
                    tmp =  new ListNode(kes);
                    listNode.next = tmp;
                    listNode = tmp;
                }
                continue;
            }
             tmp =  new ListNode(e);
            listNode.next = tmp;
            listNode = tmp;
            if(l1 !=null  ){ l1 = l1.next; }
            if(l2 != null){ l2 = l2.next; }
            if(l1 == null && l2 ==null && kes !=0){
                tmp =  new ListNode(kes);
                listNode.next = tmp;
                listNode = tmp;
            }
        }
        return listNode2;
    }
}

```

   