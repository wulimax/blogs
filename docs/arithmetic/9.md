#### [84. 柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

本题是为了下一题打基础

给定 *n* 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积

思路 :

 由一个点先两边扩展

```java
class Solution {
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

