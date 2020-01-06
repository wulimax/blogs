#### [85. 最大矩形](https://leetcode-cn.com/problems/maximal-rectangle/)

给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

```java
public class SolutionMax
{

    public static void main(String[] args){
        char[][] matrix = new char[][]{
                {'1','0','1','0','0'},
                {'1','0','1','1','1'},
                {'1','1','1','1','1'},
                {'1','0','0','1','0'}
        };
        SolutionMax solutionMax =  new SolutionMax();
        solutionMax.maximalRectangle(matrix);
    }
    public int maximalRectangle(char[][] matrix) {
        int[][] res = new int[matrix.length][matrix[0].length];
        for (int i=0;i<matrix.length;i++){
            for (int j=0;j<matrix[0].length;j++){
               if(i ==0 ){
                   res[i][j] = matrix[i][j] == '0'?0:1;
                   continue;
               }
               if(matrix[i][j] == '0'){
                   res[i][j] =0;
               }else{
                   res[i][j] = res[i-1][j]+1;
               }
            }
        }
        /**
        *1->0->1->0->0
	    *2->0->2->1->1
	    *3->1->3->2->2
		*4->0->0->3->3
        */
        int rescount = 0;
        for (int i=0;i<matrix.length;i++){
          int tmp = largestRectangleArea(res[i]);
          if(tmp > rescount){ rescount = tmp; }
        }
        return rescount;
    }


    public int largestRectangleArea(int[] heights) {
       int res = 0;
       int het = 0;
       int tmp = 0;
       for (int i=0;i<heights.length;i++){
          het = heights[i];
          tmp = heights[i];
           for (int j=i+1;j<heights.length;j++) {
             if(heights[j] >= het){
                tmp += het;
             }else {
                 break;
             }
           }
           for (int j=i-1;j>=0;j--) {
               if(heights[j] >= het){
                   tmp += het;
               }else {
                   break;
               }
           }
           if(tmp > res){ res = tmp;}
           tmp =0;
           het = 0;
       }
       return res;
    }
}

```

