二分映射树

```java


public class BSTMap<K extends Comparable<K> ,V> {

    private class Node{
        public K key;
        public V value;
        public Node left,right;

        public Node (K key,V value){
            this.key = key;
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
    private Node  root;
    private  int size;
   /*构造方法*/
    public BSTMap(){
        this.root = null;
        this.size = 0;
    }
    public int getSize(){return this.size; }
    public boolean isEmpty(){ return this.size==0; }
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
        return  node;
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
        if(key.compareTo(node.key) <0){
            node.left = remove(node.left,key);
            return node;
        }else if(key.compareTo(node.key) > 0){
            node.right = remove(node.right,key);
            return node;
        }else{
            if(node.left == null){
                Node rightNode = node.right;
                node.right = null;
                size--;
                return rightNode;
            }
            if(node.right == null){
                Node leftNode = node.left;
                node.left = null;
                size--;
                return leftNode;
            }
            Node successor = minimum(node.right);
            successor.right = removeMin(node.right);
            successor.left =node.left;
            node.left = node.right =null;
            return  successor;
        }
    }
    public V minimum(){
        if(size ==0){ throw  new IllegalArgumentException("size ==0"); }
        return minimum(root).value;
    }
    public Node minimum(Node node){
        if(node.left ==null){ return node; }
        return   minimum(root.left);
    }
    public Node removeMin(Node node){
        if(node.left == null){
            Node rightNode = node.right;
            node.right = null;
            size--;
            return rightNode;
        }
        node.left = removeMin(node.left);
        return node;
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

