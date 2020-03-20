```java
public class Solution {

    public static void  main(String[] args){
        Solution  solution = new Solution();
        int[] arr = new int[]{0,0,1,2,4,2,2,3,1,4};
        int[] e = new int[0];
        arr = solution.getLeastNumbers(arr,8);
        for (int i =0;i<arr.length;i++){
            System.out.println(arr[i]);
        }
    }

    /**
     * 输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
     * @param arr
     * @param k
     * @return
     */
    public int[] getLeastNumbers(int[] arr, int k) {
        int[] res = new int[k];
        int index = 0;
        for (int i=0;i<arr.length;i++){
            if(index < res.length ){
                res = listSort(res,arr[i],index);
                index++;
                continue;
            }
            if(arr[i] < res[0]){
               res = listSort(res,arr[i]);
            }
        }
        return res;
    }

    public int[] listSort(int[] arr, int k,int index ){
         arr[index] = k;
        for (int i=index;i>0;i--){
            if(arr[i] > arr[i-1]){
                int tmp = arr[i-1];
                arr[i-1] = arr[i];
                arr[i] =tmp;
            }
        }
        return arr;
    }
    public int[] listSort(int[] arr,int k){
        arr[0] = k;
        if(arr.length == 1){ return arr; }
        for (int i=1;i< arr.length;i++){
            if(arr[i-1] < arr[i]){
                int tmp = arr[i-1];
                arr[i-1] = arr[i];
                arr[i] = tmp;
            }
        }
        return arr;
    }

}

```

