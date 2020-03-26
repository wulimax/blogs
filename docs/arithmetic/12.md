#### [999. 车的可用捕获量](https://leetcode-cn.com/problems/available-captures-for-rook/)

```java
public class Solution {

    public static void  main(String[] args){
        Solution  solution = new Solution();
        char[][] arr= new char[][] {{'.','.','.','.','.','.','.','.'},{'.','.','.','p','.','.','.','.'},{'.','.','.','p','.','.','.','.'},{'p','p','.','R','.','p','B','.'},{'.','.','.','.','.','.','.','.'},{'.','.','.','B','.','.','.','.'},{'.','.','.','p','.','.','.','.'},{'.','.','.','.','.','.','.','.'}};
      int k =  solution.numRookCaptures(arr);
      System.out.println(k);

    }


    /**
     * 找到中心点 分别想 上 下 左 右寻找
     * @param board
     * @return
     */
    public int numRookCaptures(char[][] board) {

        for (int i=0;i<board.length;i++){
            for (int j=0;j<board[i].length;j++){
                if(board[i][j] == 'R'){
                   int t = numRookCapturesTop(board,i,j);
                   int b = numRookCapturesBo(board,i,j);
                   int l = numRookCapturesleft(board,i,j);
                   int r = numRookCapturesRight(board,i,j);
                   return t+b+l+r;
                }
            }
        }
        return 0;
    }

    /**
     * 正直向上寻找
     * @param board
     * @param h
     * @param w
     * @return
     */
    public int numRookCapturesTop(char[][] board,int h,int w) {
        for (int i= h;i >=0;i--){
            if(board[i][w] == 'B'){ break; }
            if(board[i][w] == 'p'){
                return 1;
            }
        }
        return 0;
    }
    /**
     * 正直向下寻找
     * @param board
     * @param h
     * @param w
     * @return
     */
    public int numRookCapturesBo(char[][] board,int h,int w) {
        for (int i= h;i <board.length;i++){
            if(board[i][w] == 'B'){ break; }
            if(board[i][w] == 'p'){
                return 1;
            }
        }
        return 0;
    }

    /**
     * 正直向右寻找
     * @param board
     * @param h
     * @param w
     * @return
     */
    public int numRookCapturesleft(char[][] board,int h,int w) {
        for (int i= w;i <board[h].length;i++){
            if(board[h][i] == 'B'){ break; }
            if(board[h][i] == 'p'){
                return 1;
            }
        }
        return 0;
    }

    /**
     * 正直向右寻找
     * @param board
     * @param h
     * @param w
     * @return
     */
    public int numRookCapturesRight(char[][] board,int h,int w) {
        for (int i= w;i >=0;i--){
            if(board[h][i] == 'B'){ break; }
            if(board[h][i] == 'p'){
                return 1;
            }
        }
        return 0;
    }

}

```

