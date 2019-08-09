平衡二叉树

```java

import java.util.ArrayList;

/**
 * 平衡二叉树
 */
public class AVLTree<K extends Comparable<K>,V> {
    private class Node{
        public K key;
        public V value;
        public Node left,right;
        public int height ;

        public Node (K key,V value){
            this.key = key;
            this.value = value;
            this.left = null;
            this.right = null;
            this.height =1;
        }
    }
    private Node  root;
    private  int size;
    /*构造方法*/
    public AVLTree(){
        this.root = null;
        this.size = 0;
    }
    public int getSize(){return this.size; }
    public boolean isEmpty(){ return this.size==0; }
    /**判断是否是二分搜索树*/
    public boolean isBST(){
        ArrayList<K> keys = new ArrayList<>();
        inOrder(root,keys);
        for (int i =1;i<keys.size();i++){
            if(keys.get(i-1).compareTo(keys.get(i))> 0){
                return  false;
            }
        }
        return true;
    }
    /**进行一次中序遍历*/
    private void inOrder(Node node,ArrayList<K> keys){
      if(node == null) return;
      inOrder(node.left,keys);
      keys.add(node.key);
      inOrder(node.right,keys);
    }
    /**判断是否是平衡二叉树*/
    public boolean isBalanced(){
      return isBalanced(this.root);
    }
    private boolean isBalanced(Node node){
        if(node == null)return true;
        int balaneeFactor = getBalanceFactor(node);
        if(Math.abs(balaneeFactor) > 1) return  false;
        return  isBalanced(node.left)  && isBalanced(node.right);
    }
    /**获取节点高度*/
    private int getHeight(Node  node){
        if(node == null)return 0;
        return node.height;
    }
    /**获取节点的平衡因子*/
    private int  getBalanceFactor(Node node){
        if(node == null) return 0;
        return getHeight(node.left) - getHeight(node.right);
    }
    /**添加元素*/
    public void add(K key,V value){
        this.root = add(root,key,value);
    }
    private Node add(Node node, K key, V value){
        if(node == null) {
            this.size++;
            return new Node(key,value);
        }
        if(key.compareTo(node.key) < 0){
            node.left =   add(node.left,key,value);
        }else if(key.compareTo(node.key) > 0){
            node.right =   add(node.right,key,value);
        }else {
            node.value = value;
        }
        //更新高度
        node.height = 1 + Math.max(getHeight(node.left),getHeight(node.right));
        //计算平衡因子
        int balanceFactor = getBalanceFactor(node);
        if(Math.abs(balanceFactor) > 1){
            //输出平衡因子
//            System.out.println("balanceFactor: "+ balanceFactor );
        }
        //维护平衡
        //LL
        if(balanceFactor > 1 && getBalanceFactor(node.left) >=0){
            //左边不平衡 需要右旋转
            return rightRotate(node);
        }
        //RR
        if(balanceFactor < -1 && getBalanceFactor(node.right) <=0){
            //右边不平衡 需要左旋转
            return leftRotate(node);
        }
        //LR
        if(balanceFactor >1 && getBalanceFactor(node.left) < 0){
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        //RL
        if(balanceFactor < -1 && getBalanceFactor(node.right) > 0){
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return  node;
    }
    /** 左数高度高于右树时进行右旋转
     *               y                      x
     *             /  \                   /  \
     *           x     T4               z     y
     *         /   \     右旋转(y)     /\     /\
     *        z     T3  ------->     T1  T2  T3 T4
     *      /  \
     *    T1    T2
     * */
    private Node rightRotate(Node y){
     Node x = y.left;
     Node T3 = x.right;

     x.right =y;
     y.left =T3;
     y.height = Math.max(getHeight(y.left),getHeight(y.right)) +1;
     x.height = Math.max(getHeight(x.left),getHeight(x.right)) +1;
     return x;
    }
    /**右树高度高于左树时 进行左旋转
     *                x                  y
     *              /  \               /  \
     *            z     y  左旋转    T4     x
     *           /\     /\  <----          / \
     *         T1  T2  T3 T4           T3     z
     *                                       / \
     *                                      T1  T2
     * */
    private Node leftRotate(Node y){
        Node x = y.right;
        Node T2 = x.left;

        x.left =y;
        y.right =T2;
        y.height = Math.max(getHeight(y.left),getHeight(y.right)) +1;
        x.height = Math.max(getHeight(x.left),getHeight(x.right)) +1;
        return x;
    }
    /**
     * 查询
     * @param node
     * @param key
     * @return
     */
    private Node getNode (Node node ,K key){
        if(node == null) return  null;
        if(key.compareTo(node.key) == 0){
            return  node;
        }else if(key.compareTo(node.key) <0){
            return getNode(node.left,key);
        }else {
            return getNode(node.right,key);
        }
    }

    /**
     * 判断
     * @param key
     * @return
     */
    public boolean contains(K key){
        return getNode(this.root,key) != null;
    }
    public V get(K key){
        Node node  = getNode(this.root,key);
        return node == null? null:node.value;
    }

    /**
     * 修改
     * @param key
     * @param newValue
     */
    public void set(K key, V newValue){
        Node node = getNode(this.root,key);
        if(node ==null)throw  new IllegalArgumentException("key is null");
        node.value = newValue;
    }
    public V  remove(K key){
        Node node = getNode(this.root,key);
        if(node != null){
            root = remove(root, key);
            return node.value;
        }
        return null;
    }
    private Node remove(Node node,K key){
        if(node == null)return  null;
        Node retNode;
        if(key.compareTo(node.key) <0){
            node.left = remove(node.left,key);
            retNode  = node;
        }else if(key.compareTo(node.key) > 0){
            node.right = remove(node.right,key);
            retNode  = node;
        }else{
            if(node.left == null){
                Node rightNode = node.right;
                node.right = null;
                size--;
               retNode = rightNode;
            }else if(node.right == null){
                Node leftNode = node.left;
                node.left = null;
                size--;
                retNode = leftNode;
            }else {
                Node successor = minimum(node.right);
                successor.right = remove(node.right, successor.key);
                successor.left = node.left;
                node.left = node.right = null;
                retNode = successor;
            }
        }
        if(retNode == null){ return  null; }
        //更新高度
        retNode.height = 1 + Math.max(getHeight(retNode.left),getHeight(retNode.right));
        //计算平衡因子
        int balanceFactor = getBalanceFactor(retNode);
        if(Math.abs(balanceFactor) > 1){
            //输出平衡因子
//            System.out.println("balanceFactor: "+ balanceFactor );
        }
        //维护平衡
        //LL
        if(balanceFactor > 1 && getBalanceFactor(retNode.left) >=0){
            //左边不平衡 需要右旋转
            return rightRotate(retNode);
        }
        //RR
        if(balanceFactor < -1 && getBalanceFactor(retNode.right) <=0){
            //右边不平衡 需要左旋转
            return leftRotate(retNode);
        }
        //LR
        if(balanceFactor >1 && getBalanceFactor(retNode.left) < 0){
            retNode.left = leftRotate(retNode.left);
            return rightRotate(retNode);
        }
        //RL
        if(balanceFactor < -1 && getBalanceFactor(retNode.right) > 0){
            retNode.right = rightRotate(retNode.right);
            return leftRotate(retNode);
        }
        return  retNode;
    }
    public V minimum(){
        if(size ==0){ throw  new IllegalArgumentException("size ==0"); }
        return minimum(root).value;
    }
    public Node minimum(Node node){
        if(node.left ==null){ return node; }
        return   minimum(root.left);
    }


    @Override
    public String toString(){
        StringBuilder res = new StringBuilder();
        generateBSTSting(this.root,0,res);
        return res.toString();
    }
    private void generateBSTSting(Node node, int depth, StringBuilder res){
        if(node == null){
            res.append(generateBSTSting(depth) + "null\n");
            return;
        }
        res.append(generateBSTSting(depth) + node.value + "\n");
        generateBSTSting(node.left,depth+1,res);
        generateBSTSting(node.right,depth+1,res);
    }
    private String generateBSTSting(int depth){
        StringBuilder res = new StringBuilder();
        for(int i = 0;i < depth;i++){
            res.append("-->");
        }
        return res.toString();
    }

}

```

